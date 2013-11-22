
define(['backbone'], function(BackBone){

    // asset directories ----------------------------------------------------------  /

    var AssetDirectory = Backbone.Model.extend({

        defaults: {
            id: '',
            directoryPath: '', // relative from site root
            templateVar: '<%generic_dir%>', // if used in any text, will be replaced with directoryPath
        },

        initialize: function(){ }

    });

    var AssetDirectories = Backbone.Collection.extend({

        model: AssetDirectory,

        //

        getByID: function(id){
            var result = this.findWhere({id:id});
            return result;
        },

        // parse any template path vars, return new string with correct paths

        parseTemplatePaths: function(rawString, forcedDir){

            var formattedString = rawString;

            this.every(function(model){

                var replacedDir = (forcedDir != undefined) ? forcedDir : model.get('directoryPath');

                formattedString = formattedString.replace(new RegExp(model.get('templateVar') + "/", "g"), replacedDir); // in case of extra '/' such as <%img_dir%>/customize
                formattedString = formattedString.replace(new RegExp(model.get('templateVar'), "g"), replacedDir);
                return true;
            });

            return formattedString;
        },

    });

    // check for FB flag

    var inFrame = true;

    if ( window.self === window.top ) { inFrame = false }
    else { inFrame = true; }

    if(inFrame){


    }
    else {

        App.config.directories = new AssetDirectories([

            // libs

            {id:'js', templateVar:'<%js_dir%>', directoryPath:'http://cdn.dolimg.com/franchise/monsters-university/create-a-monster/resources/js/'},

            // media

            {id:'images', templateVar:'<%img_dir%>', directoryPath:'http://cdn.dolimg.com/franchise/monsters-university/create-a-monster/resources/images/'},
            {id:'css', templateVar:'<%css_dir%>', directoryPath:'resources/css/'},
            {id:'partials', templateVar:'<%partials_dir%>', directoryPath:'resources/data/partials/'},
            {id:'sounds', templateVar:'<%sound_dir%>', directoryPath:'http://cdn.dolimg.com/franchise/monsters-university/create-a-monster/resources/sound/'},

            // monster

            {id:'monsterParts', templateVar:'<%monsters_dir%>', directoryPath:'http://cdn.dolimg.com/franchise/monsters-university/create-a-monster/resources/data/monsters/'},

        ]);
    }

    // monster names --------------------------------------------------------------  /

    var MonsterName = Backbone.Model.extend({

        defaults: {
            firstName: '',
            lastName: ''
        },

        initialize: function(){}

    });

    var MonsterNames = Backbone.Collection.extend({
        model: MonsterName
    });

    App.config.names = new MonsterNames([

        {lastName:'Applegnash'},
        {lastName:'Ahhhsome'},
        {lastName:'Angerling'},
        {lastName:'Aquard'},
        {lastName:'Antchovie'},
        {lastName:'Aquabat'},
        {lastName:'Ailment'},
        {lastName:'Axebite'},
        {lastName:'Animalankles'},
        {lastName:'Bile'},
        {lastName:'Blinkington'},
        {lastName:'Badwater'},
        {lastName:'Boleslaw'},
        {lastName:'Beetlebrain'},
        {lastName:'Burstbubble'},
        {lastName:'Boulderball'},
        {lastName:'Bumpy'},
        {lastName:'Cage'},
        {lastName:'Chillingsberg'},
        {lastName:'Clawson'},
        {lastName:'Cretanus'},
        {lastName:'Clank'},
        {lastName:'Chum'},
        {lastName:'Dungworth'},
        {lastName:'D\'Vour'},
        {lastName:'Doorley'},
        {lastName:'Droolie'},
        {lastName:'Danger'},
        {lastName:'D\'Ungliton'},
        {lastName:'Eekswerth'},
        {lastName:'Eversnoot'},
        {lastName:'Eyegout'},
        {lastName:'Eggspleen'},
        {lastName:'Eyeseinson'},
        {lastName:'Evaporsnake'},
        {lastName:'Emergencyseed'},
        {lastName:'Eww'},
        {lastName:'Fungus'},
        {lastName:'Fangwilder'},
        {lastName:'Furryfoot'},
        {lastName:'Funky'},
        {lastName:'Fistprowler'},
        {lastName:'Fowl'},
        {lastName:'Gnawview'},
        {lastName:'Gross'},
        {lastName:'Growlahan'},
        {lastName:'Goretega'},
        {lastName:'Ghostcrusher'},
        {lastName:'Gooie'},
        {lastName:'Gumdump'},
        {lastName:'Horntooth'},
        {lastName:'Hairaiser'},
        {lastName:'Howl'},
        {lastName:'Harker'},
        {lastName:'Hurl'},
        {lastName:'Hunkyteeth'},
        {lastName:'Hammer'},
        {lastName:'Horrid'},
        {lastName:'Icesplitter'},
        {lastName:'Ickslime'},
        {lastName:'Irkmore'},
        {lastName:'Icescream'},
        {lastName:'Inkstains'},
        {lastName:'Idlebot'},
        {lastName:'Ignight'},
        {lastName:'Jelly'},
        {lastName:'Jinksman'},
        {lastName:'Jankelman'},
        {lastName:'Jawbone'},
        {lastName:'Jangerling'},
        {lastName:'Juice'},
        {lastName:'Jackle'},
        {lastName:'Juggles'},
        {lastName:'Knuckleheimer'},
        {lastName:'Knightwilder'},
        {lastName:'Knicknack'},
        {lastName:'Knuckles'},
        {lastName:'Klobber'},
        {lastName:'Krusty'},
        {lastName:'Kanepatches'},
        {lastName:'Littlebeast'},
        {lastName:'Lurkington'},
        {lastName:'Longslime'},
        {lastName:'Lemoncurd'},
        {lastName:'Lurchmon'},
        {lastName:'Leadlegs'},
        {lastName:'Longsloth'},
        {lastName:'Muddyham'},
        {lastName:'Mussfur'},
        {lastName:'McNaughton'},
        {lastName:'Maulsalot'},
        {lastName:'Mumkin'},
        {lastName:'McRoaring'},
        {lastName:'MacHairaiser'},
        {lastName:'Needleman'},
        {lastName:'Narrownose'},
        {lastName:'Napington'},
        {lastName:'Nomnom'},
        {lastName:'Noodle'},
        {lastName:'Nibbles'},
        {lastName:'Nectarneck'},
        {lastName:'O\'Growlahan'},
        {lastName:'Odorfoot'},
        {lastName:'Oozeman'},
        {lastName:'Oaffleson'},
        {lastName:'Oozerson'},
        {lastName:'O\'Rohr'},
        {lastName:'Pewstench'},
        {lastName:'Patchtail'},
        {lastName:'Prowlman'},
        {lastName:'Pemberslime'},
        {lastName:'Pepperstinch'},
        {lastName:'Pickle'},
        {lastName:'Peeyew'},
        {lastName:'Quainthaven'},
        {lastName:'Queasyhorn'},
        {lastName:'Quicknoggin'},
        {lastName:'Quankster'},
        {lastName:'Quacky'},
        {lastName:'Quirkmyster'},
        {lastName:'Quinch'},
        {lastName:'Quiver'},
        {lastName:'Querate'},
        {lastName:'Roaring'},
        {lastName:'Rompleston'},
        {lastName:'Rinkldipper'},
        {lastName:'Rozmon'},
        {lastName:'Rage'},
        {lastName:'Rumblerat'},
        {lastName:'Raptor'},
        {lastName:'Reeking'},
        {lastName:'Smellie'},
        {lastName:'Shufflebottom'},
        {lastName:'Shriekmore'},
        {lastName:'Slimehorne'},
        {lastName:'Scareburn'},
        {lastName:'Shrill'},
        {lastName:'Stillwater'},
        {lastName:'Scrumm'},
        {lastName:'Taileewagger'},
        {lastName:'Toxfeld'},
        {lastName:'Tremble'},
        {lastName:'Tattletail'},
        {lastName:'Tinymight'},
        {lastName:'Teethy'},
        {lastName:'Thump'},
        {lastName:'Ugliton'},
        {lastName:'Upadoopa'},
        {lastName:'Urbone'},
        {lastName:'Uglie'},
        {lastName:'Uno'},
        {lastName:'Unihorns'},
        {lastName:'Venomseed'},
        {lastName:'Verminfield'},
        {lastName:'Von Irk'},
        {lastName:'Van der Slime'},
        {lastName:'Visciousness'},
        {lastName:'Vulture'},
        {lastName:'Violentence'},
        {lastName:'Vaporraid'},
        {lastName:'Waxford'},
        {lastName:'Wormwood'},
        {lastName:'Wooly'},
        {lastName:'Wabble'},
        {lastName:'Womperworm'},
        {lastName:'Whipcscratch'},
        {lastName:'Wiggles'},
        {lastName:'Xingaroo'},
        {lastName:'Xachoo'},
        {lastName:'Xagtop'},
        {lastName:'X\'ed'},
        {lastName:'Xtastic'},
        {lastName:'Xericrumbs'},
        {lastName:'Yucatalico'},
        {lastName:'Yiptail'},
        {lastName:'Yornado'},
        {lastName:'Yapper'},
        {lastName:'Yellowtooth'},
        {lastName:'Yumyum'},
        {lastName:'Zitshriek'},
        {lastName:'Zanadope'},
        {lastName:'Zebrain'},
        {lastName:'Zing'},
        {lastName:'Zapper'},
        {lastName:'Zoink'},
        {lastName:'Z\'Bo'},

    ]);

// monster ID coordinates -------------------------------------------------------  /

    var MonsterCoords = Backbone.Model.extend({

        defaults: {
            monsterType: 1,
            cardType: "",
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0,
        },

        initialize: function(){}

    });

    var MonstersCoords = Backbone.Collection.extend({

        model: MonsterCoords,

        getByMonsterTypeAndCard: function(monsterType, cardType){
            var result = this.findWhere({monsterType:monsterType, cardType:cardType});
            return result;
        },

    });

    App.config.cardCoords = new MonstersCoords([

        {monsterType:1, cardType:"id", scaleX:0.56, scaleY:0.56, x:162, y:-82},
        {monsterType:1, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-237},
        {monsterType:1, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:2, cardType:"id", scaleX:0.5, scaleY:0.5, x:175, y:-80},
        {monsterType:2, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-237},
        {monsterType:2, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:3, cardType:"id", scaleX:0.45, scaleY:0.45, x:186, y:-50},
        {monsterType:3, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-237},
        {monsterType:3, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:4, cardType:"id", scaleX:0.7, scaleY:0.7, x:127, y:-205},
        {monsterType:4, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-357},
        {monsterType:4, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:5, cardType:"id", scaleX:0.56, scaleY:0.56, x:160, y:-53},
        {monsterType:5, cardType:"portrait", scaleX:0.9, scaleY:0.9, x:-60, y:-195},
        {monsterType:5, cardType:"fullBody", scaleX:0.54, scaleY:0.54, x:26, y:-85},

        {monsterType:6, cardType:"id", scaleX:0.56, scaleY:0.56, x:161, y:-78},
        {monsterType:6, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-257},
        {monsterType:6, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:7, cardType:"id", scaleX:0.56, scaleY:0.56, x:161, y:-102},
        {monsterType:7, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-287},
        {monsterType:7, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:8, cardType:"id", scaleX:0.56, scaleY:0.56, x:160, y:-85},
        {monsterType:8, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-247},
        {monsterType:8, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:9, cardType:"id", scaleX:0.56, scaleY:0.56, x:160, y:-132},
        {monsterType:9, cardType:"portrait", scaleX:1.0, scaleY:1.0, x:-83, y:-307},
        {monsterType:9, cardType:"fullBody", scaleX:0.6, scaleY:0.6, x:11, y:-122},

        {monsterType:10, cardType:"id", scaleX:0.65, scaleY:0.65, x:137, y:-70},
        {monsterType:10, cardType:"portrait", scaleX:0.8, scaleY:0.8, x:-40, y:-130},
        {monsterType:10, cardType:"fullBody", scaleX:0.5, scaleY:0.5, x:35, y:-60},

    ]);

// black list -------------------------------------------------------------------  /

    var BlackList = Backbone.Model.extend({

        defaults: {
            any: "69, anal, analsex, arse, ass, a55, aunt flo, bastard, beastial, beat off, beat your meat, beatingoff, beatoff, beat-off, beatyourmeat, beaver, bestial, bfe, biatch, bigdick, bisexual, bi-sexual, bitch, blackie, blackies, bl0wjob, bloj0b, blow job, blowj0b, blowjob, blowme, boff, boink, boinking, boinks, bondage, boner, boners, boob, boobies, boobs, booty, boyonboy, boysonboys, breast, brothel, bumblefuck, bumfuck, bunghole, bushpig, butch, butt, butthole, c0ck, camel toe, cameltoe, carpet muncher, carpetmuncher, castrate, castrates, castration, chick2chick, chickonchick, chicks2chicks, chicksonchicks, chink, chinks, choad, chode, clit, cock, comestain, condom, condoms, copulate, copulating, copulation, cornhole, crap, crotch, cunnilingus, cunt, d.d., d-up, darkie, darkies, darky, defecate, defecating, defecation, dickhead, dickring, dicks, dicksucker, dicksuckers, dicksucking, dicksucks, dickweed, dildo, dogshit, domination, dominatrix,  dork, douche, ejaculate, ejaculation, enema, enima, enimas, erection, erotic, eroticism, fag, fck, felch, fellatio, feltch, fisting, flog, flogging, flogs, foreskin, fornicate, fornicating, fornication, forked, frigging, frottage, fubar, fuck, fukc, fudgepack, fuq, gangbang, gay, genital, gerbiling, girlongirl, girlsongirls, goddammit, goddamn, gook, gubb, guppy, guyonguy, guysonguys, gyfs, hairpie, hairpies, hardon, hardons, hoe, hoebag, homo, honkey, honkie, honkies, hoochie, hooker, hookers, hornie, horny, horseshit, hosebeast, hump, jackoff, jap, jerkoff, jew, jewboy, jism, jizm, jizz, kikes, kinky, kkk, knockers, koolie, lesbian, lesbo, lesbos, limpdick, lovehole, mammaries, manonman, masochism, masochist, masterbate, masterbates, masterbating, masterbation, menonmen, milf, motherfuck, muff, naked, nazi, necrophile, necrophilia, nigga, niggas, nigger, niggers, nip, nookie, noshit, nude, nudes, nudity, nymph, oral, orgasm, orgi, orgiastic, orgies, orgy, panties, panty, pecker, pedophile, pedophilia, pen15, penii, penis, penises, phile, philes, philia, phuck, phuk, phuq, piss, poke, poon, poopchute, porking, porks, porn, poot, prostitot, pube, pubes, pubic, punanni, punanny, puntang, pussi, pussies, pussy, queer, queers, racial, racism, racist, racists, rape, raping, rapist, redtide, ricockulous, rimjob, rimjobs, rubbers, rumpranger, rumprider, rumps, sadism, sadist, sadomasochism, sapphic, sappho, sapphos, satan, scatological, schlong, schtup, screw, scrog, semen, sex, shit, shiznits, sixtynine, sixtynining, sketell, skrew, skrewing, skrews, slanteyes, slattern, slave, slopehead, slut, smut, snatch, soddom, sodom, sonnofabitch, sonnovabitch, sonnuvabitch, sonofabitch, spank, sperm, spermicidal, spermjuice, sphincter, spic, spick, spik, spooge, stiffie, stiffy, swinger, tar baby, teenonteen, teensonteens, testes, testical, testicle, transexual, transvestite, twat, umfriend, urinate, urinating, urination, vagina, vibrator, virgin, voyeur, wank, wetback, whip, whore, whoring, womanonwoman, womenonwomen, zipperhead, zipperheads",
            wholeWords: 'bull, kike, coon, cum, dike, dook, dyke, ho, nards, pud, quim, scheiss, sko, whiz, yak, tit, tits',
            exceptions: '',
        },

        initialize: function(){},

        validate: function(term){

            var self = this;
            var anyTerms = self.get('any').split(',');
            var wholeTerms = self.get('wholeWords').split(',');
            var exceptionTerms = self.get('exceptions').split(',');

            var naughty = false;

            for(var i=0; i<anyTerms.length; i++){
                if(term.toLowerCase().indexOf(anyTerms[i].toLowerCase().trim()) >= 0){
                    naughty = true;
                    break;
                }
            }

            for(var i=0; i<wholeTerms.length; i++){
                if(term.toLowerCase() == wholeTerms[i].toLowerCase().trim()){
                    naughty = true;
                    break;
                }
            }

            for(var i=0; i<exceptionTerms.length; i++){
                if(term.toLowerCase() == exceptionTerms[i].toLowerCase().trim()){
                    naughty = false;
                    break;
                }
            }

            return !naughty;
        },

    });

    App.config.blacklist = new BlackList();


});