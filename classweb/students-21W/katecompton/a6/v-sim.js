Vue.component("simulation", {
	template: `
	<div class="simulation">
		Game of Life ({{mode}} mode)
		
		<!-- Draw the grid, and optionally specify the size -->
		<grid-p5 :sim="sim" :size="mode=='emoji'?24:12" />

		<div class="controls">
			<div style="display:inline-block;padding:4px" v-for="power,emoji in sim.emojiPower">{{emoji}}:{{power}}</div>
			
			<div v-if="mode=='continuous'">
				BG radiation<input v-model="sim.backgroundRadiation">
				Life threshold<input v-model="sim.lifeThreshold">
			</div>

			<input v-model="sim.price" type="range" 
				min="0.0" max="1.0" value="0.5" step="0.01" 
				class="slider">
			
			<button class="emoji-button" @click="sim.randomize()">🎲</button>
			<button class="emoji-button" @click="sim.step()">🥾</button>
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