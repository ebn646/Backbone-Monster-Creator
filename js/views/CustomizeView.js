/*
 This view represents content-container element in the dom.
 1. holds all of the subviews
 2. extends AbstractContentView
 3. sets Monster on populate
*/

define([
    'models/Monster',
    'views/AbstractContent',
    'views/MonsterView',
    'text!templates/customizeTemplate.html',
    'text!templates/MonsterTemplate.html'],function(Monster,AbstractContentView,MonsterView,customizeTemplate,MonsterTemplate){

	var CustomizeView = AbstractContentView.extend({

		el: $('#content-container'),
		tagName: "div",

		// subsection progress management

		firstPageIntro: true,
		steps: ["customize/type", "customize/color", "customize/accessories", "customize/name", "customize/final"], // match router
		stepClasses: ["CustomizeTypeView", "CustomizeColorView", "CustomizeAccessoriesView", "CustomizeNameView", "CustomizeFinalView"],
		currentStepIndex: 0,
		lastStepIndex: 0,
		stepsLoading: [],
		stepsLoaded: [],
		currentBgNumber: null,
		lastBgNumber: null,

		currentCardType: '',
		cardFlipComplete: true,
		cardVisible: false,
		cardImage: null,

		clickTime: 0,

		monsterLoaded: false,
        monsterView:MonsterView,

		// listeners

		currentListener: null,
		currentRemovalListener: null,

		// monster 

		defaultMonster: new Monster(),
		//monsterLoader: new PxLoader(),

		// init ---------------------------------------------------------------------  /

		initialize:function(options){
			var self = this;
			this.cid = options.cid;

			// dom ready

			$(function(){
					self.render();
			});
		},

		// render -------------------------------------------------------------------  /

		render: function(){
			this.$el.append("<div id='" + this.cid + "' class='content-view'>" + customizeTemplate + "</div>");
			this.open();
		},

		open:function(){

			var self = this;

			self.populate();

			// intro transition
		},

		populate:function(){
            var self = this;
            if(!App.user.monster){
//                //if monster does not exist set it to default monster
                App.user.monster = self.defaultMonster;
                var monsterContainer = $('#monster-canvas-container');
                this.monsterView = new MonsterView({model:App.user.monster, el:monsterContainer});
            }
//
			//Backbone.dispatcher.trigger("contentOpen", [this.cid]);//cid is set w the router

            Backbone.dispatcher.on("subContentOpen", self.onSubContentOpen, self);
            Backbone.dispatcher.on("colorChange", self.onColorChange, self);
            Backbone.dispatcher.on("typeChange", self.onTypeChange, self);
            Backbone.dispatcher.on("typeChangeHair", self.onTypeChangeHair, self);
            Backbone.dispatcher.on("typeChangeLashes", self.onTypeChangeLashes, self);
            Backbone.dispatcher.on("clearMonsterName", self.onClearMonsterName, self);
			Backbone.history.on('route', this.onRoute, self);
			self.stepsLoading = [];
			self.stepsLoaded = [];
			// forward / back buttons
			self.initControlButtons();
            self.hideMonster(0);
			self.firstPageIntro = false;
		},

        onSubContentOpen: function(e){
            var self = this;
            switch(e[0]){

                case "CustomizeTypeView":
                    self.hideMonster();
                    break;

                case "CustomizeColorView":
                case "CustomizeAccessoriesView":
                case "CustomizeNameView":
                    self.showMonster();
                    break;
                case 'CustomizeFinalView':
                    self.showMonster();
                    self.moveMonsterToCenter();
                    break;
            }

        },

        onRoute: function(e){
            //called when the router changes the url
            this.updateIndex();
        },

        updateIndex:function(url){

            var self = this;

            if(!url){
                var hash = window.location.hash;
                url = hash.substr(1).toLowerCase();
            }

            if(url == "customize"){
                url = "customize/type";
            }

            self.lastStepIndex = self.currentStepIndex;

            var loc = url.toLowerCase();

            self.currentStepIndex = self.steps.indexOf(loc);

            if(self.currentStepIndex < 0){
                self.currentStepIndex = 0;
            }

            // next button

            var nextButtonIndex = self.currentStepIndex + 1;

            if(nextButtonIndex < self.steps.length){
                $('#next-button-hitarea a').attr('href', '#' + self.steps[nextButtonIndex]);
                $('#next-button-hitarea a').text('NEXT', '#').end()
                $('#next-button-hitarea').css("background-color", "white");
            }
            else {
                $('#next-button-hitarea a').attr('href', '#' + self.steps[self.currentStepIndex-1]);
                $('#next-button-hitarea a').text('BACK', '#');
                $('#next-button-hitarea').css("background-color", "yellow");
            }

            // prev button

            var prevButtonIndex = self.currentStepIndex - 1;

            if(prevButtonIndex >= 0){
                $('#prev-button-hitarea a').attr('href', '#' + self.steps[prevButtonIndex]);
            }

            if(self.currentStepIndex >= 1 && self.currentStepIndex < self.steps.length-1){
                self.showPrevButton();
            } else {
                self.hidePrevButton();
            }

            //

            if(!self.firstPageIntro){
                self.preloadSubSectionContent();
                //self.outroOldNumber();
            }

            //update nav timeline

            var timelineNumber = $('.numbers').children().eq(self.currentStepIndex).css('visibility','visible');
            timelineNumber.siblings().css('visibility', 'hidden');
            var wid = ((self.currentStepIndex) * 85);
            var timelineNumberMask = $('#progress-numbers-container').find('.maskHolder').css('width',wid);

            // update customize event listeners

            //self.updateListeners();
            self.changeBackgroundNumber();
        },

        changeBackgroundNumber:function(){
            var self = this;
            $('#background-numbers').find('img').css('display','none');
            $('#background-numbers').find('img').eq(self.currentStepIndex).css('display','block');
        },

        onClearMonsterName:function(){
            App.user.monster.set({"monsterName":''});
        },

        onTypeChange:function(e){
            App.user.monster.set({"resourcePath":e[0],"type":e[1], "resourcePathHair":"", "resourcePathLashes":""});
        },

        onColorChange:function(e){
            App.user.monster.set({"resourcePath":e[1]});
        },

        onTypeChangeHair:function(e){
            App.user.monster.set({"resourcePathHair":e[0]});
        },

        onTypeChangeLashes:function(e){
            App.user.monster.set({"resourcePathLashes":e[0]});
        },

		initControlButtons: function(e){
			var self = this;
			//
			$('#next-button-hitarea').addClass('hidden');
			$('#prev-button-hitarea').addClass('hidden');
			self.introNextButton();
		},

		introNextButton: function(){
			var self = this;
			$('#next-button-hitarea').removeClass('hidden');
		},

		// show / hide prev button (small)

		showPrevButton: function(){

			var self = this;

			$('#prev-button-hitarea').removeClass('hidden');
		},

		hidePrevButton: function(){

			var self = this;

			$('#prev-button-hitarea a').addClass('hidden');
		},


		showPrevButton: function(){

			var self = this;

			$('#prev-button-hitarea').removeClass('hidden');
		},

		hidePrevButton: function(){

			var self = this;

			$('#prev-button-hitarea').addClass('hidden');
		},

        preloadSubSectionContent: function(callBack, context){
            var self = this;
            var sectionIndex = self.currentStepIndex+1;
            var sectionContent = [];

            if(!self.monsterLoaded){
                self.loadMonster();
            }
            else {
                self.renderMonster();
            }
		},

        // load user's monster ------------------------------------------------------	/

        loadMonster:function(){
            var self = this;
            self.renderMonster();
            self.monsterLoaded = true;
        },

        renderMonster:function(){
           var self = this;
           this.monsterView.render();
           Backbone.dispatcher.trigger('currentStepIndexChange',[self.currentStepIndex]);
        },



        showMonster:function(transitionTime){
            var self = this;
            $('#monster-canvas-container').removeClass('hidden');
            $('#monster-canvas-container').css('left',310+'px');

        },

        hideMonster:function(transitionTime, hideCanvasOnComplete){
          var self = this;

            $('#monster-canvas-container').addClass('hidden');
//

        },

        moveMonsterToCenter:function(){
            TweenLite.to($('#monster-canvas-container'), 1, {css:{left:"166px"}, delay:0.5});
        },

        // handle sub page changes --------------------------------------------------	/

		close:function(){
			Backbone.dispatcher.trigger("contentClose", [this.cid]);
			// outro transition
            App.router.off('route', this.onRoute);
            Backbone.dispatcher.off("subContentOpen", self.onSubContentOpen, self);
			this.destroy();
		},

		// destroy ------------------------------------------------------------------  /

		destroy: function(e){
			this.depopulate();
			// remove elements
			$('#content-container #' + this.cid).remove();

			// keep this at the very last
			Backbone.dispatcher.trigger("destroy");
		}
	});

	return CustomizeView

});