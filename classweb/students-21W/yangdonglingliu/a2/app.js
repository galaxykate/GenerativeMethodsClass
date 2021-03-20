

// Utility functions
// Given a processing object, a loop length, a radius, and an offset (optional)
// function getLoopingNoise({p, loopLength, radius, offset=0}) {
// 	let t = p.millis()

	

// 	// This number should go from 0 to 1 every loopLength seconds
// 	// And PI*2 radians every loopLength seconds
// 	let noiseScale = 1
// 	let loopPct = (t*.001/loopLength)%1

// 	let theta = 2*Math.PI*loopPct

// 	// Place to sample the noise from
// 	let x = radius*Math.cos(theta)
// 	let y = radius*Math.sin(theta)

// 	let noiseVal = p.noise(x*noiseScale, y*noiseScale, offset)
// 	return noiseVal
// }


function getP5Element(index) {
	let element = document.getElementById("drawing" + index).getElementsByClassName("drawing-p5holder")[0]
	return element
}


//===========================================================

const WIDTH = 300
const HEIGHT = 300

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function(){
	console.log("Hello, animation!")

	// Rename your drawing here if you want
	let drawingTitles = ["Childhood Windmill", 
		"Random Melody", 
		"Feathers", 
		]
	let mainElement = document.getElementById("main")
		
	// Ignore this section if you want
	// This is me adding a label and a canvas-holder to each swatch
	// For each drawing
	for (var i = 0; i < 3; i++) {
		let el = document.createElement("div")
		el.className = "drawing"
		el.id = "drawing" + i
		mainElement.append(el)


		// Add a label
		let label = document.createElement("div")
		label.className = "drawing-label"
		label.innerHTML = `Drawing #${i+1}: ${drawingTitles[i]}`
		el.append(label)

		// Add a div to hold the canvas (so we can resize it independently of the outer frame)
		let canvasHolder = document.createElement("div")
		canvasHolder.className = "drawing-p5holder"
		canvasHolder.style = `width:${WIDTH};height:${HEIGHT}`
		el.append(canvasHolder)
	}

	// Comment out these lines to not draw each
	setupDrawing0()
	setupDrawing1()
	setupDrawing2()

});


function setupDrawing0() {

	function setup(p) {
		p.createCanvas(WIDTH, HEIGHT);
		p.colorMode(p.HSL);
		p.background('#90be6d');

	}
	// Draw (or do) things *each frame*
	function draw(p) {
		p.background('#90be6d')

		let t = p.millis()*0.001
		let loopLength = 6
		let loopPct = (t/loopLength)%1

		var colorList = [[173, 58, 39], [43, 74, 66], [27, 87, 67], [12, 76, 61], [197, 37, 24]]
		p.push()
		p.translate(p.width/2, p.height/2)

		let count1 = 5
		for (var i = 0; i < count1; i++) {
			let pct = i/count1
			
			let r = p.width/6
			let theta = pct * 2*Math.PI + loopPct* 2*Math.PI

			let x = r * Math.cos(theta)
			let y = r * Math.sin(theta)
			
			p.fill(...colorList[i])
			p.noStroke()
			p.arc(x, y, 2*r-10, 2*r-10, theta, theta+Math.PI)
		}

		let count2 = 8
		for (var i = 0; i < count2; i++) {
			let pct = i/count2
			
			let r = p.width/6
			let theta = pct * 2*Math.PI + loopPct*Math.PI

			let x = r * Math.cos(theta)
			let y = r * Math.sin(theta)
			
			p.fill(0, 100, 100, 0.5)
			p.noStroke()
			p.arc(x, y, 2*r-10, 2*r-20, theta, theta+Math.PI)
		}
		
		p.pop()
		
	}

	// Setup a P5 instance with these draw and setup functions
	// Yes, this code is very weird.  You can ignore it
	let element = getP5Element(0) // My function to get the element for this index
	let myP5 = new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, element);
}


function setupDrawing1() {

	function setup(p) {
		p.frameRate(1)
		
		p.createCanvas(WIDTH, HEIGHT);
		p.background('#f2eecb');

		let w = p.width
		let h = p.height

		p.line(0, h/2-40, w, h/2-40)
		p.line(0, h/2-20, w, h/2-20)
		p.line(0, h/2, w, h/2)
		p.line(0, h/2+20, w, h/2+20)
		p.line(0, h/2+40, w, h/2+40)

	}

	function draw(p) {

		let w = p.width
		let h = p.height
		
		p.background('#f2eecb');

		p.line(0, h/2-40, w, h/2-40)
		p.line(0, h/2-20, w, h/2-20)
		p.line(0, h/2, w, h/2)
		p.line(0, h/2+20, w, h/2+20)
		p.line(0, h/2+40, w, h/2+40)
	
		let count = 8
		for (var i = 0; i < count; i++) {
			let pct = i/count
			let ellipseW = 20
			let ellipseH = 13
			let lineLength = 35
			let x = (pct + 1/(count*2)) * w
			let y = Math.floor(Math.random()*11)*10+h/2-50
			p.push()
			
			p.translate(x, y)
			p.strokeWeight(2)
			p.line(ellipseW/4*1.732, -ellipseW/4, ellipseW/4*1.732, -ellipseW/4-lineLength)
			p.rotate(-Math.PI/6)
			p.fill(0)
			p.ellipse(0, 0, ellipseW, ellipseH)
			p.pop()
		}
	}


	let element = getP5Element(1) // <- Make sure to change this to the right index
	let myP5 = new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, element);
}


function setupDrawing2() {
	function setup(p) {
		p.createCanvas(WIDTH, HEIGHT);
		p.colorMode(p.HSL);
		p.background('#1d3557');
		//p.background(0);
	}

	function draw(p) {
		let w = p.width
		let h = p.height

		//var colorList = [[173, 58, 39], [43, 74, 66], [27, 87, 67], [12, 76, 61], [197, 37, 24]]
		var colorList = [[105, 55, 96], [182, 43, 76], [203, 39, 44], [215, 50, 23]]
		
		let t = p.frameCount *.001

		let xSeed = .5*w*Math.cos(t*24) + w/2
		let ySeed = .5*h*Math.sin(t*33) + h/2
		
		p.push()
		
		for (var i = 0; i < 4; i++) {
			let currNoise = p.noise(xSeed, ySeed)
			let x = (.5*w*Math.cos(t*24) + w/2 + currNoise*30) % w
			let y = (.5*h*Math.sin(t*33) + h/2 + currNoise*30) % h

			p.translate(x, y)
			let angle = Math.sin(t*2)
			p.rotate(angle)

			p.strokeWeight(8)
			p.stroke(...colorList[i], 0.6)
			p.line(x, y, x, y + currNoise*h)
		}

		p.pop()
	}


	let element = getP5Element(2) // <- Make sure to change this to the right index
	let myP5 = new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, element);
}
