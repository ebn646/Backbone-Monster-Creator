define(['backbone'], function (Backbone) {

    App.resources = {};

    // generic view resources -----------------------------------------------------  /

    var ViewResource = Backbone.Model.extend({

        defaults: {
            classID: '',
            imagePath: '',
            parsedResourcePath: '',
            category: '',
            subCategory: '',
            parentID: '',
            data: null,
            loaded: false,
        },

        //

        initialize: function () {
        },

        //

        getParsedResourcePath: function (forcedDir) {

            if (
                this.parsedResourcePath && forcedDir == undefined) {
                return this.parsedResourcePath;
            }
            else {
                this.parsedResourcePath = App.config.directories.parseTemplatePaths(this.get('resourcePath'), forcedDir);
            }

            return this.parsedResourcePath;
        }

    });

    var AppResources = Backbone.Collection.extend({
        model: ViewResource,

        getByClassID: function (classID) {
            var result = this.findWhere({classID: classID});
            return result;
        },

        getData: function (classID) {
            var result = this.findWhere({classID: classID});
            if (result) {
                return result.get('data');
            }
            return null;
        },

        getImage: function (classID) {

            var result = this.findWhere({classID: classID});

            if (result) {
                var img = document.createElement('img');
                $(img).attr('src', result.getParsedResourcePath());
            }

            if (result && img) {
                return img;
            }

            return null;
        },

        getCanvasBitmap: function (classID) {
            var data = this.getData(classID);
            return new createjs.Bitmap(data) || null;
        },

        getByCategory: function (category) {
            var result = this.where({category: category});
            return result;
        },

        getByCatAndSubCat: function (category, subCategory) {
            var result = this.where({category: category, subCategory: subCategory});
            return result;
        },

        getParsedResourcePath: function (classID, forcedDir) {
            var result = this.findWhere({classID: classID});
            if (result) {
                return result.getParsedResourcePath(forcedDir);
            }
            return null;
        },

    });

    App.resources.images = new AppResources([
        // background numbers

        {classID: 'BgNum1', category: 'customize', imagePath: 'images/customize/01.png'},
        {classID: 'BgNum2', category: 'customize', imagePath: 'images/customize/02.png'},
        {classID: 'BgNum3', category: 'customize', imagePath: 'images/customize/03.png'},
        {classID: 'BgNum4', category: 'customize', imagePath: 'images/customize/04.png'},
        {classID: 'BgNum5', category: 'customize', imagePath: 'images/customize/05.png'},

        //intro monster

        {classID: 'SpNum1', category: 'splash', imagePath: 'images/splash/img1.png'},
        {classID: 'SpNum2', category: 'splash', imagePath: 'images/splash/img2.png'},
        {classID: 'SpNum3', category: 'splash', imagePath: 'images/splash/img3.png'},
        {classID: 'SpNum4', category: 'splash', imagePath: 'images/splash/img4.png'},
        {classID: 'SpNum5', category: 'splash', imagePath: 'images/splash/title.png'}
    ]);


    var MonsterPart = Backbone.Model.extend({

        defaults: {

            // inherited defaults

            classID: '',
            resourcePath: '',
            parsedResourcePath: '', // resource path with template variables converted to strings
            category: '',
            subCategory: '',
            parentID: '',
            data: null,
            loaded: false,

            //

            thumbnailPath: '',
            thumbnailData: null,
            parsedThumbnailPath: '',
            monsterType: 1,
            fur: false,
            universal: false,
            linkedIDs: [],
            zIndex: 0, // layer depth
            active: false, // currently toggled on
            default: false,
            resourcePathHair: "",
            resourcePathLashes: ""
        }
    });

    var MonsterParts = Backbone.Collection.extend({
        model: MonsterPart,

        getByTypeAndCat: function (monsterType, category) {

            var self = this;

            var result = self.where({monsterType: monsterType, category: category, universal: false});

            var universal = self.where({monsterType: monsterType, category: category, universal: true});

            for (var i = 0; i < universal.length; i++) {
                var found = false;
                for (var k = 0; k < result.length; k++) {
                    if (result[k].get('classID') == universal[i].get('classID')) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    result.push(universal[i]);
                }
            }

            return result;
        },

        getByTypeCatAndSubCat: function (monsterType, category, subCategory) {
            console.log('monsterType: ', monsterType);
            console.log('category: ', category);
            console.log('subCategory: ', subCategory);

            var self = this;

            var results = self.where({monsterType: monsterType, category: category, subCategory: subCategory, universal: false});

            var universal = self.where({monsterType: monsterType, category: category, subCategory: subCategory, universal: true});

            for (var i = 0; i < universal.length; i++) {
                var found = false;
                for (var k = 0; k < results.length; k++) {
                    if (results[k].get('classID') == universal[i].get('classID')) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    results.push(universal[i]);
                }
            }

            return results;
        }
    });

    App.resources.monsterParts = new MonsterParts([
        // type 1 *********
        // skin color

        {classID: "Type1Color1", resourcePath: "images/monsters/type1/skin/colors/body_col_1.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/colors/body_col_1.png", monsterType: 1, category: "color", zIndex: 1, default: true},
        {classID: "Type1Color2", resourcePath: "images/monsters/type1/skin/colors/body_col_2.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/colors/body_col_2.png", monsterType: 1, category: "color", zIndex: 1},
        {classID: "Type1Color3", resourcePath: "images/monsters/type1/skin/colors/body_col_3.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/colors/body_col_3.png", monsterType: 1, category: "color", zIndex: 1},
        {classID: "Type1Color4", resourcePath: "images/monsters/type1/skin/colors/body_col_4.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/colors/body_col_4.png", monsterType: 1, category: "color", zIndex: 1},
        {classID: "Type1Color5", resourcePath: "images/monsters/type1/skin/colors/body_col_5.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/colors/body_col_5.png", monsterType: 1, category: "color", zIndex: 1},

        // type 1 accessories
        // ** hqir
        {classID: "Type1SkinHair1", resourcePath: "images/monsters/type1/skin/hair/hair_1.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/hair/hair_1.png", monsterType: 1, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type1SkinHair2", resourcePath: "images/monsters/type1/skin/hair/hair_2.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/hair/hair_2.png", monsterType: 1, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type1SkinHair3", resourcePath: "images/monsters/type1/skin/hair/hair_3.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/hair/hair_3.png", monsterType: 1, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn2', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type1SkinHair4", resourcePath: "images/monsters/type1/skin/hair/hair_4.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/hair/hair_4.png", monsterType: 1, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type1SkinHair5", resourcePath: "images/monsters/type1/skin/hair/hair_5.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/hair/hair_5.png", monsterType: 1, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn2', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        //eyelasher
        // ** eyelashes
        {classID: "Type1SkinLashes1", resourcePath: "images/monsters/type1/skin/eyelashes/eye_1.png", thumbnailPath: "images/monsters/type1/thumbnails/skin/eyelashes/eye_1.png", monsterType: 1, category: "accessories", subCategory: "eyelashes", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},

        //type 2
        {classID: "Type2Color1", resourcePath: "images/monsters/type2/skin/colors/body_col_1.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/colors/body_col_1.png", monsterType: 2, category: "color", zIndex: 1, default: true},
        {classID: "Type2Color2", resourcePath: "images/monsters/type2/skin/colors/body_col_2.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/colors/body_col_2.png", monsterType: 2, category: "color", zIndex: 1},
        {classID: "Type2Color3", resourcePath: "images/monsters/type2/skin/colors/body_col_3.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/colors/body_col_3.png", monsterType: 2, category: "color", zIndex: 1},
        {classID: "Type2Color4", resourcePath: "images/monsters/type2/skin/colors/body_col_4.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/colors/body_col_4.png", monsterType: 2, category: "color", zIndex: 1},
        {classID: "Type2Color5", resourcePath: "images/monsters/type2/skin/colors/body_col_5.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/colors/body_col_5.png", monsterType: 2, category: "color", zIndex: 1},

        // type 2 accessories
        // ** hqir
        {classID: "Type2SkinHair1", resourcePath: "images/monsters/type2/skin/hair/hair_1.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/hair/hair_1.png", monsterType: 2, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type2SkinHair2", resourcePath: "images/monsters/type2/skin/hair/hair_2.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/hair/hair_2.png", monsterType: 2, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type2SkinHair3", resourcePath: "images/monsters/type2/skin/hair/hair_3.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/hair/hair_3.png", monsterType: 2, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn2', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type2SkinHair4", resourcePath: "images/monsters/type2/skin/hair/hair_4.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/hair/hair_4.png", monsterType: 2, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type2SkinHair5", resourcePath: "images/monsters/type2/skin/hair/hair_5.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/hair/hair_5.png", monsterType: 2, category: "accessories", subCategory: "hair", conflictIDs: ['Type1SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn2', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        // type2 accessories
        // ** lashes
        {classID: "Type2SkinLashes1", resourcePath: "images/monsters/type2/skin/eyelashes/eye_1.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/eyelashes/eye_1.png", monsterType: 2, category: "accessories", subCategory: "eyelashes", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type2SkinLashes2", resourcePath: "images/monsters/type2/skin/eyelashes/eye_2.png", thumbnailPath: "images/monsters/type2/thumbnails/skin/eyelashes/eye_2.png", monsterType: 2, category: "accessories", subCategory: "eyelashes", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},

        //type 3
        {classID: "Type3Color1", resourcePath: "images/monsters/type3/skin/colors/body_col_1.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/colors/body_col_1.png", monsterType: 3, category: "color", linkedIDs: ['Type1Fur3'], zIndex: 1, default: true},
        {classID: "Type3Color2", resourcePath: "images/monsters/type3/skin/colors/body_col_2.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/colors/body_col_2.png", monsterType: 3, category: "color", linkedIDs: ['Type1Fur3'], zIndex: 1, default: false},
        {classID: "Type3Color3", resourcePath: "images/monsters/type3/skin/colors/body_col_3.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/colors/body_col_3.png", monsterType: 3, category: "color", linkedIDs: ['Type1Fur3'], zIndex: 1, default: false},
        {classID: "Type3Color4", resourcePath: "images/monsters/type3/skin/colors/body_col_4.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/colors/body_col_4.png", monsterType: 3, category: "color", linkedIDs: ['Type1Fur3'], zIndex: 1, default: false},
        {classID: "Type3Color5", resourcePath: "images/monsters/type3/skin/colors/body_col_5.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/colors/body_col_5.png", monsterType: 3, category: "color", linkedIDs: ['Type1Fur3'], zIndex: 1, default: false},

        // type 3 accessories
        // ** hqir
        {classID: "Type3SkinHair1", resourcePath: "images/monsters/type3/skin/hair/hair_1.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/hair/hair_1.png", monsterType: 3, category: "accessories", subCategory: "hair", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type3SkinHair2", resourcePath: "images/monsters/type3/skin/hair/hair_2.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/hair/hair_2.png", monsterType: 3, category: "accessories", subCategory: "hair", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type3SkinHair3", resourcePath: "images/monsters/type3/skin/hair/hair_3.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/hair/hair_3.png", monsterType: 3, category: "accessories", subCategory: "hair", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn2', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type3SkinHair4", resourcePath: "images/monsters/type3/skin/hair/hair_4.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/hair/hair_4.png", monsterType: 3, category: "accessories", subCategory: "hair", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type3SkinHair5", resourcePath: "images/monsters/type3/skin/hair/hair_5.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/hair/hair_5.png", monsterType: 3, category: "accessories", subCategory: "hair", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn2', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        // type 3 accessories
        // ** lashes
        {classID: "Type3SkinLashes1", resourcePath: "images/monsters/type3/skin/eyelashes/eye_1.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/eyelashes/eye_1.png", monsterType: 3, category: "accessories", subCategory: "eyelashes", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},
        {classID: "Type3SkinLashes2", resourcePath: "images/monsters/type3/skin/eyelashes/eye_2.png", thumbnailPath: "images/monsters/type3/thumbnails/skin/eyelashes/eye_2.png", monsterType: 3, category: "accessories", subCategory: "eyelashes", conflictIDs: ['Type3SkinHat1', 'Type1SkinHat2', 'Type1SkinHat3', 'Type1SkinHat4', 'Type1SkinHat5', 'Type1SkinHorn1', 'Type1SkinHorn4', 'Type1SkinHorn5'], zIndex: 3},

    ]);


});