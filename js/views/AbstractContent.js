/*

*/

define(['backbone','tweenmax'],function(Backbone,Tweenmax){

	var AbstractContentView = Backbone.View.extend({

		el: $('#content-container'),
		tagName: "div",

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
			
		},

		open:function(){
			this.populate();
			Backbone.dispatcher.trigger("contentOpen", [this.cid]);

			// intro transition
		},

        populate:function(){

        },

		close:function(){
			Backbone.dispatcher.trigger("contentClose", [this.cid]);
			// outro transition
			this.destroy();
		},

		// destroy ------------------------------------------------------------------  /

		destroy: function(e){

			this.depopulate();

			// remove elements
			$('#content-container #' + this.cid).remove();

			// keep this at the very last
			Backbone.dispatcher.trigger("destroy");
		},

		depopulate: function(){
			// remove any populated content here
			// allows you to keep close() untouched if transitions are to be inherited/generic
		}

	});

	return AbstractContentView;

});