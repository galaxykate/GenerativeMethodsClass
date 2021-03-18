let coffeeGrammar = {
	 "coffeeServing" : ["with a dollop of #cream#", "as a #cream# latte", "topped with #cream# foam", "black", "as a pourover", "clover-style", "French Press", "in a teacup", "in a moka pot", "in a teapot", "in a pile of discarded Keurig cups", "with #cream#"],
    "coffeeServingInstruction" : ["Served #coffeeServing#", "Available #coffeeServing# or #coffeeServing#", "Try it #coffeeServing#", "Available #coffeeServing#"],
    "coffeeType" : ["arabica", "decaf", "mocha", "grind", "espresso", "french roast", "dark roast", "light roast", "#flavorMod# roast", "extra #flavorMod# roast"],
    
    "coffeeName" : ["#hpn# #coffeeType.capitalizeAll#", "#landscapeComplex.capitalizeAll# #coffeeType.capitalizeAll#", "#name#'s #coffeeType.capitalizeAll#"],
    "coffeeDesc" : ["#flavorAttr.capitalize#.  #coffeeServingInstruction#.", "#flavorAttr.capitalize# and #flavorAttr#.  #coffeeServingInstruction#."],
     "landscapeAdj" : ["rainy", "windy", "old", "grey", "dark", "creaky", "quiet", "silent", "fair", "shadow", "verdant", "sunny", "far", "near", "dry", "dead"],
    "landscapeFeature" : ["river", "mountain", "forest", "mines", "pines", "falls", "glen", "garden", "mansion", "village", "isle", "bayou", "swamp", "hill", "creek", "rainforest", "desert"],

     "flavorAttr" : ["#hint.a# of #flavor#", "#texture# on your tongue", "#flavorMod# and #flavorMod# as #memory#", "it is #flavorMod# and #flavorMod# as #memory#", "#flavor#, #flavor#, and #flavor# #hint.s#", "#flavorMod# #flavor#, with #hint.s# of #flavor#", "#flavor# #blendsWith# #flavorMod# #flavor#", "#flavorMod# #flavor# #blendsWith# #flavorMod# #flavor#", "#flavorMod# #flavor#", "#flavorMod# #fruit.s#", "#hint.s# of #flavorMod# #flavor#", "#flavorMod# and #flavorMod#", "#flavorMod# #flavor# #hint.s#", "it smells of #memory#", "it reminds you of  #memory#", "you smell #memory#", "you remember #memory#", "you taste #memory#", "all you can taste is #memory#", "you #areDrowningIn# #flavorMod# #flavor#"],
  // All your food related stuff!   
	
	
	"cookingmode" : ["braised", "steamed", "blackened", "sauteed", "charred", "herb-crusted", "roasted", "baked", "poached", "simmered", "smoked", "stewed", "seared", "browned", "grilled","curried"],
        "real meat" : ["scallops", "pork chops", "lamb chops", "goat", "chicken",  "turkey breast", "chicken kebabs", "beef", "lamb", "turkey", "mutton", "duck breast"],
	"meat" : ["Spider's Leg", "Wasp Abdomens", "Giant's Toe", "Scorpion Tails", "Meal worms", "Lacewing flies", "Crow's feet", "Crab Claws" , "Monkey's Paw",
		   "Crow Feathers", "Pine Needles" , "Chicken Feet", "Horseshoe", "Salamandar Eyes", "Stonecat", "Alligator Foot", "Caterpillar Heads", "Hawk Beak", 
		   "Tadpoles"
		  
		  ],
	
	
	"sides" : ["rose petals", "dandelion root", "eggshell crumbles", "volcano ash" , "morning dew", "elder flowers" , "jujube thorns", "pine needles", "beeswax",
	"cockle shells", "century-old bricks", "quartz clusters", "unicorn hair", "poison oak", "Tears of Sadness", "Mandrakes"
	
	],
	
	
	
	
	"phrases" : ["Would you like to try", "How about", "You might like", "What about", "Perhaps", "Let's try", "Maybe, you could have"],
	
	
	
	
	
	
	"break" : ["Seriously again?", "Really...really?!" , "That's just fan-freaking-tastic!", "This all seems like a joke right?", "Hmm....so much for laziness" , "Awww, you must be SO tired!", 
		   "Yeah sure. Why not? Let's just take an extended time off.", "That sounds like fun and remember we agreed...no fun!" , "And here I thought you were actually serious this time...", 
		   "Do you really though?", "Come on now..make my life a bit easier", "You know what I'm tired of saying no. Just go ahead." , "It's not that it would make a difference.",
		  "You know what? I make the rules around here. So, not right now!", "Well, that's not my problem!", "Lemme think about it...I just did..NO!","Let's make this easy for you. No!",
		   "Don't you even think about it" 
		  
		  ]
}
