define(['backbone','text!templates/thumbnailTemplate.html'],function(Backbone,ThumbnailTemplate){

    var ThumbnailButtonView = Backbone.View.extend({
        tagName:'div',
        className: "button-thumbnail",
        template: ThumbnailTemplate,

        initialize:function(){
            //this.render();
        },

        events:{
          'click a':'onThumbClick'
        },

        onThumbClick:function(e){
            console.log('============================',this.model);
            var rel = this.model.get('classID');
            var img = this.model.get('resourcePath');
            Backbone.dispatcher.trigger("colorChange", [rel,img]);
            e.preventDefault();
        },

        render:function(){
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));

            return this;
        }
    });

    return ThumbnailButtonView
});