// https://stackoverflow.com/questions/38499211/get-normal-of-bezier-curve-in-2d
// DeCasteljau

//P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4


// Outermost scope, 
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let debugDraw = true
let mousePositions = []



let wallpaperURL = "cat1.png"

function applyWallpaper() {
	console.log("wallpaper")

	let body = document.getElementsByTagName("body")[0]
	body.style.backgroundImage = `url(${wallpaperURL})`
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("Curve demo")

	
	function randPoint(p) {
		return[p.width*Math.random(), p.height*Math.random()]
	}
	
	let pts = []



	// Create the processing instance, and store it in myP5, 
	// where we can access it anywhere in the code
	let element = document.getElementById("main")
	myP5 = new p5(

		// Run after processing is initialized
		function(p) {
			p.setup = () => {

				console.log("Do setup", p)

				p.createCanvas(100, 100);
				p.colorMode(p.HSL);
				
				// Hue, Sat, Light
				// (0-360,0-100,0-100)
				p.background("white")


				for (var i = 0; i < 30; i++) {
					let pt = randPoint(p)
					let h = Math.random()*360
					p.fill(h, 100, 40 + 20*Math.random(), .2 + Math.random()*.5)
					p.stroke("white")
					p.strokeWeight(4)
					p.circle(...pt, (Math.random() +.41)*100)
					
				
				}

				console.log(p.canvas)
				wallpaperURL = p.canvas.toDataURL();
				console.log(wallpaperURL)
			}

			p.mouseDragged = () => {
				const t = p.millis()*.001
				// Save this current mouse position in an array
				// .... but what will you do with an array of vectors?
				pts[0] = [p.mouseX, p.mouseY]
				

			}

			p.draw = () => {
				let t = p.millis()*0.001
				mousePositions.push([p.mouseX, p.mouseY])
				let pt = randPoint(p)
				let h = Math.random()*360
				// p.fill(h, 100, 40 + 20*Math.random(), .2 + Math.random()*.5)
				// p.stroke("white")
				// p.strokeWeight(4)
				
				p.fill("black")
				p.noStroke()
				p.circle(p.mouseX, p.mouseY, 10)
				


				// Refresh the data URL
				if (p.frameCount%1===0) {

					wallpaperURL = p.canvas.toDataURL();
					let body = document.getElementsByTagName("body")[0]
					body.style.backgroundImage = `url(${wallpaperURL})`
				}

				// console.log(mousePositions)

				// p.loadPixels()

				// console.log(p.pixels)

				// for (var i = 0; i < p.pixels.length; i++) {

				// 	if (i < p.pixels.length/3)
				// 		p.pixels[i] = 0
				// 	// if (i % 4 == 0) {
				// 	// 	p.pixels[i] = 255*(.5 + .5*Math.sin(t))
				// 	// 	// p.pixels[i] = Math.random()*255
				// 	// }
				// }


				// p.set(0, 0, p.color(0, 0, 0))
				

// 				for (var i = 0; i < 10; i++ ) {
// 					for(var j = 0; j < 10; j++) {
// 						let px = [i,j]
// 						// Get color at this pixel
// 						let c = p.get(...px)

// 						// Max the red
// 						c[0] = 255

// 						// Set it back
// 						p.set(...px, c)
// 					}
// 				}
				
// // 
// 				p.updatePixels()
			}


		}, 

	// A place to put the canvas
	element);
})

