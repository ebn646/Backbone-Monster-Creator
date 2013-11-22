define(['backbone','views/AccThumbnailView'],function(backbone,AccThumbnailView){

   var AccessoryCollectionView = Backbone.View.extend({
       tagName:'div',

       initialize:function(options){
           console.log('this collection = ',this.collection);

       },

       render: function () {
           var that = this;
           _.each(this.collection, function (item) {
               that.renderThumb(item);
           }, this);
       },

       renderThumb: function (item) {
           var thumbView = new AccThumbnailView({
               model: item
           });
           this.$el.append(thumbView.render().el);
           return this;
       }

   });

    return AccessoryCollectionView;
});