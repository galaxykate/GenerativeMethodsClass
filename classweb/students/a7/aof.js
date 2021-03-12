// An array of floats

let aofCount = 0
class AoF  {
	constructor(labels) {
		this.mode = "none"
		this.idNumber = aofCount++
		this.idColor = [(this.idNumber*39)%360, 100, 50]
		

		this.max = 1
		this.min = 0
		this.labels = labels
		this.values = []
		for (var i = 0; i < labels.length; i++) {
			this.values[i] = Math.random()
		}

		console.log("Created AOF" + this.idNumber + "\n" + this.valuesToLabeledString())
	}

	update(t, dt) {
		for (var i = 0; i < this.values.length; i++) {

			switch(this.mode) {
				case "none":
					break
				case "audio":
					// // No soundbar, no update
					if (app.audio.soundbar) {
					
						let pct = app.audio.soundbar.getAOFValue(i, this.values.length)
						Vue.set(this.values, i, pct)
					
					} else {
						Vue.set(this.values, i, noise(i*50 + 190*this.idNumber))
					}
					break;
				case "wander":
					Vue.set(this.values, i, noise(i*50 + 190*this.idNumber, t))
			}
			
			
		}
	}

	cloneParent(aof, mutationValue=.1) {
		for (var i = 0; i < this.values.length; i++) {
			let val = aof.values[i]

			val += (Math.random()-.5)*mutationValue
			// Clamp to 0, 1
			val = Math.max(0, Math.min(1, val))
			Vue.set(this.values, i, val)
		}
		return this
	}
	

	set(index, val) {
		if (typeof index === String)
			index = this.labels.indexOf(index)
		Vue.set(this.values, index, val)
	}

	setToNoise(t) {
		for (var i = 0; i< this.values.length; i++) {
			let val = noise(this.idNumber*35 + i*100, t)
			Vue.set(this.values, i, val)
		}
	}

	randomize() {
		for (var i = 0; i< this.values.length; i++) {
			Vue.set(this.values, i, Math.random())
		}
	}


	get(index) {
		if (typeof index === "string") {
			index = this.labels.indexOf(index)
		}
		return this.values[index]
	}

	setLabels(labels) {
		Vue.set(this, "labels", labels)
	}

	setValues(vals) {
		console.log("set ", this.idNumber, "to", vals)
		for (var i = 0; i < vals.length; i++) {
			Vue.set(this.values, i, vals[i])
		}
	}

	valuesToString() {
		return ("[" + this.values.map(s => s.toFixed(2)).join(",") + "]")
	}

	valuesToLabeledString() {
		return this.values.map((s,index) => {
			return ("\t" + this.labels[index] + ":").padEnd(20, ' ') + s.toFixed(2)
		}).join("\n")
	}
}



//====================================================================================
// A set of sliders for a single AOF

Vue.component("aof-sliders", {
	template: `<div class="aof-sliders">
		<div class="contrast title" :style="titleStyle">AOF:{{aof.idNumber}}</div>
		<div class="ultradetail">{{aof.mode}}</div>
		<div class="controks">
			<button class="emoji-button" @click="aof.mode='none'">X</button>
			<button class="emoji-button" @click="aof.mode='wander'">⇝</button>
			<button class="emoji-button" @click="aof.mode='audio'">💿</button>
			<button class="emoji-button" @click="aof.randomize()">🎲</button>
		</div>
		<table>
			<tr v-for="(value,valIndex in aof.values">
				<td class="label">{{aof.labels[valIndex]}}</td>
				<td class="slider-cell">
					<div class="slider-val">{{value.toFixed(3)}}</div>
					<input type="range" min="0" max="1" :step=".001" class="slider" :value="value" @input="ev => change(ev, valIndex)" />
				</td>

			</tr>
		</table>
		<input style="width:97%" v-model="aofinput" @keyup.enter='setFromInput'>
	</div>`,

	computed: {
		titleStyle() {
			let c = this.aof.idColor
			return {
				color: `hsla(${c[0]}, ${c[1]}%,${c[2]}%)`
			}
		}
	},
	mounted() {
		this.aofinput = this.aof.valuesToString()
	},
	watch: {
		"aof.values"() {
			this.aofinput = this.aof.valuesToString()
		}
	},
	methods: {
		setFromInput() {
			let val = JSON.parse(this.aofinput)
			this.aof.setValues(val)
		},
		change(ev,  valIndex) {
			let val = parseFloat(ev.target.value)
			this.aof.set(valIndex, val)


		}
	},
	data() {
		return {
			aofinput: ""
		}
	},
	props: ["aof"]
})

