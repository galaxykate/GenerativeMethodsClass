class PitchBot {
	constructor() {

		this.charClass = null;
		this.name = null;
		this.title = null;

		this.birthplace = null;

		this.do = null;

		this.finished = false;

		this.grammar = tracery.createGrammar(characterGrammar)
		this.grammar.addModifiers(baseEngModifiers)
		console.log("A character:", this.grammar.flatten("#name#, #titleFighter#"))
	}

	respondTo(s) {
		
		if (this.charClass === null) {
			if (s.toLowerCase().includes("fighter")) {
				this.charClass = "fighter"
				this.name = this.grammar.flatten("#name#")
				this.title = this.grammar.flatten("#titleFighter#")
				return `Now we're talking! The name of the character is ${this.name}, ${this.title}.`
			}

			else if (s.toLowerCase().includes("mage")) {
				this.charClass = "mage"
				this.name = this.grammar.flatten("#name#")
				this.title = this.grammar.flatten("#titleMage#")
				return `Love it! The name of the character is ${this.name}, ${this.title}.`
			}

			else {
				return "This character will either be a fighter or a mage. Which do you like more?"
			}
		}


		if ((this.charClass) && (this.birthplace === null)) {

			if (s.includes("negative")) {
				if (this.charClass === "fighter") {
					this.name = this.grammar.flatten("#name#")
					this.title = this.grammar.flatten("#titleFighter#")
				}
				if (this.charClass === "mage") {
					this.name = this.grammar.flatten("#name#")
					this.title = this.grammar.flatten("#titleMage#")
				}
				return `How about this instead? ${this.name}, ${this.title}.`
			}

			else if (s.includes("positive")) {
				this.birthplace = this.grammar.flatten("#birthplace#")
				return `Awesome! And our ${this.name} is from ${this.birthplace}.`
			}

			else {
				return "I don't quite get it. You can click 😍 or 🤨 below to tell me how you like it!"
			}
		}

		if (this.birthplace && (this.do === null)) {
			if (s.includes("negative")) {
				this.birthplace = this.grammar.flatten("#birthplace#")
				return `Let me see... What if ${this.name} comes from ${this.birthplace}?`
			}

			else if (s.includes("positive")) {
				this.do = this.grammar.flatten("#do#")
				return `Glad you like it! Also, ${this.name} ${this.do}.`
			}

			else {
				return "I don't quite get it. You can click 😍 or 🤨 below to tell me how you like it!"
			}	
		}

		if (this.do && !(this.finished)) {
			if (s.includes("negative")) {
				this.do = this.grammar.flatten("#do#")
				return `Ahh. I bet you\'ll like this: ${this.name} ${this.do}.`
			}

			else if (s.includes("positive")) {
				this.finished = true
				return `Perfect! So we have ${this.name}, ${this.title}, from ${this.birthplace}. ${this.name} ${this.do}. We'll keep working on the rest!`
			}

			else {
				return "I don't quite get it. You can click 😍 or 🤨 below to tell me how you like it!"
			}	
		}

		if (this.finished) {
			this.charClass = null
			this.name = null
			this.title = null
			this.birthplace = null
			this.do = null
			this.finished = false
			return "I have another new character! Fighter or mage? You choose!"
		}
		
		else {
			this.charClass = null
			this.name = null
			this.title = null
			this.birthplace = null
			this.do = null
			this.finished = false
			return "Not sure what you mean. Let's start over! I have a new character! Fighter or mage? You choose!"
		}
		
	}
}