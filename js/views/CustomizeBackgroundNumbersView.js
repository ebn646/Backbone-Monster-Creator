/*
* view holds the background numbers
* has a listener to change when the index changes in customize view*/

/*
 1.works with models/Monster
 */

define(['backbone','tweenmax','text!templates/MonsterTemplate.html'],function(backbone,Tweenmax,MonsterTemplate){

    var CustomizeBackgroundNumbersView = Backbone.View.extend({
        tagName:'div',
        id:null,
        template: MonsterTemplate,
        name:null,

        initialize:function(options){
            console.log('++++++++++++++++++monsterView.initialize()');
            //this.model = options.model;
            //el is monstercontainer from customize view
            this.id = this.model.get('classID');
            this.model.bind('change', this.render, this);
        },

        setXpos:function(xpos){

            this.$el.find('.monster').css('left',166);
        },

        open:function(distance){
            TweenMax.to(self.visibleMonsters[i], transitionTime, {left:"+=" + distance, ease:ease, onCompleteScope:self, onComplete:onIndexChangeComplete});
        },

        render:function(){
            console.log('++++++++++++++++++monsterView.render()');
            this.$el.empty();
            var tmpl = _.template(this.template);
            this.$el.append(tmpl(this.model.toJSON()));

            if(this.model.get('resourcePathHair') != ""){
                this.$el.find('.hair').css('display','block');
            }else{
                this.$el.find('.hair').css('display','none');
            }

            if(this.model.get('resourcePathLashes') != ""){
                this.$el.find('.eyelashes').css('display','block');
            }else{
                this.$el.find('.eyelashes').css('display','none');
            }

            return this;
        }

    });

    return CustomizeBackgroundNumbersView
});