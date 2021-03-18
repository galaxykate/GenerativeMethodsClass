Vue.component("simulation", {
	template: `
	<div class="simulation">
		Liquid Fun
		
		<!-- Draw the grid, and optionally specify the size -->
		<grid-p5 :sim="sim" :size="12" />
		<div class="controls">
			<div style="display:inline-block;padding:4px" v-for="power,emoji in sim.emojiPower">{{emoji}}:{{power}}</div>
			
			<div v-if="mode=='continuous'">
				Bonding Strength <input v-model="sim.backgroundRadiation">
			</div>
			
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
