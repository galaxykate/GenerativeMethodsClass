Vue.component("simulation", {
	template: `
	<div class="simulation">
		Fashion Spread ({{mode}})
		
		<!-- Draw the grid, and optionally specify the size -->
		<grid-p5 :sim="sim" :size="12" />

		<div class="controls">

			<div class="sliders" v-if="mode=='with fixed budget'">
			<label for="price1">Price</label>
			<input v-model="sim.price1" type="range" id="price1" min="0" max="1.0" value="0.5" step="0.01"> 
			</div>

			<div class="sliders" v-if="mode=='with advocacy/criticism'">
			<label for="price2">Price</label>
			<input v-model="sim.price2" type="range" id="price2" min="0" max="1.0" value="0.5" step="0.1"> 

			<label for="quality">Quality</label>
			<input v-model="sim.quality" type="range" id="quality" min="-0.2" max="0.2" value="0" step="0.01"> 
			</div>

			<button class="emoji-button" @click="sim.randomize()">🎲</button>
			<button class="emoji-button" @click="sim.step()">➡️</button>
			<button class="emoji-button" @click="sim.isPaused=!sim.isPaused">{{sim.isPaused?"▶️":"⏸"}}</button>
		</div>
	</div>
	`,
	mounted() {

		// Handle updating this simulation
		let count = 0
		setInterval(() => {
			if (count < 50000 && !this.sim.isPaused ) {

				this.sim.step()
			}
			count++
		}, 400)
	},
	
	props:["mode"],

	data() {
		return {
			sim: new Simulation(this.mode)
		}
	}


})