// Create a Tracery grammar from a raw grammar object (a js object)
this.grammar = tracery.createGrammar({
	flavor: ["blackberry", "mint", "cinnamon", "orange", "#flavor# and #flavor#"],
	drink: ["coffee", "#flavor# tea", "#flavor sparkling water"]
})

// Add the modifiers (for "animal.a", "name.capitvalize", etc functionality)
this.grammar.addModifiers(baseEngModifiers)

for (var i = 0; i < 10; i++) {

	// Create a text expansion for this rule
	let output = this.grammar.flatten("I order #drink.a#.")

	// Should now output "I order a cinnamon tea" "I order an orange and mint water", etc
	console.log(output)
}