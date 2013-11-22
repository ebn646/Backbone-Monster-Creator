
var App = {};

App.resources = {};
App.user = {};

define(['jquery',
    'underscore',
    'backbone',
    'models/AppResources',
    'models/AppCopy',
    // 'models/AppConfig',
    'pxloader',
    'pxloaderimage',
	'tweenmax','router'],function(Jquery,Underscore,Backbone,AppResources,AppCopy,loader,imageloader,Tweenmax,Router){

	var AppView = Backbone.View.extend({

		initialize:function(){
			var self = this;
			
			Backbone.dispatcher = _.extend({}, Backbone.Events);

			//dom ready
			$(function(){
            App.domReady = true;
            self.render();    
          });
		},

		render:function(){
			var self = this;
            this.loadSiteAssets();
		},

        loadSiteAssets:function(){
            var self = this;
            var loader = new PxLoader();
            //load splash images
            _.each(App.resources.images.models,function(item){
                var url = item.get('imagePath');
                loader.add(new PxLoaderImage(url));
            })

            //load default monster images
            var defaultMonsters = App.resources.monsterParts.where({default:true});
            _.each(defaultMonsters,function(item){
                var url = item.get('resourcePath');
                loader.add(new PxLoaderImage(url));
            })

            loader.addCompletionListener(function() {
                $('#overlay-container').empty();
                TweenMax.delayedCall(1, self.revealApplication, [], self);
            });

            loader.start();
        },

		revealApplication:function(){
 			var self = this;
 			
 			App.appView = this;
 			App.router = new Router();
 			Backbone.history.start();
		}

	})//end view

	return AppView;

});//end define