Vue.component("simulation", {
	template: `
	<div class="simulation">
		{{mode}} mode
		
		<grid-p5 :sim="sim"/>
		
    <div v-if="mode=='resilience'">
			Resilience
		</div>

		<div v-if="mode=='group'">
			Group size
		</div>

		<div class="controls">
			<button class="emoji-button" @click="sim.randomize()">🆕</button>
			<button class="emoji-button" @click="sim.step()">➡️</button>
			<button class="emoji-button" @click="sim.isPaused=!sim.isPaused">{{sim.isPaused?"▶️":"⏸"}}</button>
			<input type="radio" id="😄" value="😄" v-model="sim.drawMode">
			<label for="😄">😄</label>
			<input type="radio" id="🤠" value="🤠" v-model="sim.drawMode">
			<label for="🤠">🤠</label>
			<input type="radio" id="😎" value="😎" selected="true" v-model="sim.drawMode">
			<label for="😎">😎</label>
			<span>Draw mode: {{ sim.drawMode }}</span>
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