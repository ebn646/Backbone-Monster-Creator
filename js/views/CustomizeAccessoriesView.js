define(['backbone',
        'views/AbstractContent',
        'views/AccessoryCollectionView',
        'text!templates/customizeAccessoriesTemplate.html'],function(Backbone,AbstractContentView,AccessoryCollectionView,customizeAccessoriesTemplate){

	CustomizeAccessoriesView = AbstractContentView.extend({
		el:$('#content-container'),
		tagName:"div",
		cid:'',
		parent:null,
		container:null,
		parentID:'',
        labelButtonTemplate:'',
        thumbButtonTemplate:'',

        //

        currentCategory: '',

        //

        conflictMap: {},
        catMenuOpen: true,
        //

        accessoryView:null,


    initialize:function(options){

			var self = this;
			this.cid = options.cid;
			this.parent = options.parent;
			this.parentID = this.parent.cid;

			// dom ready

			$(function(){
					self.render();
			});
		},

        events:{
           'click #back-button':'closeThumbnailMenu'
        },

        closeThumbnailMenu:function(e){
            e.preventDefault();
            this.currentCategory = '';
            this.closeThumbView();
        },

        closeThumbView:function(){
            var self = this;
            $('#thumbnail-buttons-container').css({'display':'none'});
            $('#label-buttons-container').css({'display':'block'});
            $('#label-buttons-container').find('.buttons-container').css({'display':'block'});
        },

		render:function(){
			this.container = $("#" + this.parentID + " #subpage-container");
			TweenMax.set(this.container, {opacity:0});
			this.container.append("<div id='" + this.cid + "' class='content-view'>" + customizeAccessoriesTemplate + "</div>");
			this.open();
		},

		// open / close transition methods ------------------------------------------  /

		open:function(e){

			Backbone.dispatcher.trigger("subContentOpen", [this.cid]);
			
			// intro transition
			TweenMax.to(this.container, .5, {opacity:1, ease:Quad.easeOut});
            this.populate();
		},

		// populate / depopulate methods --------------------------------------------  /

		populate:function(){
			// populate content here
			// allows you to keep open() untouched if transitions are to be inherited/generic

			var self = this;

            TweenMax.delayedCall(0.4, self.generateCategoryThumbs, [], self);

            this.accessoryView = new AccessoryCollectionView();

        },

        generateCategoryThumbs:function(){
            var self = this;
            var results = App.resources.monsterParts.getByTypeAndCat(App.user.monster.get("type"), "accessories");

            var labelButtonContainer = $('#label-buttons-container').find('.buttons-container');

            //hide thumbnail congtainer

            $('#thumbnail-buttons-container').css({'display':'none'});

            var buttonIndex = 0;

            for(var i=0; i<$('#label-buttons-container').find('.label-button a').length; i++){
                var link =  $('#label-buttons-container').find('.label-button a')[i];

                $(link).click(function(e){
                    e.preventDefault();
                    var buttonCategory = $(this).attr('rel');
                    console.log('=============== button category is ',buttonCategory);
                    self.openThumbnailMenu(buttonCategory);
                });
            }
        },

        openThumbnailMenu:function(category){
            var self = this;
            self.hideCategoryThumbs();
            TweenMax.delayedCall(0.16, self.introAccessoryThumbs, [category], self);
        },

        hideCategoryThumbs:function(){
            var labelButtonContainer = $('#label-buttons-container').find('.buttons-container').css('display','none');
        },

        introAccessoryThumbs:function(category){
            var self = this;
            $('#thumbnail-buttons-container').css({'display':'block'});
            $('#label-buttons-container').css({'display':'none'});
            console.log('current subcategory is ', category);
            console.log('current type is ', App.user.monster.get('type'));
            self.generateAccessoryThumbs(category);
        },

        generateAccessoryThumbs:function(category){
            var self = this;

            var thumbButtonContainer = $('#thumbnail-buttons-container').find('.thumbs-container');
            thumbButtonContainer.empty();

            var results = App.resources.monsterParts.getByTypeCatAndSubCat(App.user.monster.get('type'), 'accessories', category);
            console.log('results are ',results);
            var currentAccessories = App.user.monster.get('accessories');

            var i = 0;
            var thumbX = 0;
            var thumbY = 0;
            var thumbIndex = 0;

            self.currentCategory = category;

            var accessoryView = new AccessoryCollectionView({el:thumbButtonContainer, collection:results});
            accessoryView.render();

            var $backbutton = $('#accessories-selector').find('#back-button');
            $backbutton.css('display','block');
        },

		close:function(e){
			
			Backbone.dispatcher.trigger("subContentClose", [this.cid]);
			// outro transition
			this.destroy();
		},

		// destroy ------------------------------------------------------------------  /

		destroy:function(e){
			
			// remove elements
			if($('#subpage-container #' + this.cid)){
				//alert('destroy me');
			}
			$('#subpage-container #' + this.cid).remove();

			// keep this at the very last
			Backbone.dispatcher.trigger("destroy");
		}
	})

	return CustomizeAccessoriesView;

});