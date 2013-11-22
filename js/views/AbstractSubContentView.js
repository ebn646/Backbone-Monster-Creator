/*
 loads into the content-container div in the subContent view
*/


define(['backbone'], function(Backbone){

	var AbstractSubContentView = Backbone.View.extend({
		
		el: $('#content-container'),
		tagName: "div",
		cid: '',
		parent: null,
		parentID: '',

		// init ---------------------------------------------------------------------  /

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

		// render -------------------------------------------------------------------  /

		render: function(){ 

			var container = $("#" + this.parentID + " #subpage-container") || $('#content-container');
			//$(container).append("<div id='" + this.cid + "' class='content-view'>" + App.resources.partials.getData(this.cid) + "</div>");
			this.open();
		},

		// populate / depopulate methods --------------------------------------------  /

		populate: function(){
			// populate content here
			// allows you to keep open() untouched if transitions are to be inherited/generic
		},

		depopulate: function(){
			// remove any populated content here
			// allows you to keep close() untouched if transitions are to be inherited/generic
		},

		// open / close transition methods ------------------------------------------  /

		open: function(e){			

			this.populate();
			Backbone.dispatcher.trigger("subContentOpen", [this.cid]);
			
			// intro transition
		},

		close: function(e){						
			
			Backbone.dispatcher.trigger("subContentClose", [this.cid]);
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
		}
		
	});

	return AbstractSubContentView;

});