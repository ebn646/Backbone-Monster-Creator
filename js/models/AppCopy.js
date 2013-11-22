
define(['backbone'], function(BackBone){

    /* ----------------------------------------------------------------------------

     All text that is not already in a partial will be located here.

     ------------------------------------------------------------------------------- */

    App.copy = {};

    // generic text resources -----------------------------------------------------  /

    var TextAssociation = Backbone.Model.extend({

        // associate word with textID (unique to

        defaults: {
            textID: '',
            text: '',
        },

        initialize: function() {}

    });

    var AppCopy = Backbone.Collection.extend({

        defaults: {
            model: TextAssociation
        },

        getTextByClassID: function(textID){
            var result = this.findWhere({textID:textID}).get("text");
            return result;
        },

    });

    // images ---------------------------------------------------------------------  /

    App.copy = new AppCopy([

        {textID:'fur', text:'Fur'},
        {textID:'hair', text:'Hair'},
        {textID:'hats', text:'Hats'},
        {textID:'horns', text:'Horns'},
        {textID:'glasses', text:'Glasses'},
        {textID:'fangs', text:'Fangs'},
        {textID:'wings', text:'Wings'},
        {textID:'lashes', text:'Eyelashes'},
        {textID:'bonus', text:'Bonus'},

        {textID:'facebookShareTitle', text:'Monsters University Create-A-Monster'},
        {textID:'facebookShare', text:'Meet my monster student and create your own. Disney/Pixar\'s Monsters University is in theatres in 3D June 21.'},
        {textID:'twitterShare', text:'Meet my monster student and create your own with the #MonstersU Create-A-Monster app! '},
        {textID:'tumblrShare', text:'Meet my monster student and create your own with the Monsters University Create-A-Monster app! '},
        {textID:'emailShare', text:'Check out my monster student and create your own with the Monsters University Create-A-Monster app! '},

    ]);

});