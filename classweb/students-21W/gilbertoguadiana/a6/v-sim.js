Vue.component("simulation", {
	template: `
	<div class="simulation">

		<!-- Draw the grid, and optionally specify the size -->
		<grid-p5 :sim="sim" :size="30" />

		<div class="controls">

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
