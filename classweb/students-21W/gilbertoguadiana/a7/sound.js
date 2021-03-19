// var audioContext = new (window.AudioContext || window.webkitAudioContext)();
// var analyser = audioContext.createAnalyser();
// let currentBuffer = null;

Vue.component("audio-player", {
	template: `
		<div>

			<div>
				<select v-model="audio.song">
					<option v-for="song in audio.songs">{{song}}</option>
				</select>
			</div>
			<button @click="audio.play()">▶️</button>
			💿:{{audio.isInitialized}}
			<input type="range" min="0" max="1" :step=".001" class="slider" v-model="audio.volume" @change="ev => audio.setVolume()" />

		</div>`,
	watch: {
		"audio.song"() {
			this.audio.play()
		}
	},
	mounted() {
		console.log("audio")
	},
	props: ["audio"]
})


class AudioPlayer {
	constructor() {
		this.isInitialized = false
		this.songPrefix = "../../../shared/music/"
		this.songs = ["203932__aptbr__lofi-guitar.wav",
						"351717__monkeyman535__cool-chill-beat-loop.mp3",
						"403372__emceeciscokid__chiptune-melody.wav",
						// "476920__f-r-a-g-i-l-e__chill-e-piano-riff-3.m4a",
						"546104__balolo__chill-loop.aiff",
						// "556646__srja-gaming__chill-drum-loop.m4a",
						"557815__alittlebitdrunkguy__solar-fi.mp3",
						"Broke For Free - As Colorful As Ever.mp3",
						"Jahzzar - The last ones.mp3",
						"Rolemusic - The Pirate And The Dancer.mp3",
						"Silence Is Sexy - Holiday (instrumental).mp3",
						"purrple-cat-flourish.mp3",
						"Sunsearcher - Brazilian Rhythm.mp3",
						"SONGO 21 - Opening para Songo 21.mp3",
						"Juanitos - Exotica.mp3", "arsonist - Hot salsa trip.mp3"]
		this.song = this.songs[0]

		this.volume = .2

	}

	init() {
		this.dancer = new Dancer();
		// Using an audio object

		this.soundbar = new SoundBar(this.dancer)
		this.isInitialized = true
	}

	setVolume() {
		console.log("Volume:", this.volume)
	}

	toggle() {
		this.dancer.pause()
	}

	play() {
		if (this.dancer)
			this.dancer.pause()

		if (!this.isInitialized) {
			this.init()
		}
		this.a = new Audio();
		this.a.src = this.songPrefix + this.song;
		this.dancer.load(this.a);

		console.log("Play", this.song)
		this.dancer.play()

	}


}

class SoundBar {
 	constructor(dancer) {
 		console.log("Created soundbar!")
 		this.avg = 0
 		this.smoothAvg = 1
 		this.dancer = dancer
 		this.values = []
 		this.smoothValues = []
 		this.count = 40
 		for (var i = 0; i < this.count; i++) {
 			this.values[i] = Math.random()
 			this.smoothValues[i] = Math.random()
 		}
 		this.smoothing = .91
 	}

 	freqByPct(pct) {
 		return Math.floor(50*(pct**1.9))
 	}

 	getAOFValue(index, count, offset=0) {
 		let sum = 0
 		let num = 0

 		let col = Math.floor(this.values.length*index/count)
 		for (var i = 0; i < this.values.length; i++) {
 			if ((i + offset)%(count*3) === index) {
 				sum += Math.min(1, this.smoothValues[i] * .5/this.smoothAvg)

 				num += 1
 			}
 		}
 		if (num > 1)
 			return 1.1*sum/num
 		return 0
 	}
 	getPct(pct) {

 		let sum = 0
 		for (var i = 0; i < this.values.length; i++) {
 			let pct2 = (i/this.values.length)
 			let d = 1 - Math.abs(pct2 - pct)
 			if (d > .9)
 				sum += (d**5)*.14*this.smoothValues[i]
 		}
 		console.log(sum)

 		return Math.min(sum, 1)

 		// let col =
 	}

 	update(t, dt, frame) {
 		this.avg = 0
		let lastFreq = 0
		for (var i = 0; i < this.values.length; i++) {
			let pct = i/this.values.length

			let freq = this.freqByPct(pct)

			// if (frame %100 == 1)
			// 	console.log(i*freq)

			this.values[i] =this.dancer.getFrequency(lastFreq, freq)
			this.values[i] *=  (.03 + pct)*80
			this.values[i] = Math.min(1, this.values[i])
			// this.values[i] *=  10

			this.smoothValues[i] = this.smoothValues[i]*(this.smoothing) + this.values[i]*(1 - this.smoothing)
			// this.smoothValues[i] = Math.min(this.smoothValues[i], 1)

			this.avg += this.smoothValues[i]


			lastFreq = freq
		}
		this.avg /= this.values.length
		this.smoothAvg = this.smoothAvg*.95 + .05*this.avg
		console.log(this.smoothAvg)
 	}

 	draw(p) {

 		//p.circle(0, 0, 400)
 		let count =  this.values.length
 		for (var i = 0; i < count; i++) {
			let pct = i/count
			let x = p.width*pct

			let val = Math.min(1, this.smoothValues[i] * .5/this.smoothAvg)

			p.fill((val*300)%360, 100, 50)
			p.noStroke()
			p.rect(x, p.height, p.width/count, -val*p.height)
			p.fill(0)
			p.text(Math.floor(this.freqByPct(pct)), x, p.height - 4)

		}
 	}
}
