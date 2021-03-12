console.log("Hello, not loaded yet")

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function(){
	console.log("Hello, webpage!")



	// let el = document.getElementById("tarot");
	// console.log(el)
	// el.append("FOO")

	// let html = ""

	// for (key in tarot.cards) {
	// 	let card = tarot.cards[key]
	// 	console.log(card.name)

	// 	html +=`<div class='card'>${card.name}</div>`
	// }
	// el.innerHTML = html
});



function makeFire() {
	console.log("Make fire")

	// Get the element with the id "fireplace"
	let el = document.getElementById("fireplace");

	// Add 20 fire emoji to it
	for (var i = 0; i < 20; i++) {
		el.append("🔥")
	}

	// Also set its color to red
	el.style.backgroundColor = "red";
}



// console.log(tarot)