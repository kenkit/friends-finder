//---------------------------------------------------------------------------
// File: model.js
//
// This file contains the Meyers Briggs Type Indicator model that backs
// the application.
//
// The big picture with typology is that people fall into broad categories
// that characterize how they relate to the world and others.  MBTI is but
// one system for classifying people based upon an assessment survey.
//
// As implemented, this model is more a fun sketch and not a rigorous
// assessment.  I draw heavily from various web resources that relate MBTI
// to the cast of the popular TV series, Friends.
//
// TODO: Much of this could probably be screen-scraped with Cheerio.
//---------------------------------------------------------------------------

var mbtiModel = {
	imgDir: "./app/public/assets/img",
	assessment: mbtiOnlineAssessments,
	attribution: mbtiAttribution,
	videos: mbtiVideos,
	bestMatches: mbtiBestMatches,
	descriptors: mbtiDescriptors,
	profiles: mbtiProfiles,
	tvFriends: mbtiTvFriends,
	unitTests: unitTests
};

// The application embeds a weak attempt at assessing MBTI.  More definitive
// assessments exist.  Offer up some alternative assessment vehicles.

var mbtiOnlineAssessments = [
	{ name: "John Hawksley", 
	  desc: "25 questions", 
	  link: "http://jupiter-34.appspot.com/" },
	{ name: "Tim Flynn", 
	  desc: "Similar Minds", 
	  link: "http://similarminds.com/cgi-bin/jung2.pl" },
	{ name: "Quroa", 
	  desc: "Take your pick", 
	  link: "https://www.quora.com/What-is-the-most-accurate-free-online-Myers-Briggs-test" }
];

// Give credit for various web sources I've aggregated to create this
// MBTI-based compatibility model.

var mbtiAttribution = {
	michael_pierce: {
		fullName: "Michael Pierce",
		link: "https://www.youtube.com/watch?v=5uKaFveOhXY",
		pic: undefined
	},
	heidi_priebe: {
		fullName: "Heide Priebe",
		link: "http://tcat.tc/1PgB8Af",
		pic: "heidi_priebe.png"
	},
	brenda_ellis: {
		fullName: "Brenda Ellis",
		link: "http://personalitypage.com/html/partners.html",
		pic: undefined
	},
	jack_falt: {
		fullName: "Jack Falt",
		link: "http://users.trytel.com/jfalt/Tables/mbti-des.html",
		pic: undefined
	},
	getFullName: function(key) { return this[key].fullName },
	getLink: function(key) { return this[key].link },
	getPic: function(key) { return (this[key].pic) ? 
				mbtiModel.imgDir + "/" + this[key].pic : undefined }
};

// Offer video resources for learning more about MBTI to the curious.

var mbtiVideos = {
	attribution: mbtiAttribution.michael_pierce,
	overview: "https://www.youtube.com/watch?v=5uKaFveOhXY",
	types: {
		enfj: "https://youtu.be/XcrQBKncaJc?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		enfp: "https://youtu.be/1wQXkIjdAJk?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		entj: "https://youtu.be/89uYbBOm6fg?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		entp: "https://youtu.be/s_-4ybKPxjE?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		esfj: "https://youtu.be/k8UBvtcBFvM?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		esfp: "https://youtu.be/2wz4Cmnk5pA?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		estj: "https://youtu.be/Y1suo_F7ceg?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		estp: "https://youtu.be/ODfp4nzp3_g?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		infj: "https://youtu.be/d4dLLS-DQfA?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		infp: "https://youtu.be/5BpPVeP6FUI?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		intj: "https://youtu.be/YRxw2YJ9K7I?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		intp: "https://youtu.be/kyqpj75VB18?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		isfj: "https://youtu.be/9dqqGGUEN60?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		isfp: "https://youtu.be/OUiLIrK7RmQ?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		istj: "https://youtu.be/U_SB6AbFyb4?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
		istp: "https://youtu.be/55LmENGRd58?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA",
	},
	getAttribution: function() { return this.attribution },
	getOverviewVideo: function() { return this.overview },
	getVideo: function(mbtiType) { return this.types[mbtiType] }
};

// Given an MBTI type, return the complementary type with
// highest degree of compatibility (according to personalitypage.com).

var mbtiBestMatches = {
	attribution: mbtiAttribution.brenda_ellis,
	overview: "http://personalitypage.com/html/partners.html",
	types: {
		enfj: {
			matches: ["infp", "isfp"],
			ref: undefined
		},
		enfp: {
			matches: ["intj", "infj"],
			ref: undefined
		},
		entj: {
			matches: ["intp", "istp"],
			ref: undefined
		},
		entp: {
			matches: ["infj", "intp"],
			ref: undefined
		},
		esfj: {
			matches: ["isfp", "infp"],
			ref: undefined
		}	,
		esfp: {
			matches: ["istj", "isfj"],
			ref: undefined
		},
		estj: {
			matches: ["istp", "intp"],
			ref: undefined
		},
		estp: {
			matches: ["isfj", "istj"],
			ref: undefined
		},
		infj: {
			matches: ["entp", "enfp"],
			ref: undefined
		},
		infp: {
			matches: ["enfj", "esfj"],
			ref: undefined
		},
		intj: {
			matches: ["enfp", "entp"],
			ref: undefined
		},
		intp: {
			matches: ["entj", "estj"],
			ref: undefined
		},
		isfj: {
			matches: ["estp", "esfp"],
			ref: undefined
		},
		isfp: {
			matches: ["esfj", "enfj"],
			ref: undefined
		},
		istj: {
			matches: ["esfp", "estp"],
			ref: undefined
		},
		istp: {
			matches: ["estj", "entj"],
			ref: undefined
		}
	},
	getAttribution: function() { return this.attribution },
	getOverviewLink: function() { return this.overview },
	getBestMatches: function(mbtiType) { return this.types[mbtiType].matches }
};

// Give the user a shorthand for understanding the 16 MBTI
// personality categories.

var mbtiDescriptors = {
	attribution: mbtiAttribution.jack_falt,
	types: {
		enfj: {
			kierseyTitle: "The Teacher"
		},
		enfp: {
			kierseyTitle: "The Champion"
		},
		entj: {
			kierseyTitle: "The Fieldmarshall"
		},
		entp: {
			kierseyTitle: "The Inventor"
		},
		esfj: {
			kierseyTitle : "The Provider"
		},
		esfp: {
			kierseyTitle: "The Performer"
		},
		estj: {
			kierseyTitle : "The Supervisor"
		},
		estp: {
			kierseyTitle: "The Promoter"
		},
		infj: {
			kierseyTitle: "The Counselor"
		},
		infp: {
			kierseyTitle: "The Healer"
		},
		intj: {
			kierseyTitle: "The Mastermind"
		},
		intp: {
			kierseyTitle: "The Architect"
		},
		isfj: {
			kierseyTitle : "The Conservator"
		},
		isfp: {
			kierseyTitle : "The Composer"
		},
		istj: {
			kierseyTitle : "The Inspector"
		},
		istp: {
			kierseyTitle : "The Crafter"
		}
	},
	getAttribution: function() { return this.attribution },
	getDescriptor: function(mbtiType) { return this.types[mbtiType].kierseyTitle }
};

// Relate MBTI types to cleverly popularized personality
// profiles from Heidi Priebe.

var mbtiProfiles = {
	attribution: mbtiAttribution.heidi_priebe,
	types: {
		enfj: {
			instances : ["kathy"],
			singleBecause: "You smothered the crap out of your last partner,"
						+ " who genuinely did not have anything left to 'Open"
						+ " up' about.",
			readyWhen: "You go on the Bachelor/Bachelorette and win.",
			kindOfGirlfriend: "You’re the nurturing girlfriend. Nothing makes"
						+ " you happier than aiding in your loved ones’"
						+ " development and growth – and this is particularly"
						+ " true when it comes to your romantic relationships."
						+ " You will go to absolutely any lengths to ensure"
						+ " that your partner is thriving within the"
						+ " relationship. Their happiness truly is your"
						+ " happiness as well and romantic relationships bring"
						+ " out the natural counselor in you.",
			showLikeBy: "Somehow gets you to open up about your deepest"
						+ " childhood trauma over coffee.",
			mostAttractiveQuality: {
				quality: "attentiveness",
				description: "You have this very specific ability to look"
						+ " someone in the eye and make them feel as though"
						+ " you’re staring straight into their soul. The"
						+ " presence and introspection that you bring to the"
						+ " table is a rare gem and it’s unnervingly"
						+ " attractive."
			},
			inBed: "You get off on making other people happy so when you’re"
						+ " in a committed relationship, your sex drive is"
						+ " through the roof. You err on the conventional side"
						+ " sexually but that’s not necessarily a bad thing –"
						+ " you’re a giver in life and a giver in the bedroom."
						+ " Y’all hate to ever disappoint.",
			yourHell: "Your loved ones are in dire need of guidance but every"
						+ " piece of advice you gives them inadvertently makes"
						+ " things worse for them.",
			atAParty: "Frantically scans the room for anyone who looks lonely,"
						+ " then introduces him or her to every single person"
						+ " at the party."
		},
		enfp: {
			instances : ["phoebe"],
			singleBecause: "You have the attention span of a goldfish"
						+ " and cannot decide what you want.",
			readyWhen: "You find someone just unattainable enough to intrigue"
						+ " you for a significant period of time.",
			kindOfGirlfriend: "You’re the partner-in-crime girlfriend."
						+ " Whichever wild antic, adventurous trip or crazy"
						+ " idea your partner comes up with, you are not only"
						+ " on board for but are probably even more excited"
						+ " about than they are. You love the way you do"
						+ " everything else – passionately and without"
						+ " restraint. Your partner never has to question"
						+ " whether you love them, are invested in them or are"
						+ " down for the next big adventure. You are, and"
						+ " you’re probably more excited about all of it than"
						+ " they are.",
			showLikeBy: "Teases you mercilessly and uncharacteristically does"
						+ " not flake on any of your plans.",
			mostAttractiveQuality: {
				quality: "enthusiasm",
				description: "You care more about your latest idea than most"
						+ " people care about everything else in their lives"
						+ " combined. And the energy’s contagious. People"
						+ " admire the positive vibes you bring to the table"
						+ " and they want to share in whatever it is that"
						+ " you’re so pumped on – hell, they want to be the"
						+ " next thing you’re excited about."
			},
			inBed: "You don’t enjoy sex if you don’t have an emotional"
						+ " connection with your partner. That being said, you"
						+ " connect emotionally with just about everyone you"
						+ " meet so this isn’t really a problem for you."
						+ " You’re a warm and enthusiastic lover who enjoys"
						+ " exploring all facets of their sexuality. You don’t"
						+ " NEED sex in the physical sense of the word but as"
						+ " soon as you meet someone you’re excited about, it"
						+ " is ON. In whatever weird new way you can think of.",
			yourHell: "Every minute of the rest of your life has been"
						+ " scheduled for you – and it’s a long series of"
						+ " arbitrary, solitary tasks.",
			atAParty: "Makes BEST FRIENDS FOREVER with everyone they talk to"
						+ " for five minutes."
		},
		entj: {
			instances : ["pete"],
			singleBecause: "You have impossibly high standards and you’d"
						+ " probably just marry yourself if it were legal.",
			readyWhen: "You decide that it is practical to do so, at which"
						+ " point you will assess potential suitors for mate"
						+ " value and propose to the most logical subject.",
			kindOfGirlfriend: "You’re the powerhouse girlfriend. You’ve got"
						+ " your sh*t together and everyone who’s ever met you"
						+ " knows it. You aren’t investing in any flight"
						+ " risks, so potential partners have to either show"
						+ " the hell up to each date or get out. You plan to"
						+ " be half of a power couple if you’re going to enter"
						+ " into a relationship at all, and you’re willing to"
						+ " accept nothing less. You keep your standards high"
						+ " for partners because you keep your standards high"
						+ " for yourself.",
			showLikeBy: "Takes you out to dinner and grills you about your"
						+ " long-term goals.",
			mostAttractiveQuality: {
				quality: "aggression",
				description: "You don’t mess around when you see something you"
						+ " want. You are assertive, direct and smart about"
						+ " getting what you want and it’s a purely"
						+ " irresistible quality. Your dominant nature is hot."
						+ " And you make sure that whomever you’re going for"
						+ " knows it."
			},
			inBed: "Is someone looking for a dominant, Christian Grey-style"
						+ " lover? Everyone knows that you’re the one to call."
						+ " You’re imaginative and explorative in the bedroom,"
						+ " remaining highly receptive to your partner’s"
						+ " desires. Nothing pleases you more than knowing"
						+ " that your partner went on a unique, relatively"
						+ " kinky sexual journey – and that it was you who led"
						+ " them there fearlessly.",
			yourHell: "Somebody is wrong, and they’re directing a large group"
						+ " of people! You can’t do anything about it and will"
						+ " have to obey whatever inefficient policies they"
						+ " decide to implement.",
			atAParty: "Networks the shit out of the party and wakes up with"
						+ " fourteen competitive job offers."
		},
		entp: {
			instances : ["chandler"],
			singleBecause: "You’re not. You’re probably already in a couple"
						+ " of relationships that you’ve just forgotten"
						+ " about.",
			readyWhen: "Your INFJ partner tracks you down and demands to"
						+ " know where you’ve been for the past six years.",
			kindOfGirlfriend: "You’re the badass girlfriend. You have a"
						+ " quick wit and a devil-may-care attitude – one"
						+ " that is ceaselessly attractive to those around"
						+ " you. Any potential partner of yours knows that"
						+ " they have to be willing to break the rules if they"
						+ " want to be with you – you move at lightening speed"
						+ " and you don’t wait around for anyone to catch up.",
			showLikeBy: "Finds out exactly what makes you tick and then uses"
						+ " it to convince you that YOU like THEM.",
			mostAttractiveQuality: {
				quality: "wit",
				description: "It’s not just the quick, clever jokes (though"
						+ " it’s also those) – everything about the way your"
						+ " mind works is both refreshing and compelling. You"
						+ " establish dominance almost accidentally through"
						+ " your intellectually rebellious nature and it’s"
						+ " insanely attractive."
			},
			inBed: "Like most N-dominant types, you can be described as"
						+ " borderline sapiosexual. You don’t just want to"
						+ " f*ck someone’s body – you want to delve in deep"
						+ " and f*ck their mind. You’re turned on by the"
						+ " strange, the intelligent, the lustful and the"
						+ " downright kinky. The stranger and more perverted"
						+ " the fantasy, the better. You’re the reason why"
						+ " kink websites exist.",
			yourHell: "Freedom of speech is revoked from the constitution."
						+ " Voicing your opinion in any way is now illegal.",
			atAParty: "Spurs a massive argument then leaves."
		},
		esfj: {
			instances : ["janice"],
			singleBecause: "You have a savior complex and keep going for"
						+ " wounded people who can’t properly love you back.",
			readyWhen: "You’re finally attracted to someone who has his or her"
						+ " shit together and doesn’t need to be bullied into"
						+ " a relationship.",
			kindOfGirlfriend: "You’re the old-fashioned girlfriend. It’s not"
						+ " that your style or your attitude is stuck in the"
						+ " past, it’s just that you believe in actual dating"
						+ " – you know, the way past generations did it."
						+ " You’re looking for a genuine gentleman who isn’t"
						+ " afraid to pull out all of the stops to impress"
						+ " you. You give your absolute all to relationships,"
						+ " and you’re looking for someone who does the same."
						+ " Chivalry and romance aren’t dead as long as you’re"
						+ " around!",
			showLikeBy: "Asks you ten thousand questions about yourself and"
						+ " remembers Every. Single. Answer.",
			mostAttractiveQuality: {
				quality: "togetherness",
				description: "You somehow manage to always be miles ahead of"
						+ " the rest of us when it comes to general adulting."
						+ " You’ve got your ducks in a row and you’re looking"
						+ " for a partner who can measure up. People are"
						+ " attracted to you when they’re looking for a"
						+ " partner who’s got their shit together and pulls it"
						+ " off with style."
			},
			inBed: "You’re a warm, affectionate lover who wants to make your"
						+ " partner happy above all else. You see sex as a"
						+ " concrete opportunity to show your partner how you"
						+ " feel about them and want to make sure that"
						+ " everyone’s enjoying him or herself throughout. Sex"
						+ " can occasionally feel like a chore, but you don’t"
						+ " mind getting it on if you’re not in the mood so"
						+ " long as it makes your partner happy. You’re"
						+ " sexually traditional but you make up for it in"
						+ " enthusiasm.",
			yourHell: "Someone you love is in dire need of practical help and"
						+ " you can’t give it to them. Worse yet, they think"
						+ " you’re refusing to help them out of pettiness and"
						+ " they’re mad at you.",
			atAParty: "Tells everyone else’s secrets."
		},
		esfp: {
			instances : ["rachel", "joey"],
			singleBecause: "You’ve hooked up with everyone you’re mildly"
						+ " interested in and now you’re bored.",
			readyWhen: "You want to, pretty much. Who can resist you?",
			kindOfGirlfriend: "You are the bombshell girlfriend. You’re"
						+ " charming, adventurous, outgoing and"
						+ " effortlessly in tune with your partner’s wants"
						+ " and needs. You’re the girl at the party who"
						+ " everyone wants to get to know, and the partner"
						+ " everyone is proud to be dating. You can charm"
						+ " the pants off just about anybody but you’re"
						+ " selective about who you actually invest in. Once"
						+ " you do commit to a relationship, you’re both as"
						+ " caring and as fun-loving as they come – and your"
						+ " partner can never get enough of you!",
			showLikeBy: "Puts X’s at the end of all text messages and finds"
						+ " fifteen excuses a day to hug you.",
			mostAttractiveQuality: {
				quality: "confidence",
				description: "You’re sexy and you know it. It’s not just that"
						+ " you have rock-hard abs (though you usually do),"
						+ " the ease with which you attract your gender of"
						+ " choice is apparent in everything you do. You are"
						+ " effortlessly personable and the confidence you"
						+ " have in your own people skills is irresistible."
			},
			inBed: "You win at sex. First of all you have extroverted sensing"
						+ " paired with introverted feeling, which basically"
						+ " means that you ooze sexuality. You place a high"
						+ " emphasis on the satisfaction of your partner,"
						+ " you’re incredibly open-minded and your sheer set"
						+ " of physical/sexual skills is unmatchable. Simply"
						+ " put, you’re amazing in bed. Gold star. You’re the"
						+ " holy grail of sexual partners and don’t you ever"
						+ " forget it.",
			yourHell: "You are stuck in a room by yourself for the rest of"
						+ " eternity.",
			atAParty: "Table dances."
		},
		estj: {
			instances : ["monica"],
			singleBecause: "Those helpful life pointers you gave your last"
						+ " date were actually pretty insulting.",
			readyWhen: "You meet an Anastasia Steele type who just wants to"
						+ " be bossed around.",
			kindOfGirlfriend: "You’re the has-their-shit-together girlfriend."
						+ " You’re a strong-as-hell partner who needs a"
						+ " strong-as-hell companion to keep up. The men (or"
						+ " ladies) in your life know that you’re not messing"
						+ " around when it comes to dating – they have to"
						+ " shape up and show up if they want to impress you."
						+ " Of course if they do, you’ll be as loyal as they"
						+ " come – you’re in it for the long haul and you need"
						+ " someone who isn’t afraid to say the same!",
			showLikeBy: "Orders you to go on a date with them.",
			mostAttractiveQuality: {
				quality: "decisiveness",
				description: "It’s difficult not to respect your frank,"
						+ " assertive nature. You go for your goals with no"
						+ " holds barred and you don’t care who or what"
						+ " tries to stand in your way. Your confidence in"
						+ " what you want makes others want to be the thing"
						+ " that you want."
			},
			inBed: "You approach sex the way you approach everything else"
						+ " – loudly, proudly and as a prime opportunity to"
						+ " flex your muscles. You take a great deal of"
						+ " enjoyment in sex but don’t focus much on"
						+ " connection. Can you last forever? Yes. But do"
						+ " your partners kind of feel like you’re just"
						+ " masturbating using their body? Also yes.",
			yourHell: "An incredibly impractical person is put in charge of"
						+ " all of your major life decisions. You have to do"
						+ " whatever they say and are powerless to argue or"
						+ " reason with them.",
			atAParty: "Makes boisterous, usually offensive jokes to anyone"
						+ " who’s willing to listen."
		},
		estp: {
			instances: ["mike"],
			singleBecause: "You’re having way too much fun sleeping around.",
			readyWhen: "You start feeling bad about how long your ISFJ hookup"
						+ " has been doing your laundry for you, at which"
						+ " point you’ll finally ask them out.",
			kindOfGirlfriend: "You’re the wild child girlfriend. Always the"
						+ " life of the party and the center of attention, you"
						+ " are not afraid to stir things up. Your SO knows"
						+ " that dating you means they’ll never be bored for a"
						+ " moment – you’ll have active social lives, active"
						+ " sex lives and active physical lives – every day"
						+ " with you will be a new adventure and they love you"
						+ " like crazy for it.",
			showLikeBy: "Shows off in front of you at every available"
						+ " opportunity.",
			mostAttractiveQuality: {
				quality: "nonchalance",
				description: "You are personable, capable and confident – all"
						+ " seemingly without trying. We don’t know how you"
						+ " pull it off, ESTP, but your cool as a cucumber"
						+ " attitude is alluring and absorbing. Something"
						+ " about you just dares us to put ourselves on your"
						+ " radar."
			},
			inBed: "You’re direct about what you want, which is great. You’re"
						+ " also athletic, interactive, engaged – all"
						+ " objectively good things when it comes to sex."
						+ " Just remember that unlike sports, sex has an"
						+ " emotional component to it. If you’re not checking"
						+ " in with your partner to make sure they’re"
						+ " comfortable and enjoying him or herself, you’re"
						+ " not going to score more than once.",
			yourHell: "You are completely paralyzed, lacking even the ability"
						+ " to speak.",
			atAParty: "Gets into a bar fight."
		},
		infj: {
			instances : ["carol"],
			singleBecause: "You have trust issues.",
			readyWhen: "Someone you’ve known for an unimaginable amount of"
						+ " time finally wears you down and convinces you"
						+ " that you can take a chance on them.",
			kindOfGirlfriend: "You’re the ride-or-die girlfriend. You don’t"
						+ " do casual relationships and when you choose to"
						+ " invest in someone, it’s because you see a future"
						+ " with them. Once you’ve made that commitment,"
						+ " you’ll stand by your partner come hell or high"
						+ " water. You make a point to understand your partner"
						+ " deeply and support them fully in everything they"
						+ " do. You see relationships as an exercise in"
						+ " teamwork and you’re ready to throw your all into"
						+ " making your team absolutely thrive.",
			showLikeBy: "Gives you a look that implies they are staring"
						+ " directly into your soul without collecting $200"
						+ " or passing 'Go.'",
			mostAttractiveQuality: {
				quality: "intensity",
				description: "There is nothing meek or helpless about you. You"
						+ " are a highly intelligent, highly perceptive"
						+ " individual who understands others on a deep level."
						+ " This gives you the unique ability to connect"
						+ " quickly with new people. It’s an intense"
						+ " experience for those on the receiving end of it"
						+ " and it makes everything about you seem sexy as"
						+ " hell."
			},
			inBed: "You take a while to get physical. Before you get it on"
						+ " with someone you want to trust them, understand"
						+ " them, and connect with them on a core level. You"
						+ " aim to please in the bedroom, making sure your"
						+ " partner is eternally comfortable and happy around"
						+ " you. The best sex is intimate, passionate sex"
						+ " between two people who connect on a mental –"
						+ " borderline spiritual – level. Give you that and"
						+ " you’re a firecracker in the bedroom.",
			yourHell: "You are eternally damned to working for a morally"
						+ " corrupt company that aims to exploit the weak"
						+ " and generally degrade conditions for all of"
						+ " society.",
			atAParty: "Reluctantly holds a counseling session in the bathroom"
						+ " with some drunk girl they don’t know."
		},
		infp: {
			instances : ["paul"],
			singleBecause: "You idealize the crap out of potential partners"
						+ " and then get upset when their reality doesn’t"
						+ " measure up.",
			readyWhen: "You meet someone who also wants the rest of his or her"
						+ " life to resemble a Nicholas Sparks novel.",
			kindOfGirlfriend: "You’re the passionate girlfriend. Nobody loves"
						+ " their partner as deeply, intensely and fully as an"
						+ " INFP. You want to know everything about the person"
						+ " you’re with – all of their fears, their desires"
						+ " and their deepest wounds. You strive to understand"
						+ " your partner as intimately as possible and to"
						+ " express that love through your words, your actions"
						+ " and your art. Nobody can turn the object of their"
						+ " affection into poetry, music or art quite the way"
						+ " an INFP can.",
			showLikeBy: "Writes about you on their secret blog while"
						+ " fantasizing that you’ve been following it all"
						+ " along and will write them back.",
			mostAttractiveQuality: {
				quality: "depth",
				description: "There is infinitely more to you than meets the"
						+ " eye and your slightly mysterious vibe is"
						+ " compelling. People who meet you for the first time"
						+ " want to know more about what’s going on inside your"
						+ " mind – and it keeps them coming back for more."
			},
			inBed: "You guys put the love in lovemaking. Potential partners"
						+ " need to know that for you, sex is never strictly"
						+ " a physical affair. Getting it on is a matter of"
						+ " connecting emotionally with whomever you’re"
						+ " sleeping with, which is why the INFP/ENFJ duo is"
						+ " dynamite. The only thing you guys love more than"
						+ " romantic intimacy is reflecting on said intimacy"
						+ " once it’s over. You want a partner whose lovin’"
						+ " makes you feel something.",
			yourHell: "Your deepest thoughts and feelings are exposed to a"
						+ " large audience and everyone thinks that you’re"
						+ " pathetic and unoriginal.",
			atAParty: "Tells everyone at the party how much they love them"
						+ " and then drunk dials their ex and cries."
		},
		intj: {
			instances : ["charlie"],
			singleBecause: "You over-analyze social interactions to the point"
						+ " where it seems easier to just avoid them altogether.",
			readyWhen: "A hell-bent ENFP follows you around for a long enough"
						+ " period of time that you eventually just accept"
						+ " that you’re dating.",
			kindOfGirlfriend: "You’re the girlfriend who challenges her"
						+ " partners. It’s not that you can’t be sweet,"
						+ " loving and supportive – it’s just that to you,"
						+ " being supportive means pushing both yourself and"
						+ " your partner to become the absolute best versions"
						+ " of yourselves. You are constantly presenting your"
						+ " loved ones with new ideas and pushing them to"
						+ " think about things in different ways. To you,"
						+ " love means mutual growth and development – and"
						+ " the right partner absolutely loves you for that.",
			showLikeBy: "Lets you touch them without cringing. And/or replies"
						+ " 'Yes' when asked directly whether or not they like"
						+ " you.",
			mostAttractiveQuality: {
				quality: "intelligence",
				description: "It’s no secret that you usually have the highest"
						+ " IQ in the room. Everything that comes out of your"
						+ " mouth is an educated, thoroughly analyzed opinion"
						+ " and it’s difficult to champion your knowledge on"
						+ " almost any topic. You know your stuff inside out"
						+ " and backwards – and it’s hot."
			},
			inBed: "You see sex as a challenge (Okay you see everything as a"
						+ " challenge). You want to be constantly improving"
						+ " sexually and consistently finding new ways to make"
						+ " the experience more intense for both yourself and"
						+ " your partner (Edging must have been invented"
						+ " specifically for and by the INTJs). The flip side"
						+ " of this highly mental game is that you can"
						+ " occasionally let loose during sex – you enjoy the"
						+ " rare opportunity to temporarily detach from your"
						+ " over-active mind and let your physical impulses"
						+ " take over. It’s not often your brain gets a break"
						+ " – sex can occasionally provide that outlet.",
			yourHell: "Every time you open your mouth to say something"
						+ " intelligent, something entirely idiotic comes out"
						+ " instead.",
			atAParty: "Takes scheduled hydration breaks in an attempt to"
						+ " reduce the impact of their inevitable"
						+ " morning-after hangover."
		},
		intp: {
			instances : ["david"],
			singleBecause: "You haven’t left your apartment in three months.",
			readyWhen: "You meet someone just like yourself on World of"
						+ " Warcraft.",
			kindOfGirlfriend: "You’re the nurturing girlfriend. Nothing makes"
						+ " you happier than aiding in your loved ones’"
						+ " development and growth – and this is particularly"
						+ " true when it comes to your romantic relationships."
						+ " You will go to absolutely any lengths to ensure"
						+ " that your partner is thriving within the"
						+ " relationship. Their happiness truly is your"
						+ " happiness as well and romantic relationships"
						+ " bring out the natural counselor in you.",
			showLikeBy: "Is actually motivated to spend time with you,"
						+ " especially if they don’t know you very well."
						+ " Stares at you when you’re talking as though they"
						+ " are studying you.",
			mostAttractiveQuality: {
				quality: "indifference",
				description: "I hate to admit it but one of the most"
						+ " attractive qualities someone can exhibit"
						+ " in the 21st century is simply not giving a shit"
						+ " about the dating game. You’d genuinely rather be"
						+ " left alone to your thoughts than to the many"
						+ " emotional masochists out there. You’re the very"
						+ " definition of a challenge."
			},
			inBed: "You have a hard time getting out of your head in bed. You"
						+ " need to feel a high level of comfort with a"
						+ " partner before you’re able to be intimate with"
						+ " them, emotionally or physically. That being said,"
						+ " once you come out of your shell, you get freaky"
						+ " (in a good way). You like to experiment and you"
						+ " enjoy when a partner exposes you to new ways of"
						+ " doing things. INTPs go through long periods of"
						+ " celibacy but are all in once someone gets them"
						+ " going.",
			yourHell: "You are eternally condemned to researching an"
						+ " extremely vapid topic using wildly inaccurate"
						+ " methods, mostly involving interviewing people"
						+ " who have no idea what they’re talking about.",
			atAParty: "Smokes too much weed and wanders off from the party,"
						+ " accidentally ending up in the next town over."
		},
		isfj: {
			instances : ["gunther"],
			singleBecause: "You’re attracted to carefree personalities, who"
						+ " then take the relationship twelve hundred times"
						+ " less seriously than you do.",
			readyWhen: "The ESTP you’ve been pursuing is finally ready to"
						+ " settle down.",
			kindOfGirlfriend: "You’re the death-do-us-part-girlfriend. Simply"
						+ " put, you’re marriage material. You know what you"
						+ " want from a relationship and you aren’t messing"
						+ " around when it comes to finding the person you can"
						+ " be happy with long-term. You invest 110% of"
						+ " yourself into romantic relationships and once"
						+ " you’ve met someone you can see a future with,"
						+ " there is nothing you won’t do to make it work.",
			showLikeBy: "Develops a keen interest in everything you’ve ever"
						+ " even remotely mentioned liking.",
			mostAttractiveQuality: {
				quality: "composure",
				description: "You are polished, composed and incredibly humble"
						+ " to boot. You don’t demand attention but you"
						+ " attract it through your put-together attitude."
						+ " People are attracted to your stability and grace"
						+ " – whether you realize that you possess it or not."
			},
			inBed: "Your goal is first and foremost to accommodate the person"
						+ " you’re sleeping with. Sex is an opportunity to"
						+ " physically display your love so it’s best with"
						+ " someone you’re involved with and committed to."
						+ " You’re not naturally a freak in the sheets but"
						+ " whatever your partner is interested in you’re up"
						+ " for (within reason). You want to experience"
						+ " connection and show devotion to your partner,"
						+ " which sex offers a perfect opportunity for.",
			yourHell: "Everyone you love is yelling at each other and it’s"
						+ " all your fault.",
			atAParty: "Spends the evening holding back the hair of whichever"
						+ " of their friends starts puking first.",
		},
		isfp: {
			instances : ["tag"],
			singleBecause: "You haven’t found anyone you love more than you"
						+ " love Reality TV.",
			readyWhen: "Someone intrigues you enough to pull you out of your"
						+ " shell and you pursue him or her full-force.",
			kindOfGirlfriend: "You’re the sensitive girlfriend. You are"
						+ " highly in tune with your partner when it comes to"
						+ " all of their needs and desires – you take on his"
						+ " or her struggles as your own and are always aware"
						+ " of the relationship’s health. While being"
						+ " sensitive may be a struggle in some areas of your"
						+ " life, it’s your greatest strength within a"
						+ " relationship. You can always tell when something"
						+ " is off between you and your partner and you"
						+ " always dive right into fixing it.",
			showLikeBy: "Inserts themselves into the same social circle as"
						+ " you and parties with you regularly until the two"
						+ " of you inevitably hook up.",
			mostAttractiveQuality: {
				quality: "sensuality",
				description: "We’re not sure if it’s your impeccable style,"
						+ " your quiet creativity or your unexpectedly"
						+ " rebellious side but something about you just oozes"
						+ " sexuality. You are mysterious in all the right"
						+ " ways and it makes people want to know you"
						+ " intimately."
			},
			inBed: "You believe that actions speak louder than words, which"
						+ " means that a great way to show someone how much"
						+ " you care about them is to give them the good"
						+ " lovin’. You’re the very definition of sensual and"
						+ " you’re as physically creative in bed as you are in"
						+ " all other pursuits. Your partners feel"
						+ " appreciated, wanted and satisfied. Good work.",
			yourHell: "You have to listen to rude people criticizing your"
						+ " personal choices, your appearance and your art"
						+ " form all day long. Nobody cares that they’re"
						+ " hurting your feelings.",
			atAParty: "Secretly hooks up with someone in the basement."
		},
		istj: {
			instances : ["ross"],
			singleBecause: "You aren’t a party animal, which you’ve convinced"
						+ " yourself is all anyone your age wants.",
			readyWhen: "You finally reach the phase of life where other people"
						+ " are as ready to settle down as you have been for"
						+ " the past two decades.",
			kindOfGirlfriend: "You’re the unwavering girlfriend. In a world"
						+ " full of partners who flake, freak out and fail to"
						+ " show up for their relationship, you’re someone"
						+ " your partner can rely on. When you’re committed"
						+ " to a relationship, you’re committed – there’s"
						+ " nothing you aren’t willing to do to make it work."
						+ " You’re ready for an adult relationship in a world"
						+ " full of flakey daters and you refuse to settle for"
						+ " anything less than the same.",
			showLikeBy: "Rearranges their schedule in order to spend more time"
						+ " around you but fiercely denies their attraction"
						+ " until you make it clear as day that you’re"
						+ " interested in them.",
			mostAttractiveQuality: {
				quality: "reliability",
				description: "You are the definition of the strong, silent"
						+ " type. People are attracted to your no-fuss-no-muss"
						+ " attitude – they want someone they can rely on and"
						+ " you’re the definition of dependable. Plus your dry"
						+ " humor doesn’t hurt."
			},
			inBed: "Does the idea of having sex in a pre-determined position"
						+ " with a consistent partner at exactly 9pm on every"
						+ " Tuesday, Wednesday and Saturday evening appeal to"
						+ " you? You must be an ISTJ. This type sees sex as a"
						+ " systematic part of any healthy relationship. While"
						+ " you do intrinsically enjoy doing the nasty (Who"
						+ " doesn’t?), you’re not keen to try anything crazy."
						+ " People sleep with you when they want a predictably"
						+ " good time.",
			yourHell: "You are expected to complete a highly esteemed project"
						+ " with absolutely no guidance as to what’s expected"
						+ " of you.",
			atAParty: "Stays mostly sober and low-key judges everyone else for"
						+ " acting like a drunken idiot."
		},
		istp: {
			instances : ["jack"],
			singleBecause: "You rely solely on apps to get laid (Mainly"
						+ " tinder) and don’t see a reason to switch up the"
						+ " game plan.",
			readyWhen: "An insistent ESFJ declares himself or herself your"
						+ " significant other and introduces themselves to"
						+ " your entire family before you have a chance to"
						+ " protest.",
			kindOfGirlfriend: "You’re the independent girlfriend. You need a"
						+ " lot of space to do your own thing, so you’re"
						+ " happiest dating other self-sustaining"
						+ " personalities. You’re always down to have fun but"
						+ " at the end of the day you feel most comfortable"
						+ " relying on yourself first and foremost. Partners"
						+ " admire your independence and know that you’re with"
						+ " them because you genuinely love them – not just"
						+ " because you want to be with someone!",
			showLikeBy: "Becomes uncharacteristically protective of you.",
			mostAttractiveQuality: {
				quality: "aloofness",
				description: "Your offbeat, somewhat distant attitude is"
						+ " endearing at worst and insanely attractive at"
						+ " best. Despite the fact that you’re somewhat"
						+ " reserved in conversation, it’s obvious that"
						+ " you’re a Jack-of-most trades who can take care"
						+ " of yourself with ease. Your aloof independence"
						+ " is hot."
			},
			inBed: "You enjoy the physical component of sex much more so"
						+ " than the romantic/intimate portion. You’re highly"
						+ " visual and are turned on by immediately apparent"
						+ " stimuli – think lingerie, perfume, a swanky hotel"
						+ " suite that begs you to have sex in it. You’re not"
						+ " into anything too crazy sexually but you’re open"
						+ " to trying different things. You can err on the"
						+ " promiscuous side but if it requires work, forget"
						+ " it. You can masturbate alone. No issue there.",
			yourHell: "The Zombie apocalypse happens but you’re suddenly the"
						+ " world’s weakest fighter and must depend solely on"
						+ " your loved ones to keep you alive.",
			atAParty: "Decides it would be fun to Unicycle on the roof and"
						+ " ends up in the hospital."
		}
	},
	getAttribution: function() 
						{ return this.attribution },
	getProfile: function(mbtiType) 
						{ return this.types[mbtiType] },
	getInstances: function(mbtiType) 
						{ return this.types[mbtiType].instances },
	getGenderInstances: function(mbtiType, desiredGender) { 
							var results = [];
							var numInstances = this.types[mbtiType].instances.length;
							for (var i = 0; i < numInstances; i++) {
								var tvFriend = this.types[mbtiType].instances[i]; 
								var gender = mbtiModel.tvFriends.getGender(tvFriend);
								if (gender == desiredGender) {
									results.push(tvFriend);
								}
							}
							return results;
						},
	getSingleBecause: function(mbtiType) 
						{ return this.types[mbtiType].singleBecause },
	getReadyWhen: function(mbtiType) 
						{ return this.types[mbtiType].readyWhen },
	getKindOfGirlfriend: function(mbtiType) 
						{ return this.types[mbtiType].kindOfGirlfriend },
	getShowLikeBy: function(mbtiType) 
						{ return this.types[mbtiType].showLikeBy },
	getMostAttractiveQuality: function(mbtiType) 
						{ return this.types[mbtiType].mostAttractiveQuality },
	getMostAttractiveQualityQuality: function(mbtiType) 
						{ return this.types[mbtiType].mostAttractiveQuality.quality },
	getMostAttractiveQualityDesc: function(mbtiType) 
						{ return this.types[mbtiType].mostAttractiveQuality.description },
	getInBed: function(mbtiType) 
						{ return this.types[mbtiType].inBed },
	getYourHell: function(mbtiType) 
						{ return this.types[mbtiType].yourHell },
	getAtAParty: function(mbtiType) 
						{ return this.types[mbtiType].atAParty }
};


// Add supporting detail for Friends castmembers to spice up the presentation layer.

var mbtiTvFriends = {
	attribution: mbtiAttribution.heidi_priebe,
	friends: {
		carol: {
			fullName: "Carol Willick",
			mbti: "infj",
			gender: "female",
			orientation: "lb",
			mbtiPic: "carol-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Though she was caring by nature, Carol was definitely"
						+ " a feeler second and an intuitive first. She took time"
						+ " to realize her feelings for Susan – she needed a"
						+ " same-sex encounter to actually happen before she was"
						+ " able to come to terms with her own sexual orientation."
						+ " After that point, Carol’s inability to keep living a"
						+ " lie was a classic INFJ move. She remained true to"
						+ " herself, but showed Ross compassion along the way."
						+ " Despite not seeing a lot of Carol throughout the show,"
						+ " her calm, pensive vibe was a dead INFJ giveaway."
		},
		chandler: {
			fullName: "Chandler Bing",
			mbti: "entp",
			gender: "male",
			orientation: "s",
			mbtiPic: "chandler-mbti.png",
			closeupPic: "chandler.png",
			personalityPic: "chandler-2.png",
			rationale: "Though he flips between displaying introverted and"
						+ " extroverted characteristics, Chandler’s extroverted"
						+ " intuition is indubitably his lead function – his"
						+ " quick wit is his most defining trait. Of all the"
						+ " characters on the show, Chandler is always the first"
						+ " to pick up on what’s being left unsaid – and then he"
						+ " rushes to rectify the situation, regardless of how"
						+ " inappropriate his comment may be. Classic ENTP."
		},
		charlie: {
			fullName: "Charlie Wheeler",
			mbti: "intj",
			gender: "female",
			orientation: "s",
			mbtiPic: "charlie-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Decisive, self-assured and tirelessly intellectual,"
						+ " Charlie was a textbook INTJ. She allowed research"
						+ " to rule her life and was attracted to intelligence"
						+ " in a partner above all else. Her under-developed"
						+ " introverted feeling was clear in the way she hopped"
						+ " from partner to partner without concern for their"
						+ " emotions. Introverted intuition and extroverted"
						+ " thinking were clearly her stronger suits."
		},
		david: {
			fullName: "David",
			mbti: "intp",
			gender: "male",
			orientation: "s",
			mbtiPic: "david-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "The brilliant yet hopelessly awkward scientist who left"
						+ " Phoebe to move to Minsk – who could forget David?"
						+ " His introverted thinking kept him thoroughly invested"
						+ " in his research, while his extroverted intuition was"
						+ " responsible for the hilarious one-liners he"
						+ " consistently doled out. David was indecisive,"
						+ " speculative and wholly invested in his work – all"
						+ " classic INTP traits."
		},
		gunther: {
			fullName: "Gunther",
			mbti: "isfj",
			gender: "male",
			orientation: "s",
			mbtiPic: "gunther-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Loyal right to the end, Gunther was the absolute"
						+ " embodiment of an ISFJ. He was quiet yet devoted,"
						+ " wanting Rachel to be happy even more than he wanted"
						+ " to be with her. Though we didn’t see much of this"
						+ " character on the front line of the show, Friends"
						+ " just wouldn’t have been the same without Gunther"
						+ " – offering us the ultimate tale of unrequited love."
		},
		jack: {
			fullName: "Jack Geller",
			mbti: "istp",
			gender: "male",
			orientation: "s",
			mbtiPic: "jack-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale:  "Jack Geller has to be the most hilariously underrated"
						+ " character on the show. Frank, quirky and pervasively"
						+ " aloof, he plays a typical ISTP. He sees things as they"
						+ " are – nothing more, nothing less. A typical perceiver,"
						+ " he lets his wife make most of the important decisions"
						+ " while he simply comes along for the ride – and"
						+ " provides unassumingly hilarious commentary."
		},
		janice: {
			fullName: "Janice Litman Goralnik",
			mbti: "esfj",
			gender: "female",
			orientation: "s",
			mbtiPic: "janice-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Despite her undeniably irritating catchphrase, OMG"
						+ " (and voice in general), Janice played a surprisingly"
						+ " mature character. She cares deeply for the people"
						+ " around her and remains loyal to a fault to her loved"
						+ " ones. She wants nothing more than for the people"
						+ " around her to be happy and well taken care of."
						+ " Janice was a well-developed ESFJ character who didn’t"
						+ " deserve the bad reputation that she got."
		},
		joey: {
			fullName: "Joey Tribbiani",
			mbti: "esfp",
			gender: "male",
			orientation: "s",
			mbtiPic: "joey-mbti.png",
			closeupPic: "joey.png",
			personalityPic: "joey-2.png",
			rationale: "Joey Tribbiani, everyone’s favourite ladies man, plays a"
						+ " childlike caricature of the ESFP. Highly impulsive and"
						+ " emotional, Joey’s inferior functions never get"
						+ " developed and he remains eternally dependent on the"
						+ " other characters to take care of him. Being the"
						+ " charming ESFP that he is though, nobody minds. After"
						+ " all, he’s just so endearing."
		},
		kathy: {
			fullName: "Kathy",
			mbti: "enfj",
			gender: "female",
			orientation: "s",
			mbtiPic: "kathy-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Expressive, intuitive and nurturing, Kathy displayed every"
						+ " quality of a confident ENFJ. Though her romantic"
						+ " indiscretion may have been a wee bit out of character,"
						+ " her chemistry with Chandler was undeniable. Her"
						+ " reactive extroverted feeling ran her life and her"
						+ " introverted intuition sometimes took a bit of time to"
						+ " catch up – nonetheless she played an ENFJ character to"
						+ " a T – or should we say, to an F."
		},
		mike: {
			fullName: "Mike Hannigan",
			mbti: "estp",
			gender: "male",
			orientation: "s",
			mbtiPic: "mike-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Goofy, unpredictable and tolerant of Phoebe’s many quirks,"
						+ " Mike displayed various characteristics of the"
						+ " easy-going ESTP. He showed confidence in his physical"
						+ " pursuits (a single game of ping-pong was enough to"
						+ " make us aware of his competitive nature), an"
						+ " open-minded attitude, and he was quick to act on his"
						+ " decisions – once he finally got around to making them."
						+ " Mike was a textbook ESTP and like most ESTPs, it was"
						+ " difficult not to love him."
		},
		monica: {
			fullName: "Monica Geller",
			mbti: "estj",
			gender: "female",
			orientation: "s",
			mbtiPic: "monica-mbti.png",
			closeupPic: "monica.png",
			personalityPic: "monica-2.png",
			rationale: "Opinionated, high-strung and perfectionistic, Monica is a"
						+ " classic ESTJ. She is sure of what she wants and moves"
						+ " confidently toward her goals in any situation. She"
						+ " feeds off the energy of others but also believes that"
						+ " everything and everyone has its proper place – making"
						+ " her just a wee bit bossy. If her cleaning habits don’t"
						+ " convince you of her personality type, her attitude as"
						+ " a chef certainly will."
		},
		paul: {
			fullName: "Paul Stevens",
			mbti: "infp",
			gender: "male",
			orientation: "s",
			mbtiPic: "paul-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Okay, we may be reaching a bit here – Friends was severely"
						+ " lacking in INFP characters. The closest appropriation"
						+ " we got was Bruce Willis’s fantastic portrayal of Paul,"
						+ " the no-nonsense father of Ross’s young flame"
						+ " Elizabeth. As the series unfolded, we saw a much"
						+ " softer side to Paul – one that revealed a rich inner"
						+ " emotional world. One so rich, in fact, that Rachel had"
						+ " to break up with him for his overly-emotional"
						+ " tendencies. But hey, he was a neat guy. And his"
						+ " self-pep-talk was a hilarious display of introverted"
						+ " feeling."
		},
		pete: {
			fullName: "Pete Becker",
			mbti: "entj",
			gender: "male",
			orientation: "s",
			mbtiPic: "pete-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Successful, organized and goal oriented to a fault, Pete"
						+ " was the perfect example of a fully-thriving ENTJ. He"
						+ " latched quickly onto new challenges regardless of"
						+ " what they entailed – from starting a multi-million"
						+ " dollar company to becoming the Ultimate Fighting"
						+ " Champion. Determined, personable and successful, Pete"
						+ " was an ENTJ through and through."
		},
		phoebe: {
			fullName: "Phoebe Buffay",
			mbti: "enfp",
			gender: "female",
			orientation: "s",
			mbtiPic: "phoebe-mbti.png",
			closeupPic: "phoebe.png",
			personalityPic: "phoebe-2.png",
			rationale: "Zany, creative and full of new ideas, Phoebe Buffay plays"
						+ " an exaggerated version of the classic ENFP. No"
						+ " speculation is too out-there for this unconventional"
						+ " character who lets her extroverted intuition run wild"
						+ " when it comes to evaluating her career and romance"
						+ " options. When she needs to make a decision, Phoebe"
						+ " uses a strong set of internal morals to govern her."
						+ " She is a classic ENFP – if her song lyrics won’t"
						+ " convince you, her outlandish actions will."
		},
		rachel: {
			fullName: "Rachel Green",
			mbti: "esfp",
			gender: "female",
			orientation: "s",
			mbtiPic: "rachel-mbti.png",
			closeupPic: "rachel.png",
			personalityPic: "rachel-2.png",
			rationale: "Rachel embodies a realistic, well-developed ESFP character"
						+ " who plays on her strengths. She uses extroverted"
						+ " sensing to establish a successful career in the"
						+ " fashion industry and introverted feeling to nurture"
						+ " deep, caring relationships with those around her. She"
						+ " is the ESFP we all wish we had in our lives"
						+ " – spontaneous, enthusiastic and funny yet also"
						+ " responsible, driven and grounded. Rachel embodies an"
						+ " excellent depiction of a mature ESFP."
		},
		ross: {
			fullName: "Ross Geller",
			mbti: "istj",
			gender: "male",
			orientation: "s",
			mbtiPic: "ross-mbti.png",
			closeupPic: "ross.png",
			personalityPic: "ross-2.png",
			rationale:  "Focused, detail-oriented and just a little bit irritable,"
						+ " Ross displays undeniable ISTJ characteristics. Though"
						+ " the nature of the show focuses mainly on his feelings,"
						+ " Ross is a thinker at heart. He is drawn to"
						+ " intellectual pursuits and derives energy through his"
						+ " inner world of thoughts and, well, dinosaurs. His"
						+ " never-ending quest for the security of marriage is a"
						+ " classic SJ trait – ISTJs in particular want to get"
						+ " their lives settled down and in order as quickly as"
						+ " they possibly can."
		},
		tag: {
			fullName: "Tag Jones",
			mbti: "isfp",
			gender: "male",
			orientation: "s",
			mbtiPic: "tag-mbti.png",
			closeupPic: "placeholder200x200.png",
			personalityPic: undefined,
			rationale: "Sweet, goofy and all-around loveable, Tag played a (well,"
						+ " slightly under-developed) ISFP. His first function –"
						+ " introverted feeling – clearly governed his decisions,"
						+ " as he didn’t let the rules stop him from dating his"
						+ " boss. His extroverted sensing was expressed through"
						+ " his goofy, fun-loving nature that kept him scooting"
						+ " through life by the seat of his pants."
		}
	},
	getAttribution: function() { return this.attribution },
	getProfile: function(firstName) { return this.friends[firstName] },
	getFullName: function(firstName) { return this.friends[firstName].fullName },
	getMbti: function(firstName) { return this.friends[firstName].mbti },
	getGender: function(firstName) { return this.friends[firstName].gender },
	getOrientation: function(firstName) { return this.friends[firstName].orientation },
	getMbtiPic: function(firstName) { return mbtiModel.imgDir + "/" 
						+ this.friends[firstName].mbtiPic },
	getCloseupPic: function(firstName) { return mbtiModel.imgDir + "/" 
						+ this.friends[firstName].closeupPic },
	getPersonalityPic: function(firstName) { return mbtiModel.imgDir + "/" 
						+ this.friends[firstName].personalityPic },
	getRationale: function(firstName) { return this.friends[firstName].rationale }
};

// Function: unitTests
// Usage: if (mbtiModel.unitTests()) console.log("passed");
// --------------------------------------------------------
// Returns boolean true if all the unit tests for the 
// MBTI (Meyers Briggs Type Indicator) model pass.

function unitTests() {
	console.log("model.unitTests");
	var result = true;
	var pic = this.attribution.getPic("heidi_priebe");
	result = (pic === mbtiModel.imgDir + "/" + "heidi_priebe.png");
	if (result) {
		pic = this.tvFriends.getMbtiPic("ross");
		result = (pic === mbtiModel.imgDir + "/" + "ross-mbti.png");
	}
	if (result) {
		var profile = this.tvFriends.getProfile("ross");
		console.log(profile);
		result = (profile.fullName === "Ross Geller");
	}
	if (result) {
		var rationale = this.tvFriends.getRationale("ross");
		console.log(rationale);
		result = (rationale) ? true : false;
	}
	if (result) {
		var video = this.videos.getVideo("infj");
		console.log(rationale);
		result = (video === "https://youtu.be/d4dLLS-DQfA?list=PL6rzdODmcL641s7WiVwaAAMlTrwnI1bCA");
	}
	if (result) {
		var infjExpectedMatches = ["entp", "enfp"]
		var bestMatches = this.bestMatches.getBestMatches("infj");
			matches: ["entp", "enfp"],
		console.log(bestMatches);
		result = (bestMatches.join('') === infjExpectedMatches.join(''));
	}
	if (result) {
		var expectedMaleResults = ["joey"];
		var expectedFemaleResults = ["rachel"];
		var mResults = this.profiles.getGenderInstances("esfp", "male");
		console.log(mResults);
		var fResults = this.profiles.getGenderInstances("esfp", "female");
		console.log(fResults);
		result = (mResults.pop() == expectedMaleResults.pop() 
				&& fResults.pop() == expectedFemaleResults.pop());
	}
	return result;
}