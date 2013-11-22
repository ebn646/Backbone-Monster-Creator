define(['backbone','views/AbstractContent','text!templates/customizeName.html'], function(Backbone,AbstractContentView,customizeNameTemplate){

	var CustomizeNameView = AbstractContentView.extend({

		el: $('#content-container'),
		tagName: "div",
		cid: '',
		parent: null,
		container:null,
		parentID: '',

		initialize: function(options){

			var self = this;
			this.cid = options.cid;
			this.parent = options.parent;
			this.parentID = this.parent.cid;

			// dom ready

			$(function(){
					self.render();
			});
		},

		render:function(){
            console.log('CustomizeNameView is rendering now.');
			this.container = $("#" + this.parentID + " #subpage-container");
			TweenMax.set(this.container, {opacity:0});
			this.container.append("<div id='" + this.cid + "' class='content-view'>" + customizeNameTemplate + "</div>");
			this.open();
		},

		// open / close transition methods ------------------------------------------  /

		open: function(e){			
			this.populate();
			Backbone.dispatcher.trigger("subContentOpen", [this.cid]);
			
			// intro transition
			TweenMax.to(this.container, .5, {opacity:1, ease:Quad.easeOut});
		},

		// populate / depopulate methods --------------------------------------------  /

		populate: function(){
			// populate content here
			// allows you to keep open() untouched if transitions are to be inherited/generic

			var self = this;

			Backbone.dispatcher.trigger("contentOpen", [this.cid]);
            Backbone.dispatcher.trigger("clearMonsterName");
			// connects with router to check initial values

            // next button (override)

            //App.contexts.nameView = this;
            $('#next-button-hitarea a').click(self.onNextClick);

		},

        onNextClick:function(e){
            var name = $('#first-name-field');;

            if($(name).val() == "NAME" || !$(name).val() || $(name).val().substr(0,1) == ' '){
                $(".errorimg").addClass('active');
                e.preventDefault();
            }else{
                $(".errorimg").removeClass('active');
                name = $('#first-name-field').val();
                App.user.monster.set({monsterName:name});
            }
        },

        validateForm:function(){
            var firstNameField = $('#first-name-field');
            alert(firstNameField.val());
            var valid = true;

            return valid;
        },

		close: function(e){
            $('#next-button-hitarea a').unbind('click', self.onNextClick);
			Backbone.dispatcher.trigger("subContentClose", [this.cid]);
			// outro transition
			this.destroy();
		},

		// destroy ------------------------------------------------------------------  /

		destroy: function(e){

			// remove elements
			$('#content-container #' + this.cid).remove();

			// keep this at the very last
			Backbone.dispatcher.trigger("destroy");
		}

	});

	return CustomizeNameView;
});