/*
    1.works with models/Monster
*/

define(['backbone','tweenmax','text!templates/MonsterTemplate.html'],function(backbone,Tweenmax,MonsterTemplate){

	var MonsterView = Backbone.View.extend({
		tagName:'div',
		id:null,
		template: MonsterTemplate,
        name:null,

		initialize:function(options){
			//this.model = options.model;
            //el is monstercontainer from customize view
			this.id = this.model.get('classID');
            this.model.bind('change', this.render, this);
        },

		setXpos:function(xpos){

			this.$el.find('.monster').css('left',166);
		},

		render:function(){
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

            //set name
            var nametxt =  this.$el.find('.nametxt');

            if(this.model.get('monsterName') == "" || this.model.get('monsterName') == undefined){
                nametxt.css('display','none');
            }else{
                var name = this.model.get('monsterName').substr(0, 1).toUpperCase() + this.model.get('monsterName').substr(1);
                nametxt.html("Hi, I'm " + name);
                TweenMax.from(nametxt, 1, {css:{opacity:0, y:10}, delay:1});
            }

            this.open();
            return this;
		},

        open:function(){
        }

	});

	return MonsterView
});