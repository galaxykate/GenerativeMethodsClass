class CoffeeBot {
 constructor() {
		this.coffeeAmount = 0
		this.maxCoffee = 10
		this.coffeeFlavor = "Folgers Instant"
		this.coffeeDescription = "boring coffee"

		this.grammar = tracery.createGrammar(coffeeGrammar)
		this.grammar.addModifiers(baseEngModifiers)
		console.log("A type of coffee:", this.grammar.flatten("#coffeeType#"))
	}

	respondTo(s) {
		if (s.includes("drink")) {
			if (this.coffeeAmount  == 0)
				return "No coffee, brew more"
			
			this.coffeeAmount -= 1
			return this.grammar.flatten("The flavor is #flavor#")
		}

		// Brew new coffee
		if (s.includes("brew")) {

			// Create new values
			this.coffeeFlavor = this.grammar.flatten("#coffeeName#")
			this.coffeeDescription = this.grammar.flatten("#coffeeDesc#")

			let interval = setInterval(() => {
				this.coffeeAmount = Math.min(this.coffeeAmount + 1,  this.maxCoffee)
				if (this.coffeeAmount >= this.maxCoffee)
					clearInterval(interval)


				console.log("post to chat")
				this.post("... ")
			}, 200)
			

			return `Brewing ${this.coffeeFlavor}, ${this.coffeeDescription}`

		}

		if (s.includes(418))
			return `I'm a coffee pot`
		return `'${s}' isn't a type of coffee`
	}
}