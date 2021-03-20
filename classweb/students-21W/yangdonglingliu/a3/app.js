// Outermost scope, 
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined;
let mode = 'pen';
let mousePositions = [];

function clearCanvas() {
	myP5.background("white")
}

function rainbowClearCanvas() {
	myP5.background(Math.random()*360, 80, 80)
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("Dawning's Drawing Tool")
	
	// Add a processing instance

	// Create the processing instance, and store it in myP5, 
	// where we can access it anywhere in the code
	let element = document.getElementById("main")
	myP5 = new p5(

		// Run after processing is initialized
		function(p) {
			//let bkgdColorPicker;
			let colorPicker;
			//let sizeSlider;
			
			p.setup = () => {

				console.log("Do setup", p)

				p.createCanvas(300, 300);
				// bkgdColorPicker = p.createColorPicker();
				// bkgdColorPicker.position(20, 450)
				colorPicker = p.createColorPicker();
				colorPicker.position(250, 470)
				
				// next step: add a size slider for each tool
				//sizeSlider = p.createSlider()
				
				// failed attempt to change background color based on colorpicker
				// let clearBtn = p.createButton("Clear");
				// clearBtn.mousePressed(clearCanvas(p, bkgdColorPicker));

				// Hue, Sat, Light
				// (0-360,0-100,0-100)
				p.colorMode(p.HSL);
				p.background("white")

			}

			p.mouseDragged = () => {
				let t = p.millis()*.001

				// Save this current mouse position in an array
				// .... but what will you do with an array of vectors?
				mousePositions.push([p.mouseX, p.mouseY])

				let w = p.width
				let h = p.height

				switch(mode) {
					// Didn't get this case to work yet
					// The lines are not really smoothed
					// case "smooth lines":
					// 	let prevX = 0
					// 	let prevY = 0
					// 	let currX = 0
					// 	let currY = 0
					// 	let easing = 0.05

					// 	function mouseClicked() {
					// 		prevX = p.mouseX
					// 		prevY = p.mouseY
					// 		currX = p.mouseX
					// 		currY = p.mouseY
					// 	}

					// 	mouseClicked()

					// 	let targetX = p.mouseX
					// 	let targetY = p.mouseY

					// 	currX += (targetX - currX) * easing
					// 	currY += (targetY - currY) * easing

					// 	//let weight = p.dist(currX, currY, prevX, prevY)
					// 	p.strokeWeight(5)
					// 	p.stroke(0)
					// 	p.line(currX, currY, prevX, prevY)
					// 	prevX = currX
					// 	prevY = currY

					// 	break;

					case "pen":
						// thick when moving slowly, thin when moving fast
						let distance = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
						p.strokeWeight(7/distance)
						p.stroke(colorPicker.value())
						p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)

						break;

					case "symmetry":
						// simply add 4-fold symmetry to pen tool 
						let weight = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
						p.strokeWeight(7/weight)
						p.stroke(colorPicker.value())
						p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
						p.line(w-p.mouseX, p.mouseY, w-p.pmouseX, p.pmouseY)
						p.line(p.mouseX, h-p.mouseY, p.pmouseX, h-p.pmouseY)
						p.line(w-p.mouseX, h-p.mouseY, w-p.pmouseX, h-p.pmouseY)

						break;
					// case "garland":
					// 	let speed = Math.sqrt(p.movedX*p.movedX + p.movedY*p.movedY)

					// 	let allEmoji = ["🌸","🌷","🌹","🌼","🌺","✨","💖"]
					// 	let emojiIndex = Math.floor(Math.random()*allEmoji.length)
					// 	let emoji = allEmoji[emojiIndex]
						
					// 	// Draw the emoji at the mouse
					// 	p.textSize(2*speed + 6)

					// 	// Try out some blend modes
					// 	// p.blendMode(p.MULTIPLY);
					// 	// p.blendMode(p.OVERLAY);
					// 	// p.blendMode(p.SCREEN);
					// 	// p.blendMode(p.DIFFERENCE);

					// 	p.text(emoji, p.mouseX + Math.random()*speed, p.mouseY + Math.random()*speed)
					// 	// Turn back to normal
					// 	p.blendMode(p.BLEND);
					// 	break;

					// case "scattered dots":
					// 	// Draw scattered circles
					// 	p.noStroke()
					// 	p.fill((Math.random()*30 + t*40)%360, 100, 50 + Math.random()*30)
					// 	p.circle(p.mouseX + Math.random()*10, p.mouseY + Math.random()*10, 3 + Math.random())
					
					// 	break;

					case "bubbles":
						p.noStroke()
						
						let bubbleColor = p.color(colorPicker.value())
						//bubbleColor.setAlpha(0.3)
						let hue = p.hue(bubbleColor)
						let saturation = p.saturation(bubbleColor)
						let lightness = p.lightness(bubbleColor)
						//console.log(hue)
						
						// randomly pick hue, saturation, and lightness around the picked color
						// to make a colorful and good looking collection of bubbles
						p.fill((hue + Math.random()*100-50)%360, (saturation + Math.random()*40-20)%100, (lightness+ Math.random()*40-20)%100, 0.3)
						p.circle(p.mouseX + Math.random()*20-10, p.mouseY + Math.random()*20-10, 5 + Math.random()*10)

						break;
					
					case "fluffy":

						p.loadPixels();

						// Get the current mouse position
						let x = Math.floor(p.mouseX)
						let y = Math.floor(p.mouseY)

						let fluffyColor = p.color(colorPicker.value())
						let fluffyRed = p.red(fluffyColor)
						let fluffyGreen = p.green(fluffyColor)
						let fluffyBlue = p.blue(fluffyColor)
						let finalColor = [(fluffyRed + Math.random()*100-50)%255, (fluffyGreen + Math.random()*40-20)%255, (fluffyBlue+ Math.random()*40-20)%255, 200]

						if (x > 0 && x < p.width && y > 0 && y < p.height) {
							
							// first loop over angles
							for (var theta = 0; theta<Math.PI*2; theta += Math.PI/10) {

								let splashRadius = Math.random()*20 + 10
								
								// then loop over the pixels along each random radius
								for (var r = 1; r < splashRadius; r++) {
									//let smearPct = r / smearRadius
									
									currX = x + r*Math.cos(theta)
									currY = y + r*Math.sin(theta)

									if (currX > 0 && currX < p.width && currY > 0 && currY < p.height) {
										p.set(currX, currY, finalColor)
									}

								}
							}
						}

						p.updatePixels();

						break;

					// case "thread":
						
					// 	// The current vector
					// 	let p0 = [p.mouseX, p.mouseY]

					// 	let hairCycle = t*1
							
					// 	for (var i = 0; i < 10; i++) {
					// 		let hairLength = 10 + 30*Math.random()
					// 		let cp0 = vector.getAddPolar(p0, hairLength, 20*p.noise(hairCycle))
					// 		let cp1 = vector.getAddPolar(cp0, hairLength, 20*p.noise(hairCycle + 10))
					// 		let p1 = vector.getAddPolar(cp1, hairLength, 20*p.noise(hairCycle + 20))
						

					// 		p.noFill()
					// 		p.strokeWeight(1 + Math.random())
					// 		// Randomness in the strokes for variety
					// 		p.stroke((t*30)%360, 100, 20+Math.random()*40, Math.random()*.4 + .3)
					// 		p.bezier(...p0, ...cp0, ...cp1, ...p1)
					// 	}
					// 	break;

					case "grass":
						
						let numOfGrass = Math.floor(Math.random()*5)+1
						
						for (var i=0; i<numOfGrass; i++) {
							let grassHeight = Math.random()*30 + 10

							let p0 = [p.mouseX, p.mouseY]
							let cp0 = [p.mouseX + Math.random()*10-5, p.mouseY - grassHeight*Math.random()*0.3+0.2]
							let cp1 = [p.mouseX + Math.random()*10-5, p.mouseY - grassHeight*Math.random()*0.3+0.5]
							let p1 = [p.mouseX + Math.random()*10-5, p.mouseY - grassHeight]

							p.noFill()
							p.strokeWeight(1 + Math.random())
							// Randomness in the strokes for variety
							//p.stroke((t*30)%360, 100, 20+Math.random()*40, Math.random()*.4 + .3)

							let grassColor = p.color(colorPicker.value())
							let grassHue = p.hue(grassColor)
							let grassSaturation = p.saturation(grassColor)
							let grassLightness = p.lightness(grassColor)
							p.stroke((grassHue + Math.random()*100-50)%360, (grassSaturation + Math.random()*40-20)%100, (grassLightness+ Math.random()*40-20)%100, 0.8)
							p.bezier(...p0, ...cp0, ...cp1, ...p1)
						}
						break;

					// case "mountains":
					// 	drawBeziers(p, mousePositions)
					// 	break;


					case "blur":
						smearPixels(p)
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

				// Draw the text box to label the tool (OPTIONAL)
				p.noStroke()
				p.fill("white")
				p.rect(0, 0, 90, 20)
				p.fill("black")
				p.textSize(12)
				p.textAlign(p.CENTER)
				p.text(`Tool "${mode}"`, 45, 13)
					
					
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

	if (x > 0 && x < p.width && y > 0 && y < p.height) {
		
		// first loop over angles
		for (var theta = 0; theta<Math.PI*2; theta += Math.PI/10) {
			let lastColor = p.get(x, y)

			let smearRadius = Math.random()*10 + 5
			
			// then loop over the pixels along each random radius
			for (var r = 1; r < smearRadius; r++) {
				//let smearPct = r / smearRadius
				
				currX = x + r*Math.cos(theta)
				currY = y + r*Math.sin(theta)
				let currColor = p.get(currX, currY)
				let finalColor = vector.lerp(currColor, lastColor, 0.3)

				if (currX > 0 && currX < p.width && currY > 0 && currY < p.height) {
					// reduce the alpha value to mimic smudging effect
					p.set(currX, currY, [finalColor[0], finalColor[1], finalColor[2], 200])
				}

				lastColor = finalColor
				
			}
			
		}
	}

	// for (var i = 0; i < 10; i++) {
	// 	let x2 = x + i
		
	// 	let lastColor = p.get(x2, y)


	// 	let dripDistance = Math.random()* Math.random()*150
	// 	for (var j = 0; j < dripDistance; j++) {
	// 		let dripPct = j/dripDistance

	// 		let y2 = y + j

	// 		// Get the current color and blend it with the last color
	// 		let pixelColor = p.get(x2, y2)
	// 		let finalColor = vector.lerp(pixelColor, lastColor, 1 - dripPct)
			
	// 		if (x2 > 0 && x2 < p.width && y2 > 0 && y2 < p.height)
	// 			p.set(x2, y2, finalColor)
			
	// 		// Save this color to blend with later pixels
	// 		lastColor = finalColor

	// 	}
	// }


	p.updatePixels();
}

// Using a lot of mouse positions to do... something
// function drawBeziers(p, mousePositions) {
// 	// Draw some vectors
	
// 	// Get every 7th point in the array
// 	let everyOther = mousePositions.filter((element, index) => {
// 		return (mousePositions.length - index) % 7 === 0;
// 	})

// 	// Take the last N positions
// 	let count = 2
// 	let pts = everyOther.slice(everyOther.length - count)

// 	// Now we have 5 points, sampled every 7th point, starting at the end
// 	// So we can draw "backward" from the end

// 	if (pts.length > 0) {
// 		p.stroke(0)
// 		p.fill(Math.random()*360, 100, 50, .2)

// 		p.beginShape()
// 		p.vertex(...pts[0])
		
// 		// Draw each segment of a bezier curve 
// 		// (start at index=1!)
// 		for (var i = 1; i < pts.length; i++) {
// 			// For this segment, we draw between 2 pts
// 			let pt0 = pts[i - 1]
// 			let pt1 = pts[i]
// 			let d = vector.getSub(pt1, pt0)
// 			let mag = vector.magnitude(d)
// 			let n = [-d[1], d[0]]

// 			let cp0 = pt0.slice(0)
// 			let cp1 = pt1.slice(0)
// 			cp0[1] -= mag
// 			cp1[1] -= mag
			
// 			// vector.addTo(cp1, n)


// 			p.bezierVertex(...cp0, ...cp1, ...pt1)
// 		}

// 		p.endShape()
// 	}
// }

// failed attempts to write a standalone function to change background color based on colorpicker:
// function clearCanvas(p, colorPicker) {
// 	p.background(colorPicker.color())
// }
//document.getElementById('clear').onclick = clearCanvas(myP5);