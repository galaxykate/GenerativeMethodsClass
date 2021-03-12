
const poketypes = [{"name":"Normal","immunes":["Ghost"],"weaknesses":["Rock","Steel"],"strengths":[]},
{"name":"Fire","immunes":[],"weaknesses":["Fire","Water","Rock","Dragon"],"strengths":["Grass","Ice","Bug","Steel"]},
{"name":"Water","immunes":[],"weaknesses":["Water","Grass","Dragon"],"strengths":["Fire","Ground","Rock"]},
{"name":"Electric","immunes":["Ground"],"weaknesses":["Electric","Grass","Dragon"],"strengths":["Water","Flying"]},
{"name":"Grass","immunes":[],"weaknesses":["Fire","Grass","Poison","Flying","Bug","Dragon","Steel"],"strengths":["Water","Ground","Rock"]},
{"name":"Ice","immunes":[],"weaknesses":["Fire","Water","Ice","Steel"],"strengths":["Grass","Ground","Flying","Dragon"]},
{"name":"Fighting","immunes":["Ghost"],"weaknesses":["Poison","Flying","Psychic","Bug","Fairy"],"strengths":["Normal","Ice","Rock","Dark","Steel"]},
{"name":"Poison","immunes":["Steel"],"weaknesses":["Poison","Ground","Rock","Ghost"],"strengths":["Grass","Fairy"]},
{"name":"Ground","immunes":["Flying"],"weaknesses":["Grass","Bug"],"strengths":["Fire","Electric","Poison","Rock","Steel"]},
{"name":"Flying","immunes":[],"weaknesses":["Electric","Rock","Steel"],"strengths":["Grass","Fighting","Bug"]},
{"name":"Psychic","immunes":["Dark"],"weaknesses":["Psychic","Steel"],"strengths":["Fighting","Poison"]},
{"name":"Bug","immunes":[],"weaknesses":["Fire","Fighting","Poison","Flying","Ghost","Steel","Fairy"],"strengths":["Grass","Psychic","Dark"]},
{"name":"Rock","immunes":[],"weaknesses":["Fighting","Ground","Steel"],"strengths":["Fire","Ice","Flying","Bug"]},
{"name":"Ghost","immunes":["Normal"],"weaknesses":["Dark"],"strengths":["Psychic","Ghost"]},
{"name":"Dragon","immunes":["Fairy"],"weaknesses":["Steel"],"strengths":["Dragon"]},
{"name":"Dark","immunes":[],"weaknesses":["Fighting","Dark","Fairy"],"strengths":["Psychic","Ghost"]},
{"name":"Steel","immunes":[],"weaknesses":["Fire","Water","Electric","Steel"],"strengths":["Ice","Rock","Fairy"]},
{"name":"Fairy","immunes":[],"weaknesses":["Fire","Poison","Steel"],"strengths":["Fighting","Dragon","Dark"]}]

let edgeTypes = ["immunes", "weaknesses"]


const FLAGS = {
	drawSpringDebug: true,
	usePattern: false
}

// Pause button, also pause on spacebar
let paused = false
document.onkeyup = function(e){
    if(e.keyCode == 32){
        paused = !paused
    }
}

function toSVG(p) {
	return p.map(s => s.toFixed(2)).join(" ")
}


let simulationWidth = 600
let simulationHeight = 360

let app = {
	draggedParticle: undefined,
	mouseDown: false,
	paused: false,
	springSystem: new SpringSystem(),

	init() {

		fetch("data/review-data.json")
		.then(response => response.json())
		.then(json => {
			console.log("Loaded", Object.keys(json))

			// Find the most GenMeth words

			let count = 0

			function getGenMethRatio(word) {
				let data = json[word]
				ratio = 1000*data.review_freq/data.freq
				return ratio
			}

			let words = Object.keys(json)
			words = words.sort((word0, word1) => {
				return getGenMethRatio(word0) - getGenMethRatio(word1)
			})
			// console.log(words.slice(0, 100))
			// console.log(words.slice(words.length - 100))
			
			
			// // Add a particle for each type
			words = words.slice(words.length - 150).filter(word => {
				let data = json[word]
				return (data.review_freq > 1) && (data.pvec !== undefined && data.vec !== undefined)
			})

			words.forEach(word => {
				let data = json[word]

				// console.log(word, data)
				app.springSystem.add(undefined, word, data)

			})
			app.springSystem.connectAll()
		});


		
		// // Add a particle for each type
		// poketypes.forEach(pt => {
		// 	app.springSystem.add(undefined, pt.name)
		// })

		// // 
		// poketypes.forEach(pt => {
		// 	let start = app.springSystem.particles.filter(p => p.label === pt.name)[0]

		// 	edgeTypes.forEach(et => {
		// 		pt[et].forEach(targetType => {
		// 			// Add edges for each edge type (weakness, etc)
		// 			let end = app.springSystem.particles.filter(p => p.label === targetType)[0]
		// 			app.springSystem.addEdge(start,end, et)
		// 		})

		// 	})
		// })

	},

	draw(p) {
		app.springSystem.draw(p)
	},

	debugDraw(p) {
		// app.springSystem.draw(p)
	},

	update(t, dt, framecount) {
		app.springSystem.update(t, dt, framecount) 
	}
}

// Spring things




// Moving noise into the global scope so its not attached to P5
let noise = function() {
	console.warn("Noise not yet initialized")
}

// Do setup
document.addEventListener("DOMContentLoaded", function(){

	app.init()

	mainP5 = new p5(

		// Run after processing is initialized
		function(p) {

			// Set the noise function to P5's noise
			noise = p.noise

			p.setup = () => {

				// Basic setup tasks
				p.createCanvas(simulationWidth, simulationHeight);
				p.ellipseMode(p.RADIUS)
				p.colorMode(p.HSL)
			}

			p.mousePressed = () => {
				let t = p.millis()*.001

				let mouse = [p.mouseX, p.mouseY]
				console.log("get particle at", mouse)

				app.draggedParticle = app.springSystem.getAt(mouse)
				
			}


			p.mouseDragged = () => {
				let mouse = [p.mouseX, p.mouseY]
				if (app.draggedParticle) {
					app.draggedParticle.position.copy(mouse)
				}
			}

			p.mouseReleased = () => {
				app.draggedParticle = undefined
			}

			p.draw = () => {
				let t = p.millis()*.001

				p.background(210, 70, 60, 1)

				app.update(t, p.deltaTime*.001, p.framecount)

				// Draw springs
				app.draw(p)
				if (FLAGS.drawSpringDebug) {
					app.debugDraw(p)
				}

			}
		},



	// A place to put the canvas
	document.getElementById("main"));
})
