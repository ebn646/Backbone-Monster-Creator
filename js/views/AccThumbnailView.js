define(['backbone','text!templates/AccThumbnailTemplate.html'],function(Backbone,AccThumbnailTemplate){

    var AccThumbnailView = Backbone.View.extend({

        tagName:'div',
        className:'button-thumbnail',
        template: AccThumbnailTemplate,

        initialize:function(){

        },

        events:{
            'click a':'onThumbClick'
        },

        onThumbClick:function(e){

            var id = this.model.get('subCategory');
            switch(id){
                case 'hair':{
                    Backbone.dispatcher.trigger("typeChangeHair", [this.model.get('resourcePath')]);
                    break;
                }
                case 'eyelashes':{
                    Backbone.dispatcher.trigger("typeChangeLashes", [this.model.get('resourcePath')]);
                    break;
                }

            }

            e.preventDefault();
        },

        render:function(){
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));

            return this;
        }
    });

    return AccThumbnailView;
});