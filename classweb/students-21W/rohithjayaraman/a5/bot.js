//class for bot
class RoBot {
  constructor() {
    //keep track of whether the user is drunk
    this.drunk = false;
    //current state of bot
    this.state = undefined;
    //holds question asked by bot if it has been asked
    this.quiz = undefined;

    //tracery stuff
    this.grammar = tracery.createGrammar(drunkenGrammar);
    this.grammar.addModifiers(baseEngModifiers);
  }

  //generate reply
  reply(input) {
    //convert reply to lower case to avoid problems
    input = input.toLowerCase();

    //has bot asked if user is drunk
    if (this.state == "question") {
      //user replies no
      if (input.includes("no")) {
        //ask a question
        this.state = "math";
        //generate a math problem
        this.quiz = this.grammar.flatten("#mathProblem#");
        return [`Oh really. What is ${this.quiz} then?`];
      }
      //user replies anything else
      else {
        //assume user is drunk
        this.drunk = true;
        this.state = undefined;
        //generate metaphor/similie for being drunk
        return [this.grammar.flatten("#drunkPhrase#")];
      }
    }
    //has bot asked a math question
    else if (this.state == "math") {
      //get question
      const question = this.quiz.replace(" ", "");
      const parts = question.split("*");
      //calculate answer
      const answer = Number(parts[0]) * Number(parts[1]);
      //user answered correctly
      if (input == answer) {
        //assume user is sober
        this.state = "sober";
        //generate synonym for being drunk. Say user is not drunk
        return [
          this.grammar.flatten("Wow. It seems you aren't #drunkSynonyms#."),
        ];
      }
      //user answered incorrectly
      else {
        //assume user is drunk
        this.drunk = true;
        this.state = undefined;
        //generate metaphor/similie for being drunk
        return [this.grammar.flatten("#drunkPhrase#")];
      }
    }
    //check if user determined to be drunk or sober or bot asked if it should tell story
    else if (
      this.drunk == true ||
      this.state == "sober" ||
      this.state == "story"
    ) {
      //user replies yes and bot has asked if user wants to listen to story
      if (
        ((input.includes("happened") && input.includes("what")) ||
          input.includes("yes")) &&
        this.state == "story"
      ) {
        this.drunk = false;
        this.state = "bye";
        const storyParts = this.grammar.flatten("#story#").split("\n");
        return storyParts;
      }
      //user replies no or bot has not yet asked if user wants to listen to story
      else {
        //bot has already asked
        if (this.state == "story") {
          return [
            "Oh common, I know you wanna know what happened",
            'Say "Yes" or "Ya, what the hell happened?',
          ];
        }
        //ask user
        this.state = "story";
        const val = [];
        if (this.drunk) {
          val.push(this.grammar.flatten("You're really #drunkSynonyms#"));
        }
        return [
          ...val,
          "So, you want to know what happened last night?",
          'You can say "Yes" or "Ya, what the hell happened?"',
        ];
      }
    }
    //has bot finished telling story
    else if (this.state == "bye") {
      this.state = undefined;
      return [
        "Well, that's all I have got to say.",
        "Hopefully, you won't need someone to tell you what happened next time. Adios.",
      ];
    }
    //none of the others match, meaning start of conversation
    else {
      this.state = "question";
      this.drunk = false;
      return [
        "Hi, I am the drunken RoBot",
        this.grammar.flatten("Are you still #drunkSynonyms#?"),
      ];
    }
  }
}
