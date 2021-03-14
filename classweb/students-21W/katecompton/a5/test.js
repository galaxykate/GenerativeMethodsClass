
let myGrammar = {
	"flavor": ["amaretto", "earl grey", "mint"],
	"snack": ["scone", "pie", "donut", "pocky"],
	"hotDrink": ["coffee", "#flavor.a# tea", "a latte"],
	"origin": ["I want #hotDrink# and #snack.s#"]
}

let grammar = tracery.createGrammar(myGrammar)


// let grammar = tracery.createGrammar(TESTGRAMMARS.hipchef)
grammar.addModifiers(baseEngModifiers)



// Do setup
document.addEventListener("DOMContentLoaded", function(){
	
	// Whats on the page
	var app = new Vue({
		el: '#main',
		template: `<div id="app">
			<div id="traces" style="flex:1">
				<div v-for="(trace,traceIndex) in traces" :key="traceIndex" class="trace" v-html="trace" >
					{{trace}}
				</div>
			</div>

			
			<div id="controls" style="height:100px">

				<input v-model="seed" />
				<select v-model="count">
					<option>1</option>
					<option>3</option>
					<option>10</option>
					<option>30</option>
				</select>
				<button @click="reroll">🎲</button>
			</div>

		</div>`,
		computed: {
			traces() {
				// Set the random seed so its always the same
				tracery.setRng(new Math.seedrandom(this.seed))
				

				console.log(this.seed)
				let traces = []
				for (var i = 0; i < this.count; i++) {
					// let trace = grammar.expand("#origin#")
					let trace = grammar.flatten("#origin#")
					traces.push(trace)
					
				}
				return traces
			}	
		},

		watch: {
			seed() {
				localStorage.setItem("seed", this.seed)
			}
		},

		methods: {
			reroll() {
				this.seed = Math.random().toString(36).substring(7);
			}
		},
		data: {

			seed: localStorage.getItem("seed", this.seed) || Math.random().toString(36).substring(7),
			count: 10,
		}
	})

})
