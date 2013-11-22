

define(['backbone','text!templates/customizeFinalTemplate.html','models/Monster'],function(Backbone,customizeFinalTemplate,Monster){

    var FinalView = Backbone.View.extend({
        el: $('#content-container'),
        tagName: "div",
        className: "customizefinalview",

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

        render:function(){
           console.log('CustomizeFinalView is rendering now.');
            this.container = $("#" + this.parentID + " #subpage-container");
           // TweenMax.set(this.container, {opacity:0});
            this.container.append("<div id='" + this.cid + "' class='content-view'>" + customizeFinalTemplate + "</div>");
            this.open();

        },

        open:function(){
            this.populate();
            Backbone.dispatcher.trigger("subContentOpen", [this.cid]);

            // intro transition
        },

        populate: function(){
            // populate content here
            // allows you to keep open() untouched if transitions are to be inherited/generic

            var self = this;
        },


        close: function(e){
            console.log('CustomizeFinalView is closing now.');
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

    return FinalView;
});