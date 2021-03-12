let noise = new SimplexNoise()

let cardSize = 700
let cardAspect = 1.4
let mode = "dark"

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}


Vue.component("card-label", {
	template: `
		<div :style="style" class="meaning">{{label.text}}
	</div>`,
	computed: {
		size() {
			let scale = Math.max(Math.min(1.0, 30/this.h), .8)
			return 10*this.label.scale*scale
		},
		style() {
			return {
				fontSize: this.size.toFixed(2) + "px",
				opacity: (40*this.label.pct + (1 - this.pct)*60) + "%"
			}
		}
	},
	props: ["label", "pct", "h"]

})

Vue.component("card", {
	template: `
		<div class="card" @click="save" :style="cardStyle" :class="{light:mode=='light'}">
			<div class="bg" v-html="card.svg">

			</div>
			<div class="top">
				<div class="title">{{card.name}}

					<div><img v-if="card.suit !=='Trump'" :src="suiteImg" ></div>
				</div>
			
				<div class="label-light label-section">
					<card-label v-for="(label,index) in card.scales.light" 
						:key="index" :label="label" 
						:h="card.totalHeight"
						:pct="index/card.scales.light.length" />
				</div>
			</div>

			<div class="inverse">

				<div class="subtitle">{{card.number}}</div>
				
				<div class="label-shadow label-section">
					<card-label v-for="(label,index) in card.scales.shadow" 
						:key="index" :label="label" 
						:h="card.totalHeight"
						:pct="index/card.scales.shadow.length" />
				</div>
			</div>



		</div>
	`,
	methods: {
		save() {
			console.log("SAVE", this.$el)
			save(this.$el, `card-${mode}-` + camelize(this.card.name))
		}
	},
	computed: {
		mode() {
			return mode
		},
		cardStyle() {
			return {
				// backgroundColor: mode==="light"?"white":"black",
				fontSize: 1*(cardSize*.10) + "px",
				width: cardSize + "px",
				height:  cardSize*cardAspect + "px",
			}
		},
		suiteImg() {
			return this.card.suit.toLowerCase() + '.svg'
		},

	},


	props: ["card"]
})


function getFontWidth(s) {
	// var fontSize = 12;
	// var test = document.getElementById("test");
	// test.innerHTML = s
	// test.style.fontSize = fontSize;
	// var height = (test.clientHeight + 1) + "px";
	// var width = (test.clientWidth + 1) + "px"
	// console.log(s, width, height)


	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.font = "30px Arial";
	var txt = s
	let dim = ctx.measureText(txt)
	return dim.width
}

function save(el, filename) {
	
	// el.innerHTML = "I'm an image now."

	domtoimage.toBlob(el)
	.then(function(blob) {
		window.saveAs(blob, filename + '.png');
	})
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("Tarot!")

	// For each tarot, make a card

	shuffleArray(tarot.cards)
	// tarot.cards = tarot.cards.slice(0, 9)

	tarot.cards.forEach(card => {
	
		card.svg = randomSVG()

		// Calculate the sizes
		card.scales = {
		
		}

		function meaningToScale(s, index, arr) {
			// console.log(index, arr.length)
			let w = Math.max(getFontWidth(s),300)
			return {
				text: s,
				scale: cardSize*2.2/w,
				pct: 300/w
			}
		}


		card.scales.light = card.meanings.light.map(meaningToScale).sort((a,b) => b.scale - a.scale).slice(0,6)
		card.scales.shadow = card.meanings.shadow.map(meaningToScale).sort((a,b) => b.scale - a.scale).slice(0,6)
		
		card.totalHeight = 0

		card.totalHeight = 	card.scales.light.reduce((acc, val)=> acc + val.scale, 0) + 
							card.scales.shadow.reduce((acc, val)=> acc + val.scale, 0)
					
		console.log("HEIGHT", card.totalHeight)
	}) 




	new Vue({
		el: "#output",
		template: `<div id="app">
			<div class="card-holder" v-for="cardData in tarot" >
				<card :card="cardData"  />
			</div>
		</div>`,

		data() {
			return {
				tarot: tarot.cards
			}
		}
		
	})
})	