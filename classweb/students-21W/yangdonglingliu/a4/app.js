// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html

// These get created when P5 is initialized
let COLORPICKER = {

}

let SLIDERS = {

}

let FLAGS = {
    curvesDebug: false,
    bubblesDebug: false,
    boidsDebug: false
}

let drawMode = "bubbles"

// Pause button, also pause on spacebar
let paused = false

// Store our two Processing instances in the global scope
// so we can refer to them separately when we want
let mainP5 = undefined


let simulationWidth = 600
let simulationHeight = 400

function clearCanvas() {
	mainP5.background(0)
}

// an array of bubbles
const bubblesStartCount = 20
let bubbles = []

// an object to hold boids
const boidStartCount = 10

let fieryBoidFlock = new BoidFlock("fiery")
let oceanicBoidFlock = new BoidFlock("oceanic")

// Curves
let curveSystem = new CurveSystem()


// Moving noise into the global scope so its not attached to P5
let noise = function() {
	console.warn("Noise not yet initialized")
}


// Create a p5 color picker, but ALSO, label it and append it to the tools object
function createColorPicker({label, defaultValue}) {
	COLORPICKER[label] = mainP5.createColorPicker(defaultValue)

	let controls = document.querySelector(".controls")
	let holder = document.createElement("div");
	holder.className = "colorpicker"
	holder.innerHTML = label

	// Add things to the DOM
	controls.append(holder)
    holder.append(COLORPICKER[label].elt)
}

// Create a p5 slider, but ALSO, label it and append it to the tools object
function createSlider({label, min,max, defaultValue, step=1}) {
	SLIDERS[label] = mainP5.createSlider(min, max, defaultValue, step)

	let controls = document.querySelector(".controls")
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
document.addEventListener("DOMContentLoaded", function() {
	console.log("Steering")


	// Create the processing instance, and store it in mainP5 
	// where we can access it anywhere in the code

	mainP5 = new p5(

		// Run after processing is initialized
		function(p) {

			// Set the noise function to P5's noise
			noise = p.noise

			p.setup = () => {

				// Basic setup tasks
				p.createCanvas(simulationWidth, simulationHeight);
				p.colorMode(p.HSL);
				p.background(0)


				for (var i = 0; i < bubblesStartCount; i++) {
					let bb = new Bubble()
                    bubbles.push(bb)
                }

                // Create a color picker
                createColorPicker({label:"colorPicker", defaultValue:'#118ab2'});

				// CREATE SLIDERS!!
				
				createSlider({label:"curvesWiggleForce", min: 1, max: 4, defaultValue: 2, step: 0.5})
				createSlider({label:"windStrength", min: 2000, max: 5000, defaultValue: 3000, step: 200})
				createSlider({label:"buoyancy", min: 5, max: 80, defaultValue: 20, step: 15})
                // createSlider({label:"drag", min: 0.001, max: 0.1, defaultValue: 0.015, step: 0.001})
                
                createSlider({label:"fieryBoidCohesion", min: 100, max: 200, defaultValue: 150, step: 10})
                // createSlider({label:"fieryBoidSeparation", min: 10, max: 50, defaultValue: 30, step: 5})
                // createSlider({label:"fieryBoidAlignment", min: 0.5, max: 0.8, defaultValue: 0.6, step: 0.05})
                createSlider({label:"fieryBoidWander", min: 5, max: 25, defaultValue: 20, step: 2.5})

                createSlider({label:"oceanicBoidCohesion", min: 0, max: 100, defaultValue: 40, step: 10})
                // createSlider({label:"oceanicBoidSeparation", min: 50, max: 100, defaultValue: 80, step: 5})
                // createSlider({label:"oceanicBoidAlignment", min: 0.1, max: 0.5, defaultValue: 0.3, step: 0.05})
                createSlider({label:"oceanicBoidWander", min: 20, max: 50, defaultValue: 30, step: 3})


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
                    
                    let colorPicked = p.color(COLORPICKER.colorPicker.value())
                    let hue = p.hue(colorPicked)
                    let saturation = p.saturation(colorPicked)
                    let lightness = p.lightness(colorPicked)
                        
                    let colorDrawn = [(hue + Math.random()*70-50)%360, (saturation + Math.random()*40-20)%100, Math.min(100, lightness+ Math.random()*20-10)]
                    //console.log(colorDrawn)

					// Make a new thing
					switch(drawMode) {

						case "bubbles":
                            bubbles.push(new Bubble(mousePos, ...colorDrawn))
							break;
						case "curves":
							curveSystem.addPoint(mousePos, ...colorDrawn)
                            break;
                        case "fieryBoids":
                            fieryBoidFlock.addBoid("fiery", mousePos)
                            break;
                        case "oceanicBoids":
                            oceanicBoidFlock.addBoid("oceanic", mousePos)
                            break;
                        default: 
                            console.warn("UNKNOWN TOOL:" + drawMode)
	
					}
				}
			}


			p.draw = () => {
                //p.background("#f9c74f")
                p.background(0)

				// Not updating the background
				let t = p.millis()*.001
				let dt = p.deltaTime*.001

				// UPDATE!
				if (!paused) {
					bubbles.forEach(bb => bb.update(t, dt))
                    curveSystem.update(t, dt)
                    fieryBoidFlock.update(t, dt)
                    oceanicBoidFlock.update(t, dt)
				}
				
				// Draw bubbles and debug
                bubbles.forEach(bb => bb.draw(p))

				if (FLAGS.bubblesDebug) {
					debugDrawBubbles(p, t)
				}

				// Draw curve system and debug
                curveSystem.draw(p)
                
				if (FLAGS.curvesDebug) {
					curveSystem.debugDraw(p)
				}

                // Draw boids and debug
                fieryBoidFlock.draw(p)
                oceanicBoidFlock.draw(p)

				if (FLAGS.boidsDebug) {
                    fieryBoidFlock.debugDraw(p)
                    oceanicBoidFlock.debugDraw(p)
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
