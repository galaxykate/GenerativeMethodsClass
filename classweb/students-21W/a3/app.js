
// Outermost scope, 
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let mode = "thread"
let mousePositions = []

function clearCanvas() {
	myP5.background("white")
}

function rainbowClearCanvas() {
	myP5.background(Math.random()*360, 80, 80)
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("KatePix")

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

			p.mouseDragged = () => {
				let t = p.millis()*.001

				// Save this current mouse position in an array
				// .... but what will you do with an array of vectors?
				mousePositions.push([p.mouseX, p.mouseY])
				

				switch(mode) {
					case "garland":
						let speed = Math.sqrt(p.movedX*p.movedX + p.movedY*p.movedY)

						let allEmoji = ["🌸","🌷","🌹","🌼","🌺","✨","💖"]
						let emojiIndex = Math.floor(Math.random()*allEmoji.length)
						let emoji = allEmoji[emojiIndex]
						
						// Draw the emoji at the mouse
						p.textSize(2*speed + 6)

						// Try out some blend modes
						// p.blendMode(p.MULTIPLY);
						// p.blendMode(p.OVERLAY);
						// p.blendMode(p.SCREEN);
						// p.blendMode(p.DIFFERENCE);

						p.text(emoji, p.mouseX + Math.random()*speed, p.mouseY + Math.random()*speed)
						// Turn back to normal
						p.blendMode(p.BLEND);
						break;

					case "smudge":
						// Draw scattered circles
						p.noStroke()
						p.fill((Math.random()*30 + t*40)%360, 100, 50 + Math.random()*30)
						p.circle(p.mouseX + Math.random()*10, p.mouseY + Math.random()*10, 3 + Math.random())
					
						break;

					case "thread":
						
						// The current vector
						let p0 = [p.mouseX, p.mouseY]

						let hairCycle = t*1
							
						for (var i = 0; i < 10; i++) {
							let hairLength = 10 + 30*Math.random()
							let cp0 = vector.getAddPolar(p0, hairLength, 20*p.noise(hairCycle))
							let cp1 = vector.getAddPolar(cp0, hairLength, 20*p.noise(hairCycle + 10))
							let p1 = vector.getAddPolar(cp1, hairLength, 20*p.noise(hairCycle + 20))
						

							// p.noStroke()
							// p.fill(0)
							// p.circle(...p0, 5)
							// p.circle(...p1, 5)
							// p.fill(150, 100, 40)
							// p.circle(...cp0, 3)
							// p.circle(...cp1, 3)
							// console.log(p0, cp0, cp1, p1)

							p.noFill()
							p.strokeWeight(1 + Math.random())
							// Randomness in the strokes for variety
							p.stroke((t*30)%360, 100, 20+Math.random()*40, Math.random()*.4 + .3)
							p.bezier(...p0, ...cp0, ...cp1, ...p1)
						}
						break;

					case "mountains":
						drawBeziers(p, mousePositions)
						break;
				
					default: 
						console.warn("UNKNOWN TOOL:" + mode)
				}
				
			}

			p.draw = () => {
				// Not updating the background
				let t = p.millis()*.001
	
				// Smear pixels continuously, even when not drawing
				if (mode == "smudge") {
					smearPixels(p)
				}

				// Draw the text box to label the tool (OPTIONAL)
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


// Use the Pixel buffer to "smudge" pixels by 
// linearly interpolating their colors with some other color
function smearPixels(p) {
	// Smear the pixels down from here
	// console.log("smudge2")
	p.loadPixels();

	// Get the current mouse position
	let x = Math.floor(p.mouseX)
	let y = Math.floor(p.mouseY)

	for (var i = 0; i < 10; i++) {
		let x2 = x + i
		
		let lastColor = p.get(x2, y)


		let dripDistance = Math.random()* Math.random()*150
		for (var j = 0; j < dripDistance; j++) {
			let dripPct = j/dripDistance

			let y2 = y + j

			// Get the current color and blend it with the last color
			let pixelColor = p.get(x2, y2)
			let finalColor = vector.lerp(pixelColor, lastColor, 1 - dripPct)
			
			if (x2 > 0 && x2 < p.width && y2 > 0 && y2 < p.height)
				p.set(x2, y2, finalColor)
			
			// Save this color to blend with later pixels
			lastColor = finalColor

		}
	}
	p.updatePixels();
}

// Using a lot of mouse positions to do... something
function drawBeziers(p, mousePositions) {
	// Draw some vectors
	
	// Get every 7th point in the array
	let everyOther = mousePositions.filter((element, index) => {
		return (mousePositions.length - index) % 7 === 0;
	})

	// Take the last N positions
	let count = 2
	let pts = everyOther.slice(everyOther.length - count)

	// Now we have 5 points, sampled every 7th point, starting at the end
	// So we can draw "backward" from the end

	if (pts.length > 0) {
		p.stroke(0)
		p.fill(Math.random()*360, 100, 50, .2)

		p.beginShape()
		p.vertex(...pts[0])
		
		// Draw each segment of a bezier curve 
		// (start at index=1!)
		for (var i = 1; i < pts.length; i++) {
			// For this segment, we draw between 2 pts
			let pt0 = pts[i - 1]
			let pt1 = pts[i]
			let d = vector.getSub(pt1, pt0)
			let mag = vector.magnitude(d)
			let n = [-d[1], d[0]]

			let cp0 = pt0.slice(0)
			let cp1 = pt1.slice(0)
			cp0[1] -= mag
			cp1[1] -= mag
			
			// vector.addTo(cp1, n)


			p.bezierVertex(...cp0, ...cp1, ...pt1)
		}

		p.endShape()
	}
}
