define(['backbone',

        'tweenmax',
        'views/ThumbnailButtonView'],function(Backbone,Tweenmax,ThumbnailButtonView){

    var ColorThumbCollectionView = Backbone.View.extend({

        el:$(".thumbnails-container"),

        initialize:function(){
          console.log(this.collection);
        },

        render: function () {
            console.log(this.$el);
            var that = this;
            _.each(this.collection, function (item) {
                that.renderThumb(item);
            }, this);
        },

        renderThumb: function (item) {
            var thumbView = new ThumbnailButtonView({
                model: item
            });
            this.$el.append(thumbView.render().el);

            TweenMax.from(thumbView.$el, 0.3, {opacity:0, scale:0.2, rotation:45 + (45 - Math.random() * 90),delay:1 });
        }

    });

    return ColorThumbCollectionView;

})