/*

*/
define(['backbone','timelinelite','views/AbstractContent','text!templates/splashTemplate.html'],function(Backbone,Timelinelite,AbstractContentView,SplashTemplate){

	var SplashView = AbstractContentView.extend({

		el: $('#content-container'),
		tagName: "div",
        title:'img',
        monsterHolder:'div',
        img2:'img',
        img3:'img',
        img4:'img',
        controls:'div',

		initialize:function(options){
			var self = this;
			this.cid = options.cid;

			// dom ready

			$(function(){
					self.render();
			});
		},

		render:function(){
			TweenMax.set(this.$el, {'visibility':'hidden'});
			this.$el.append("<div id='" + this.cid + "' class='content-view'>" + SplashTemplate + "</div>");
            this.monsterHolder = this.$el.find('#monsterHolder');
            this.title = this.$el.find('#title');
            this.img2 = this.$el.find('#img2')
            this.img3 = this.$el.find('#img3');
            this.img4 = this.$el.find('#img4');
            this.controls = this.$el.find('#controls-container');
			this.open();
		},

		open:function(){
			console.log('+++++++++++++++++++ splashview is opening now.');
            TweenMax.set(this.$el, {'visibility':'visible'});
			Backbone.dispatcher.trigger("contentOpen", [this.cid]);

			// intro transition

            var tl = new TimelineLite();
            //append a from() tween
            tl.from(this.title, 1, {alpha:0});
            tl.from(this.monsterHolder, 1, {css:{left:"-600px"}, delay:0.5});
            tl.staggerFrom([this.img2, this.img3, this.img4],.5, {alpha:0}, 0.4);
            tl.from( this.controls, 1, {alpha:0});
        },

		close:function(){
			console.log('+++++++++++++++++++ splash view is closing now');
			Backbone.dispatcher.trigger("contentClose", [this.cid]);
			// outro transition
			this.destroy();
		},

		destroy: function(e){

			this.depopulate();

			// remove elements
			$('#content-container #' + this.cid).remove();

			// keep this at the very last
			Backbone.dispatcher.trigger("destroy");
		},

		depopulate:function(){

		}
	});

	return SplashView;

});
