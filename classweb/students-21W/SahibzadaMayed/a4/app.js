// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html

// These get created when P5 is initialized
let SLIDERS = {

}

let FLAGS = {
	drawBugDebug: false,
	drawKatesDebug: false,
	drawRocketDebug: true,
	drawfloatiesDebug: false
}


let drawMode = "bug"

// Pause button, also pause on spacebar
let paused = false
document.onkeyup = function(e){
    if(e.keyCode == 32){
        paused = !paused
    }
}



// Store our two Processing instances in the global scope
// so we can refer to them separately when we want
let mainP5 = undefined
let lightmap = undefined


let simulationWidth = 600
let simulationHeight = 360


// an array of KatesParticles
const katesParticleStartCount = 0
let katesParticles = []


// an object to hold boids
const boidParticlesStartCount = 0
let boidFlock = new BoidFlock()

// Hold some snow ❄️
const floatiesParticleStartCount = 0
let floatiesParticles = []



// Rocket things
const rocketStartCount = 0
let rockets = []
for (var i = 0; i < rocketStartCount; i++) {
	rockets.push(new Rocket())
}

// Initialize bug things
let bugs = []
let bugFood = []
let bugFoodCount = 0
let bugStartCount = 0
for (var i = 0; i < bugFoodCount; i++) {
	let pos = new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
	bugFood.push(pos)
}
for (var i = 0; i< bugStartCount; i++) {
	let pos = [Math.random()*simulationWidth, Math.random()*simulationHeight]
	bugs.push(new Braitenbug(pos))
}


// Moving noise into the global scope so its not attached to P5
let noise = function() {
	console.warn("Noise not yet initialized")
}



// Create a p5 slider, but ALSO, label it and append it to the controls object
function createSlider({label, min,max, defaultValue, step=1}) {
	SLIDERS[label] = mainP5.createSlider(min, max, defaultValue, step)

	let controls = document.getElementById("controls")
	let holder = document.createElement("div");
	holder.className = "slider"
	holder.innerHTML = label

	// Add things to the DOM
	controls.append(holder)
	holder.append(SLIDERS[label].elt)
}

// random point returns a point somewhere in this processing object
function randomPoint(p) {
	return [(Math.random())*p.width, (Math.random())*p.height]
}



// Do setup
document.addEventListener("DOMContentLoaded", function(){
	console.log("Steering")



	// Create the processing instances, and store it in mainP5 and lightmapP5,
	// where we can access it anywhere in the code

	// Having two *separate canvases means we can draw into one and use it in the other

	// Create a new lightmap
	// It holds a red, green and blue channel.  You can draw into it
	lightmap = new Lightmap({
		fadeSpeed: 10, // 0: no fading, 100 instant fade
		drawChannels: function() {

			// A function that calls
			bugFood.forEach(spot => lightmap.drawBlurryLight({
				pt: spot,
				channels: [0, 255, 0],
				intensity: .4,
				size: 1.8
			}))


			bugs.forEach(boid => lightmap.drawBlurryLight({
				pt: boid.position,
				channels: [0, 0, 255],
				intensity: .4,
				size: 1.2
			}))

			boidFlock.boids.forEach(boid => lightmap.drawBlurryLight({
				pt: boid.position,
				channels: [255, 0, 0],
				intensity: .4,
				size: 1.2
			}))
			// boidFlock.boids.forEach(boid => lightmap.drawBlurryLight({
			// 	pt: boid.position,
			// 	channels: [255, 0, 0],
			// 	intensity: 1,
			// 	size: 1
			// }))

		}
	})


	mainP5 = new p5(

		// Run after processing is initialized
		function(p) {

			// Set the noise function to P5's noise
			noise = p.noise

			p.setup = () => {

				// Basic setup tasks
				p.createCanvas(simulationWidth, simulationHeight);
				p.colorMode(p.HSL);
				p.background("white")


				for (var i = 0; i < katesParticleStartCount; i++) {
					let pt = new KateParticle()
					katesParticles.push(pt)
				}


				for (var i = 0; i < floatiesParticleStartCount; i++) {
					let pt = new floatiesParticle()
					floatiesParticles.push(pt)
				}


				// CREATE SLIDERS!!
				createSlider({label:"boidCohesion", min:0, max: 200, defaultValue: 50})
				createSlider({label:"boidAlignment", min:0, max: 200, defaultValue: 50})
				createSlider({label:"boidWander", min:0, max: 200, defaultValue: 50})
				createSlider({label:"WindSpeed", min:1, max: 200, defaultValue: 100, step: 15})
				createSlider({label:"Drag", min:.001, max: .1, defaultValue: .014, step: .001})
			
			


			}

			p.mouseClicked = () => {
				let t = p.millis()*.001

				// Processing likes to greedily respond to *all* mouse events,
				// even when outside the canvas
				// This code checks to see if we're *actually* in the P5 window before responding
				// Use this code if you implement dragging, too
				// From https://stackoverflow.com/questions/36767196/check-if-mouse-is-inside-div

				if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
					//Mouse is inside element

					let mousePos = new Vector(p.mouseX, p.mouseY)


					// Make a new boid
					switch(drawMode) {
						case "boid":
							boidFlock.addBoid(mousePos)
							break;
						case "bug":
							bugs.push(new Braitenbug(mousePos))
							break;
						case "floaties":
							floatiesParticles.push(new floatiesParticle(mousePos))
							break;
						case "rocket":
							rockets.push(new Rocket(mousePos))
							break;
					}
				}
			}


			p.draw = () => {
				p.background(210, 70, 60, 1)

				// Not updating the background
				let t = p.millis()*.001
				let dt = p.deltaTime*.001


				//-------------------
				// Kateparticles

				// UPDATE!
				if (!paused) {
					katesParticles.forEach(pt => pt.update(t, dt))
					bugs.forEach(b => b.update(t, dt))
					boidFlock.update(t, dt)
					floatiesParticles.forEach(pt => pt.update(t, dt))
					rockets.forEach(pt => pt.update(t, dt))
				}

				// Draw KatesParticles
				katesParticles.forEach(pt => pt.draw(p))
				if (FLAGS.drawKatesDebug)
					katesParticles.forEach(pt => pt.drawDebug(p))

				// Draw boids
				boidFlock.draw(p)
				if (FLAGS.drawBoidDebug) {
					boidFlock.debugDraw(p)
				}

				// Draw bugs
				if (FLAGS.drawBugDebug) {
					lightmap.debugDraw(p)


					bugs.forEach(b => b.debugDraw(p))
				}

				// Move the food around
				bugFood.forEach((food, index) => {
					food[0] = (3*simulationWidth*noise(t*.001, index))%simulationWidth
					food[1] = (3*simulationHeight*noise(t*.001, index + 100))%simulationHeight
				})

				p.fill(130, 100, 50)
				p.stroke(170, 100, 30)
				bugFood.forEach(food => p.circle(...food, 10))
				bugs.forEach(b => b.draw(p))


				// Draw snow things
				floatiesParticles.forEach(pt => pt.draw(p))
				if (FLAGS.drawfloatiesDebug) {
					debugDrawfloaties(p, t)
				}

				// Draw rockets
				rockets.forEach(rocket => rocket.draw(p, t))
				if (FLAGS.drawRocketDebug) {
					rockets.forEach(rocket => rocket.debugDraw(p))
				}



				//Uncomment for the detail window, if you want it
				// p.fill(0, 0, 100, .8)
				// p.noStroke()
				// p.rect(0, 0, 100, 50)
				// p.fill("black")
				// p.text(drawMode, 5, 10)

			}
		},

	// A place to put the canvas
	document.getElementById("main"));
})
