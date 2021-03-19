
// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let mode = "mandala"
let mousePositions = []
let mandalaCounter = 0
let MAXMANDALA = 3

function clearCanvas() {
	myP5.background("white")
}

function rainbowClearCanvas() {
	myP5.background(Math.random()*360, 85, 80)
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("GilbertoPix")

	// Add a processing instance

	// Create the processing instance, and store it in myP5,
	// where we can access it anywhere in the code
	let element = document.getElementById("main")
	myP5 = new p5(

		// Run after processing is initialized
		function(p) {

			p.setup = () => {

				console.log("Do setup", p)

				p.createCanvas(300, 300);
				p.colorMode(p.HSL);

				// Hue, Sat, Light
				// (0-360,0-100,0-100)
				p.background("white")


			}

			p.mouseReleased = () => {
				// changes the number of sides that the mandala tool uses
				mandalaCounter = (mandalaCounter + 1) % MAXMANDALA;
			}

			p.mouseDragged = () => {
				let t = p.millis()*.001


				// Save this current mouse position in an array with origin in center
				mousePositions.push([p.mouseX-p.width/2, p.mouseY-p.height/2])

				switch(mode) {
					// traces strokes in a number of sides based on the mandala counter
					case "mandala":
						let numSides = mandalaCounter + 3;
						// console.log(numSides)

						p.push();
						p.translate(p.width/2,p.height/2)
						p.fill(2,82,53);

						for(var i = 0; i < numSides; i++){
							// rotate to give pseudo-symmetry
							p.rotate(1*Math.PI/numSides*i);
							if(mousePositions.length>8){
								// use triangles to draw strokes from user
								p.beginShape()
								p.vertex(...(mousePositions[mousePositions.length-1]))
								p.vertex(...(mousePositions[mousePositions.length-4]))
								p.vertex(...(mousePositions[mousePositions.length-8]))
								p.endShape()
							}
						}
						p.pop();
						break;

					case "spray":
						// spray pixels to color at mouse position
						p.loadPixels();
						// Get the current mouse position
						let x = Math.floor(p.mouseX)
						let y = Math.floor(p.mouseY)
						let currentColor = p.get(x, y)
						let xstep = 70
						let ystep = 50
						// blend to blue color
						let blendColor = [161,181,247,255]
						let newColor = vector.lerp(currentColor, blendColor, 0.1)
						for(var j = 0; j<xstep; j++){
							let x2 = x + j;
							// skip between every 4 and 7 pixels
							if(x2 % (4+Math.floor(3*Math.random())) == 0){
								continue;
							}

							for(var k = 0; k<ystep; k++){
								let y2 = y+k;
								// skip between every 3 and 5 pixels
								if(y2 % (3+Math.floor(2*Math.random())) == 0){
									continue;
								}
								currentColor = p.get(x2,y)
								newColor = vector.lerp(currentColor, blendColor, 0.1)
								p.set(x2, y2, newColor)
							}
						}
						p.updatePixels();

						break;

					case "anchor":

						// The current vector
						let p0 = [p.mouseX, p.mouseY]
						p.fill(176,82,53)
						p.circle(...p0,10)
						// start right above the circle
						p0[0] += 5

						// get 3 random positions
						let randPosn = []
						for(var i = 0; i<3; i++){
							randPosn.push([100*Math.random(),100*Math.random()])
						}
						let cp0 = vector.getAdd(p0,randPosn[0])
						let cp1 = vector.getAdd(cp0, randPosn[1])
						let p1 = vector.getAdd(p0,randPosn[2]);
						p.noFill()
						p.stroke("black")
						p.bezier(...p0, ...cp0, ...cp1, ...p1)

						break;

					default:
						console.warn("UNKNOWN TOOL:" + mode)
				}

			}

			p.draw = () => {
				// Not updating the background
				let t = p.millis()*.001

				// Smear pixels continuously, even when not drawing
				// if (mode == "smudge") {
				// 	smearPixels(p)
				// }

				// Draw the text box to label the tool
				p.noStroke()
				p.fill("white")
				p.rect(0, 0, 90, 30)
				p.fill("black")
				p.textSize(10)
				p.text("TOOL " + mode, 5, 20)


			}
		},

		// A place to put the canvas
		element);
})
