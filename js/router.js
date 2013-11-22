
define(['backbone',
	'views/AbstractContent',
	'views/SplashView',
	'views/CustomizeView',
	'views/CustomizeTypeView',
	'views/CustomizeColorView',
	'views/CustomizeAccessoriesView',
	'views/CustomizeNameView',
    'views/CustomizeFinalView'],function(
		Backbone,
		AbstractContentView,
		SplashView,
		CustomizeView,
		CustomizeTypeView,
		CustomizeColorView,
		CustomizeAccessoriesView,
		CustomizeNameView,
        CustomizeFinalView){

	var Router = Backbone.Router.extend({

		routes:{
			"":                       "splash",
			"home":                   "splash", 
			"customize":              "customize",  
			"customize/*":            "customize",            	
			"customize/type":         "customizeType",        	
			"customize/color":        "customizeColor",  
			"customize/accessories":  "customizeAccessories", 
			"customize/name":         "customizeName",
            "customize/final":        "customizeFinal"
        },

		initialize:function(options){
			var self = this;
		},

		// vars ---------------------------------------------------------------------  /

		currentPage: null,
	    lastPage: null,

	    currentSubPage: null,
	    lastSubPage: null,

		splash:function(){
			this.changePage('splash');
		},

		customize: function() {
	      this.changePage("customize",'type');
	    },

	    customizeType: function() {
	      this.changePage("customize", "type");
	    },

	    customizeColor: function() {
	      this.changePage("customize", "color");
	    },

	    customizeAccessories: function() {
	      this.changePage("customize", "accessories");
	    },

	    customizeName: function() {
	      this.changePage("customize", "name");
	    },

        customizeFinal: function() {
            this.changePage("customize","final");
        },

		changePage:function(id,childID){
			//id.substr(0,1) returns first letter, id.substr(1) returns all letters after the first letter
			var pageClassName = id.substr(0,1).toUpperCase() + id.substr(1);
		    var subClassName = (childID)? pageClassName + childID.substr(0,1).toUpperCase() + childID.substr(1) + "View" : "";
		    pageClassName += "View";

		    if(!this.currentPage || pageClassName != this.currentPage.cid){

		    var options = {cid:pageClassName, sub_id:subClassName};
		    var nextPage = null;

		    switch(pageClassName)
		    {
		       case "SplashView": 
		       		nextPage = new SplashView(options); 
		       		break; 
		       case "CustomizeView": 
		       		nextPage = new CustomizeView(options); 
		       		break;
            }

		    if(nextPage){ 
		        if(this.currentPage){ this.currentPage.close(); }
		        this.currentPage = nextPage;
		        this.currentSubPage = null;
		      }
		        
		    }

		    if(childID){ 
		    	this.changeSubPage(id, childID); 
		    }

		    return this.currentPage;      
		},

		changeSubPage:function(id,childID){
		  //add sub page content to customize page
		  var pageClassName = id.substr(0,1).toUpperCase() + id.substr(1);
	      var subClassName = pageClassName + childID.substr(0,1).toUpperCase() + childID.substr(1) + "View";
	      pageClassName += "View";

	      // check to see if page change is necessary

	      if(!this.currentPage || pageClassName != this.currentPage.cid){ 
	      	this.changePage(id); 
	      }
	      
	      // check if sub-page change necessary

	      if(!this.currentSubPage || subClassName != this.currentSubPage.cid){

	        this.lastSubPage = this.currentSubPage;

	        var options = {
	        	parent:this.currentPage, 
	        	cid:subClassName
	        };

	        var nextSubPage = null;

	        switch(subClassName)
	        {
	          case "CustomizeTypeView": 
	          		nextSubPage = new CustomizeTypeView(options); 
	          		break; 
	          case "CustomizeColorView": 
	          		nextSubPage = new CustomizeColorView(options); 
	          		break; 
	          case "CustomizeAccessoriesView": 
	          		nextSubPage = new CustomizeAccessoriesView(options); 
	          		break; 
	          case "CustomizeNameView": 
	          		nextSubPage = new CustomizeNameView(options); 
	          		break;
              case "CustomizeFinalView":
                    nextSubPage = new CustomizeFinalView(options);
                    break;
	        }

	        if(nextSubPage){ 
	          if(this.currentSubPage){ 
	          	this.currentSubPage.close(); 
	          }
	          this.currentSubPage = nextSubPage;
	        }
	      }
      		return this.currentSubPage;
		}
	});

	return Router;
});