class StudyBot {
 constructor() {
		this.coffeeAmount = 0
		this.maxCoffee = 10
		this.coffeeFlavor = "Baked"
		this.coffeeDescription = "Chicken"
	 	this.context = "Why don't we cook"

		this.grammar = tracery.createGrammar(coffeeGrammar)
		this.grammar.addModifiers(baseEngModifiers)
		console.log("A type of coffee:", this.grammar.flatten("#coffeeType#"))
	}

	respondTo(s) {
		if (s.includes("number")) {
			if (this.coffeeAmount  == 0)
				return "Do you know what's odd? Every other number!"	
		}
		
		if (s.includes("triangle") || s.includes("triangles") || s.includes("triangular")) {
			if (this.coffeeAmount  == 0)
				return "What did the triangle say to circle? You're pointless."	
		}

		if (s.includes("circle") || s.includes("circles") || s.includes("circular")){
			if (this.coffeeAmount  == 0)
				return "Did you know why no one talks to circles? Because there's no point."	
		}
		
		if (s.includes("line") || s.includes("lines")){
			if (this.coffeeAmount  == 0)
				return "Parallel lines have so much in common... it's a shame they'll never meet."	
		}
		
		if (s.includes("angle") || s.includes("angles")){
			if (this.coffeeAmount  == 0)
				return "Did I ever tell you about the time I had an argument with a 90 degree angle? Well, it turns out it was right."	
		}
		
		if (s.includes("equation") || s.includes("equations")){
			if (this.coffeeAmount  == 0)
				return "Uhhh equations... tell me about them. They d(e)rive us all crazy!"	
		}
		
		if (s.includes("miss") || s.includes("skip")){
			if (this.coffeeAmount  == 0)
				return "When you keep missing Math class, it really starts to add up!"	
		}
		
		if (s.includes("decimal") || s.includes("decimals")){
			if (this.coffeeAmount  == 0)
				return "I don't get the point of decimals. I'm more partial to fractions"	
		}
		
		if (s.includes("pencil case") || s.includes("ruler")  || s.includes("geometry box")){
			if (this.coffeeAmount  == 0)
				return "You know who rules everything....the ruler!"	
		}
		
		if (s.includes("inch") || s.includes("inches")  || s.includes("feet")){
			if (this.coffeeAmount  == 0)
				return "Did you know that a nose can't be 12 inches long?....Then, it would be a a foot."	
		}
		
		if (s.includes("algebra") || s.includes("algebraic") ){
			if (this.coffeeAmount  == 0)
				return "You know what I love about algebra is how it makes you a better dancer...Come on let's use the algorhythm!"	
		}
		
		
		
		
		
		
		
		
		
		
		
	// Weird Food Potions
		if (s.includes("eat") || s.includes("Time to Eat!")) {

			// Create new values
			this.coffeeFlavor = this.grammar.flatten("#sides#")
			this.coffeeDescription = this.grammar.flatten("#meat#")
			this.method = this.grammar.flatten("#cookingmode#")
			this.context= this.grammar.flatten("#phrases#")

			return `${this.context} ${this.method} ${this.coffeeDescription} with ${this.coffeeFlavor}`

		}
		
		
		
	// Study Break!	
		
		if (s.includes("take a break") || s.includes("study break")) {

			// Create new values
			this.breakphrases= this.grammar.flatten("#break#")
			return `${this.breakphrases}`

		}

		if (s.includes(418))
			return `I'm a coffee pot`
		return `Oh my Math....can't you ever stop talking about Math?`
	}
}
