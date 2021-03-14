// https://stackoverflow.com/questions/38499211/get-normal-of-bezier-curve-in-2d
// DeCasteljau

//P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4


// Outermost scope, 
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let debugDraw = true
let mousePositions = []





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

				p.createCanvas(300, 300);
				p.colorMode(p.HSL);
				
				// Hue, Sat, Light
				// (0-360,0-100,0-100)
				p.background("white")

				pts = [randPoint(p),randPoint(p),randPoint(p),randPoint(p)]
				console.log(pts)
			}

			p.mouseDragged = () => {
				const t = p.millis()*.001
				// Save this current mouse position in an array
				// .... but what will you do with an array of vectors?
				pts[0] = [p.mouseX, p.mouseY]
			}

			p.draw = () => {
				mousePositions.push([p.mouseX, p.mouseY])

				
				p.background(0, 0, 100, .4)
				// Not updating the background
				const currentTime = p.millis()*.001

				let p0 = pts[0]
				let cp0 = pts[1]
				let cp1 = pts[2]
				let p1 = pts[3]

				// if (debugDraw)
				// 	debugDrawBezier(p, ...pts)
				
				// p.beginShape().....p.bezierVertex()....

				let count = 30
				for (var i = 0; i < count; i++) {
					let t = ((i/count) + .05*currentTime) % 1
					
					let bp = bezierAtTime(...pts, t)
					p.fill(320, 100, 50)
					// p.rect(...bp, 12, 5)
				}

				// Draw all mouse positions
				p.fill(320, 100, 50)



				// mousePositions.forEach(mp => p.circle(...mp, 5))

				mousePositions = mousePositions.slice(mousePositions.length - 200)
				for (var i = 0; i < 6; i++) {
					let somePoints = mousePositions.filter((mp, index) => {
						// Return true or false
						return index%6 == i
					})
						// p.fill(120, 100, 50)
					// somePoints.forEach(mp => p.circle(...mp, 15))

					p.beginShape()


					p.noFill()

					p.stroke(10 + i*30, 100, 50)
					p.strokeWeight(2)
					somePoints.forEach(mp => p.curveVertex(...mp))

					

					p.endShape()
					}

				

				// console.log(mousePositions)
			}


		}, 

	// A place to put the canvas
	element);
})

function debugDrawBezier(p, p0, cp0, cp1, p1, t) {
	p.fill(0, 0, 0)
	p.noStroke()
	p.circle(...p0, 10)
	p.text("P0", ...p0)
	p.circle(...p1, 10)
	p.text("P1", ...p1)
	
	p.fill(190, 100, 50)
	p.stroke(0, 0, 0)
	p.circle(...cp0, 5)
	p.circle(...cp1, 5)
	// pts.forEach((pt) => p.circle(...pt, 5))
	
	p.stroke(0, 0, 0)
	p.noFill()
	p.bezier(...p0, ...cp0, ...cp1, ...p1)

	p.stroke(250, 100, 50)
	p.line(...p0, ...cp0)
	p.line(...p1, ...cp1)

}

function bezierAtTime(p0, cp0, cp1, p1, t) {

	// Get a POINT?

	// DeCasteljau
	//P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4
	let x = (1 - t)**3 * p0[0]
		  + 3*(1 - t)**2 * t * cp0[0]
		  + 3*(1 - t)* t**2  * cp1[0]
		  + t**3 * p1[0]

	let y = (1 - t)**3 * p0[1]
		  + 3*(1 - t)**2 * t * cp0[1]
		  + 3*(1 - t)* t**2  * cp1[1]
		  + t**3 * p1[1]

					
	return [x, y]
}


//
//   const d1 = { x: 2 * (pc.x - p1.x), y: 2 * (pc.y - p1.y) };
//    const d2 = { x: 2 * (p2.x - pc.x), y: 2 * (p2.y - pc.y) };

  //  const x = (1 - t) * d1.x + t * d2.x;
   // const y = (1 - t) * d1.y + t * d2.y;


