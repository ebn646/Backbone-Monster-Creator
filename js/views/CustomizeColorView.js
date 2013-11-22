define(['backbone',
        'pxloader',
        'pxloaderimage',
        'views/AbstractContent',
        'views/ColorThumbCollectionView',
        'text!templates/customizeColorTemplate.html'], function(Backbone,loader,imageloader,AbstractContentView,ColorThumbCollectionView,customizeColorTemplate){

	var CustomizeColorView = AbstractContentView.extend({

		el: $('#content-container'),
		tagName: "div",
		cid: '',
		parent: null,
		container: null,
		parentID: '',
        initTime: 0,
        thumbButtonTemplate: null,

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
			this.container = $("#" + this.parentID + " #subpage-container");
			TweenMax.set(this.container, {opacity:0});
			this.container.append("<div id='" + this.cid + "' class='content-view'>" + customizeColorTemplate + "</div>");
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

            self.thumbButtonTemplate = $('#' + self.cid).find('.thumbnail-button').remove();

			Backbone.dispatcher.trigger("contentOpen", [this.cid]);

            self.buildThumbnails();

		},

        buildThumbnails:function(){
            var self = this;
            var thumbContainer = $('#color-selector').find('.thumbnails-container');
            thumbContainer.empty();
            var results = App.resources.monsterParts.getByTypeAndCat(App.user.monster.get("type"), "color");
            var thumbImages=[];
            console.log('>>>>>>>>>>>>>>', results);
            var i;

            var thumbX = 0;
            var thumbY = 0;

                for(i=0; i<results.length; i++){
                    var classID = results[i].get('classID');
                    if(results[i].get('subCategory')){
                        classID =  classID;
                    }

                }//end for

            var loader = new PxLoader();

            i = 0;

            for(i=0; i<results.length; i++){
                var url = results[i].get('thumbnailPath');
                loader.add(new PxLoaderImage(url));

            }//end for

            i = 0;

            for(i=0; i<results.length; i++){
                var url = results[i].get('resourcePath');
                loader.add(new PxLoaderImage(url));

            }//end for

            loader.addCompletionListener(function() {
                var colorThumbCollectionView = new ColorThumbCollectionView({el:$(".thumbnails-container"),collection:results});
                colorThumbCollectionView.render();
                $('.preloader').fadeOut();
            });

            loader.start();

        },

		close: function(e){
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

	return CustomizeColorView;
});