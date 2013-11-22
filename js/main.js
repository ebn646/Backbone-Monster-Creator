/*

*/

require.config({
  paths: {
    jquery: 'libs/jquery-min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    templates: '../templates',
    tweenlite: "libs/TweenLite.min",
	tweenmax: "libs/TweenMax.min",
	timelinelite: "libs/TimelineLite.min",
	timelinemax: "libs/TimelineMax.min",
    "pxloader": "libs/PxLoader",
    "pxloaderimage": "libs/PxLoaderImage",
    "pxloadersound": "libs/PxLoaderSound",
    "pxloadervideo": "libs/PxLoaderVideo",
    "pxloadertext": "libs/PxLoaderText"
  }
});

// Load our app module and pass it to our definition function
require(['app'], function(App){
	new App();
});