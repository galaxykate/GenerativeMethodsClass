

// JS obj
let pirateGame = {
	ships: [{
		name: "the Marybelle",
		type: "sloop"
	}, 
	{
		name: "the Skullnbones",
		type: "sloop"
	},{
		name: "the Deathhead",
		type: "sloop"
	}],
	xp: 0,
	hp: 100,
	gp: 0,
	rum: 0
}


function getRandom(arr) {
	let index = Math.floor(Math.random()*arr.length)
	return arr[index]
}

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function(){
	console.log("Hello, Vue!")

	// Make a new Vue object in charge of "#mainapp"
	new Vue({
		el: "#mainapp",
		template: `<div class="polaroid">
			HELLO {{title}}

			<div>
				<input v-model="flag"></input>
				<div class="title">{{game.gp}}💎</div>
				<div class="title">{{rumDisplay}}</div>
				

				<div v-for="ship in game.ships" class="polaroid" :class="{flagship:ship == flagShip}">
					<div class="flag" v-if="ship==flagShip">{{flag}}</div>
					<div class="title">{{ship.name}}</div>
					<div class="subtitle">{{ship.type}}</div>
					<button @click="setAsFlagship(ship)">set as flagship</button>
				</div>


				<button @click="buyRum" v-if="game.gp>=10" >Buy 💎10 of rum</button>
				<button @click="buyShip" v-if="game.gp>=10" >Buy a boat</button>
				
			</div>


		</div>`,

		methods: {
			setAsFlagship(ship) {
				console.log("Set flagship to", ship.name)
				this.flagShip = ship
			},
			buyRum() {
				console.log("you buy rum")
				this.game.gp -= 10
				this.game.rum += 1
			},
			buyShip() {
				// Create a new ship
				let shipName = "The " + getRandom(animals)
				let ship = {
					name: shipName,
					type: "sloop"
				}
				this.game.ships.push(ship)
			}
		},


		computed: {
			rumDisplay() {
				let s = ""
				for (var i = 0; i < this.game.rum; i++) {
					s += "🍾"; 
				}
				return s
			}
		},

		mounted() {
			console.log("Vue element is loaded!")

			this.flagShip = this.game.ships[0]
			console.log("My flagship is", this.flagShip)
			// Interval: do something every n secondsname)

			setInterval(function() {
				// console.log("Hello, you have " + pirateGame.gp + "💎")
				pirateGame.gp += 1
				// console.log(pirateGame)
			}, 100)


		
		},

		data: function() {
			return {
				flag: "☠️",
				flagShip: undefined,
				title: "Pirates",
				game: pirateGame
			}
		}
	})
});


