const drunkenGrammar = {
    "drunkSynonyms": ["drunk", "intoxicated", "inebriated", "befuddled", "tipsy", "disoriented", "wasted", "hammered", "plastered", "sloshed", "flabbergasted"],
    "drunkMetaphors": ["a skunk", "a lord", "the sky is blue", "the world on St. Patrick's day", "a single person on valentine's day"],
    "number": ["1","2","3","4","5","6","7","8","9"],
    "numberCount": ["second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"],
    "mathProblem": ["1#number# * #number#", "#number# * 1#number#"],
    "companion": ["your brother", "your sister", "your mother", "your friends", "Harry", "Ron", "Hermione", "Fred", "George", "a stranger", "Malfoy", "Ash", "Brock"],
    "holder": ["shot", "glass", "mug", "cup", "bottle", "goblet"],
    "alcohol": ["beer", "whiskey", "vodka", "gin", "rum", "wine", "ale"],
    "buildingAdjective": ["colonial-era", "dilapidated", "high-rise", "modest", "red brick", "snug", "spacious", "crowded", "weird", "spooky", "half-constructed"],
    "venue": ["building", "tower", "farmhouse", "shop", "bar", "restaurant", "cafe", "market"],
    "character": ["Superman", "Batman", "Wonder woman", "Black widow", "Mystique", "Spiderman", "Iron Man", "Thor", "Hulk", "a random person", "Hagrid", "Dean Thomas", "Frodo", "Misty", "Leia", "Julia Roberts", "Ada Lovelace", "Dory",  "Pikachu", "Darth Vader", "Natalie Portman", "Ginny"],
    "verb": ["arrang", "break", "build", "coach", "mak", "creat", "eat", "read", "fight", "lift"],
    "otherVerb": ["laugh", "danc", "cry", "scream", "jump", "shout"],
    "main": ["#otherVerb#ing", "#verb#ing #object.s#"],
    "object": ["bottle", "diary", "glasses", "watch", "counter", "camera", "coin", "postcard", "dictionary", "key", "mobile phone", "credit card", "umbrella", "pen", "laptop", "notebook", "painkiller"],
    "quote": ["May the force be with you", "It's alive! It's alive!", "There's no place like home", "You had me at hello!", "Carpe diem. Seize the day. Make your life extraordinary", "I am your father", "I'll be back", "My precious", "You can't handle the truth!", "A martini. Shaken, not stirred", "Keep your friends close, but your enemies closer", "Just keep swimming", "Hasta la vista, baby", "Snap out of it", "To infinity and beyond", "They may take our lives, but they'll never take our freedom", "Houston, we have a problem", "Roads? Where we're going we don't need roads.", "Always!", "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", "Don’t let the muggles get you down."],
    "event": ["hit", "punched", "slammed", "pummeled", "knocked out", "smacked"],
    "animal": ["bunny", "duck", "horse", "rat", "otter", "cat", "panda", "squirrel", "bear", "bee", "porcupine", "skunk", "owl", "dog", "dinosaur", "unicorn", "dragon", "donkey"],
    "action": ["justice", "revenge", "happiness", "supreme power", "some food", "to find true love", "dumbledore's hand in marriage"],
    "expression": ["Okay sure. Go for it", "You have the wrong number", "Meh, I wasn't too fond of them anyway", "Yeah, that seems like too much effort", "Yeah, I don't really know anyone like that"],
    "tallPlace": ["the empire state building", "the moon", "a skyscraper", "a giant ferris wheel",  "the Doofenshmirtz evil inc building", "the roof of a #venue#"],
    "bouncyPlace": ["a giant thanksgiving day balloon", "Snorlax", "a giant stuffed animal", "a dragon's belly", "Baymax"],
    "story": ["You were drinking at a #buildingAdjective# #venue# with #companion# and #companion#.\nAs you were having your second #holder# of #alcohol#, #character# walked in and started #main# for no apparent reason.\nYou tried to go over but you were stopped by #character#, who stepped in your way and said '#quote#'.\nYou were trying to figure out what it meant when you were #event# from behind.\nWhen you came to your senses, you realised it was all an elaborate plan to kidnap you and you were being held hostage by #animal.a# who wanted #action#.\nHe called up your friends, told them that you were being held hostage and gave them a list of demands.\nYour friends said '#expression#' and hung up.\nIn anger, he tried to kill you by throwing you off #tallPlace# but you were saved since you fell on #bouncyPlace#.\nYou were all so happy you survived that you had #number##number# extra #holder.s# of #alcohol# and passed out.\nHope you slept well."],
    "drunkPhrase": ["Wow. You're as #drunkSynonyms# as #drunkMetaphors#."]    
}