
define(['backbone','views/AbstractContent','views/MonsterView','text!templates/customizeTypeTemplate.html'], function(Backbone,AbstractContentView,MonsterView,customizeTypeTemplate){

	var CustomizeTypeView = AbstractContentView.extend({

		el: $('#content-container'),
		tagName: "div",
		// custom vars

		currentMonsterIndex: -1,
		slideOffset: 0,
		monsterWidth: 0,
		visibleMonsters: [],
		monsters: [],

		firstSlide: true,
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

		render:function(){

			TweenMax.set(this.$el, {opacity:0});
			var container = $("#" + this.parentID + " #subpage-container");
			container.append("<div id='" + this.cid + "' class='content-view'>" + customizeTypeTemplate + "</div>");
			this.open();
		},

		// open / close transition methods ------------------------------------------  /

		open: function(e){			

			this.populate();
			Backbone.dispatcher.trigger("subContentOpen", [this.cid]);
			
			// intro transition
			TweenMax.to(this.$el, .5, {opacity:1, ease:Quad.easeOut});
		},

		// populate / depopulate methods --------------------------------------------  /

		populate: function(){
			// populate content here
			// allows you to keep open() untouched if transitions are to be inherited/generic

			var self = this;

			$('#arrows-container').fadeOut(0);

			var $leftArrow = $('#left-arrow .arrow');
			var $rightArrow = $('#right-arrow .arrow');

			$leftArrow.find('.over').css({opacity:0});
			$rightArrow.find('.over').css({opacity:0});

			self.populateMonsters(); 
		},

		populateMonsters:function(){
			/*
				there are five monsters in appResources.js
			*/
			var self = this;
			var defaultMonsters = App.resources.monsterParts.where({default:true});

            var monstersContainer = $('#monsters-container');

			self.visibleMonsters = [];
			self.monsters = [];

			for(var i=0; i < defaultMonsters.length; i++){
				var monsterModel = defaultMonsters[i];
				var monster = new MonsterView({model:monsterModel,el:monstersContainer});

				self.monsters.push(monster);
			}
			self.currentMonsterIndex = 1;
			self.changeMonsterIndex(self.currentMonsterIndex - 1, "right", 1.2, Quart.easeInOut);

			self.showArrows();
		},

		changeMonsterIndex: function(index, direction, transitionTime, ease){
			var self = this;

			if(index != self.currentMonsterIndex){
				var monstersContainer = $('#monsters-container');

				monstersContainer.empty();

				direction = (direction == undefined) ? "right" : direction;
				transitionTime = (transitionTime == undefined) ? 0.6 : transitionTime;
				ease = (ease == undefined) ? Quad.easeInOut : ease;

				if(index >= self.monsters.length){
					index = 0;
				}

				if(index < 0){
					index = self.monsters.length-1;
				}
				//monsterView id
				var currentMonsterID = self.monsters[index].id;
				
				var currentMonster = $(monstersContainer).find('#' + currentMonsterID);
				//console.log('var currentMonster = ',currentMonster);

				var MONSTER_SPACING = 810;
				var END_X = 166;		

				var indexDistance = 0;
				var playheadIndex = self.currentMonsterIndex;
				var monsterIndex = playheadIndex;
				var currentMonsterX = END_X;

				var newMonsters = [];
				var monster;

				if(monsterIndex != index){
					if(direction == "left"){
						playheadIndex ++;
						monsterIndex ++;
						indexDistance ++;
					}

					else if(direction == "right"){
						playheadIndex --;
						monsterIndex --;
						indexDistance --;
					}

					if(monsterIndex < 0){
						monsterIndex = self.monsters.length-1;
					}

					if(monsterIndex >= self.monsters.length){
						monsterIndex = 0;
					}

					monster = self.monsters[monsterIndex];
					monster = self.monsters[monsterIndex].render();

					monster.setXpos(currentMonsterX + indexDistance * MONSTER_SPACING);

					self.visibleMonsters.push(monster);
					newMonsters.push(monster);
				}


				self.currentMonsterIndex = index;

                Backbone.dispatcher.trigger("typeChange",[self.monsters[monsterIndex].model.get('resourcePath'),self.monsters[monsterIndex].model.get('monsterType')]);
			}


            function onIndexChangeComplete(){
			}
		},

		showArrows:function(){
			var self = this;
			var monster = self.monsters[self.currentMonsterIndex];

			var $leftArrow = $('#left-arrow .arrow');
			var $rightArrow = $('#right-arrow .arrow');

			$leftArrow.css({opacity:1});
			$rightArrow.css({opacity:1});

			self.enableArrowButtons();

			$('#arrows-container').fadeIn(0);
		},

		enableArrowButtons:function(){
			var self = this;

			var $leftArrow = $('#left-arrow .arrow');
			var $rightArrow = $('#right-arrow .arrow');

			var $leftArrowShadow = $('#left-arrow .arrow-shadow');
			var $rightArrowShadow = $('#right-arrow .arrow-shadow');

			$leftArrow.unbind('click');
			$rightArrow.unbind('click');

			// hover

			$leftArrow.hover(
				function(e){ TweenMax.to($(this).find('.over'), 0.15, {opacity:1, ease:Quad.easeOut}); }, 
				function(e){ TweenMax.to($(this).find('.over'), 0.2, {opacity:0, ease:Quad.easeOut}); }
			);

			$rightArrow.hover(
				function(e){ TweenMax.to($(this).find('.over'), 0.15, {opacity:1, ease:Quad.easeOut}); }, 
				function(e){ TweenMax.to($(this).find('.over'), 0.2, {opacity:0, ease:Quad.easeOut}); }
			);
			
			$leftArrow.click(function(e){
				e.preventDefault();
				self.leftMonster();
			});

			$rightArrow.click(function(e){
				e.preventDefault();
				self.rightMonster();
			});
		},

		leftMonster: function(e){
			var self = this;
			self.changeMonsterIndex(self.currentMonsterIndex-1, "right");
		},

		rightMonster: function(e){
			var self = this;
			//change monster index and set direction
			self.changeMonsterIndex(self.currentMonsterIndex+1, "left");
		},

		close: function(e){						
			
			Backbone.dispatcher.trigger("subContentClose", [this.cid]);
			// outro transition goes here
			this.destroy();
		},

		// destroy ------------------------------------------------------------------  /

		destroy: function(e){
			
			// remove elements
			if($('#subpage-container #' + this.cid)){
				console.log('destroying ',this.cid);
			}
			$('#subpage-container #' + this.cid).remove();

			// keep this at the very last
			Backbone.dispatcher.trigger("destroy");
		}
		

	});

	return CustomizeTypeView;
});