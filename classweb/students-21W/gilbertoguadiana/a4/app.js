
// Object for holding UI Control Sliders
let SLIDERS = {};

// Object for holding boolean values
let FLAGS = {
paused: false,

drawModeDebug: true,

runnerDebug: false,
meatDebug: false,
shootingStarDebug: false,
};

// Allow the spacebar to invert paused flag
document.onkeyup = function(e){
    if(e.keyCode == 32){
        FLAGS.paused = !FLAGS.paused;
    }
}

let mainP5 = undefined
let lightmap = undefined

// set p5 canvas dimensions
let simulationWidth = 600
let simulationHeight = 360

// Initialize drawing mode
let drawMode = "runner"

// Initialize runners
let runners = [];
let runnerStartupCount = 2;

for (var i = 0; i< runnerStartupCount; i++) {
	let pos = [Math.random()*simulationWidth, 2/3*simulationHeight]
	runners.push(new Runner(pos))
}

// initialize meat
let meats = [];
let meatStartupCount = 0;

for (var i = 0; i < meatStartupCount; i++) {
  let piece = new Meat()
  meats.push(piece)
}

// initialize meat
let shootingStars = [];
let shootingStarsStartupCount = 0;

for (var i = 0; i < shootingStarsStartupCount; i++) {
  let piece = new ShootingStar()
  shootingStars.push(piece)
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
	// Create the processing instances, and store it in mainP5 and lightmapP5,
	// where we can access it anywhere in the code

	// Having two *separate canvases means we can draw into one and use it in the other

	// Create a new lightmap
	// It holds a red, green and blue channel. You can draw into it
	lightmap = new Lightmap({
		fadeSpeed: 10, // 0: no fading, 100 instant fade
		drawChannels: function() { // draw onto the lightmap;

      meats.forEach(meat => lightmap.drawBlurryLight({
				pt: meat.position,
				channels: [0, 255, 0],
				intensity: .4,
				size: 1.2
			}))

      shootingStars.forEach(star => lightmap.drawBlurryLight({
				pt: star.position,
				channels: [255, 0, 0],
				intensity: .4,
				size: 1.5
			}))

		}
	})

	mainP5 = new p5(
		// Run after processing is initialized
		function(p) {
			// Set the noise function to P5's noise (gives global scope)
			noise = p.noise

			p.setup = () => {

				// Basic setup tasks
				p.createCanvas(simulationWidth, simulationHeight);
				p.colorMode(p.HSL);
				p.background(149, 71, 64, 1)

				// create sliders
				createSlider({label:"shootingStarDriveForce", min:1, max: 5, defaultValue: 1, step: .5})
				createSlider({label:"runnerDriveForce", min:1, max: 5, defaultValue: 1, step: .5})
        createSlider({label:"meatDriveForce", min:1, max: 5, defaultValue: 1, step: .5})
			}

			p.mouseClicked = () => {
				let t = p.millis()*.001

				// This code checks to see if we're *actually* in the P5 window before responding
				// From https://stackoverflow.com/questions/36767196/check-if-mouse-is-inside-div

				if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
					//Mouse is inside element

					let mousePos = new Vector(p.mouseX, p.mouseY)

					// Make a new particle
					switch(drawMode) {
						case "runner":
							runners.push(new Runner(mousePos))
							break;
            case "meat":
              meats.push(new Meat(mousePos))
              break;
            case "shootingStar":
              shootingStars.push(new ShootingStar(mousePos))
              break;
					}
				}
			}

			p.draw = () => {
				p.background(149, 71, 64, 1)

				// Not updating the background
				let t = p.millis()*.001
				let dt = p.deltaTime*.001

				// update if not paused
				if (!FLAGS.paused) {
					runners.forEach(b => b.update(t, dt))
          meats.forEach(b => b.update(t, dt))
          shootingStars.forEach(b => b.update(t, dt))
				}

				// Draw runners
				if (FLAGS.runnerDebug) {
					lightmap.debugDraw(p)
          runners.forEach(b => b.debugDraw(p))
				}

        if (FLAGS.shootingStarDebug) {
          shootingStars.forEach(b => b.debugDraw(p))
        }

        if (FLAGS.meatDebug) {
          meats.forEach(b => b.debugDraw(p,t))
        }

				runners.forEach(b => b.draw(p))
        meats.forEach(b => b.draw(p))
        shootingStars.forEach(b => b.draw(p))

        // code for writing drawMode at the top
        if (FLAGS.drawModeDebug){
          p.noStroke()
          p.fill("white")
          p.rect(0, 0, 120, 30)
          p.fill("black")
          p.textSize(10)
          p.text("Deploy " + drawMode, 5, 20)
        }


			}
		},

	// A place to put the canvas
	document.getElementById("main"));
})
