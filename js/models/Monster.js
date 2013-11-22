define(['backbone'], function(BackBone){

	var Monster = Backbone.Model.extend({
		
		defaults: {
			type: 1,
            classID: "Type1Color1",
            color: 'Type1Color1',
            resourcePath:  "images/monsters/type1/skin/colors/body_col_1.png",
            resourcePathHair:  "",
            resourcePathLashes:  "",
			fur: '',
			accessories: [],
			firstName: '',
			lastName: '',
			monsterName: ''
		},

        showname:function(){
            alert('showname')
           $('.nametxt').css('display,block');
        },

        hidename:function(){
            alert('hidename')
            $('.nametxt').css('display,none');
        },

		changeType: function(type){
			this.resetDefaults();
			this.set('type', type); // going to have to select defaults for each thing
		},

		getMonsterName: function(){
			return String(this.get('firstName') + " " + this.get('monsterName')).toUpperCase();
		},

		resetDefaults: function(){
			//this.clear();
			this.set(this.defaults);
			this.set('accessories', new Array());
		}
	});

	return Monster;

});