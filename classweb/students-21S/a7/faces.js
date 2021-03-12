

class Face {
	constructor(aof) {
		// Keep these
		this.aof = aof
		this.center = new Vector()

		this.eyes = [new Eye(this, -1), new Eye(this, 1)]

	}


	update(t, dt) {
		let hue = this.aof.get("flowerHue")
		this.eyes.forEach(eye => eye.update(t, dt))
	}

	draw(p) {
		p.push()
		p.translate(0,- 100)
		this.eyes.forEach((eye,index) => {
			p.push()
			p.scale(index*2 - 1, 1)
			p.translate(120, 0)
			eye.draw(p)
			p.pop()
		})

		// Testing sigmoids....
		// p.translate(-240, 190)
		// p.noStroke()
		// for (var i = 0; i < 40; i++) {
		// 	let x = i*20
		// 	p.fill(0, 0, 0)
		// 	p.rect(x, 0, 20, -100)

		// 	let v = noise(i, p.millis()*.001)
		// 	let v2 = unitSigmoid(v, 10)
		// 	p.fill(140, 100, 50)
		// 	p.circle(x + 5, -100*v, 5)
		// 	p.fill(340, 100, 50)
		// 	p.circle(x + 5, -100*v2, 5)
		// }
		
		p.pop()


	}
}


// Static properties for this class
Face.landmarks = {
	"palm": [0.4, 0.5, 0.1, 0.5],
	"pine": [0.4, 0.5, 0.1, 0.5],
	"oak": [0.4, 0.5, 0.1, 0.5],
	"willow": [0.4, 0.5, 0.1, 0.5]
}
Face.labels = ["energy", "spread", "bushiness", "length_dieoff", "thickness_dieoff", "flowerHue", "petalSpread", "flowerSize", "flowerSpikiness"]


//------------------------------
// Helper classes
function lerp(a, b, pct) {
	return a*(1-pct) + b*pct
}

class Eye {
	constructor(face, xMult) {
		this.xMult = xMult
		this.face = face

		
		this.corners =[new Vector(0,0), new Vector(0,0)] 
		this.lowerControl = this.corners.map(c => new CurveControl(c, 0,0))
		this.lastControl = this.corners.map(c => new CurveControl(c, 0,0))
		this.upperControl = this.corners.map(c => new CurveControl(c, 0,0))
		
		this.brow =[new Vector(0,0), new Vector(0,0)] 
		this.browControl = this.brow.map(c => new CurveControl(c, 0,0)) 
		this.browUpper = this.brow.map(c => new CurveControl(c, 0,0)) 
		this.browUpperControl = this.browUpper.map(c => new CurveControl(c, 0,0)) 

		this.eyeSize = 100


		this.rows = ["corners", "upperControl", "lowerControl"]

	}

	update(t, dt) {

		let set = (pt, side, theta) => {
			let r = this.eyeSize*.5*(.8 + Math.abs(.1*theta))
			
			pt.set(r, side*theta + .5*Math.PI*(side + 1))
		}

		let shift = this.face.aof.idNumber + this.xMult
	
		let r = this.eyeSize

		let innerTheta = -.3 + 3*(unitSigmoid(noise(t, shift), 5) - .5)
		let outerTheta = -.3 + 3*(unitSigmoid(noise(t + 200, shift), 5) - .5)


		// Blink 0,1
		let blink = noise(t*1 + 100, shift) + .5*Math.sin(t*3)
		blink = Math.max(0, Math.min(1, blink))

		// eyeOpen = 0
		let maxTheta = 1.2
		
		this.corners.forEach((c, index) => c.setToPolar(r*index, index*Math.PI))

		// console.log(this.corners.map(s => s.toFixed(2)))
		// set(this.innerUpper, -1,lerp(innerTheta, maxTheta, blink))
		// set(this.outerUpper, 1, lerp(outerTheta, maxTheta, blink))
		// this.outerUpper.set(r*.5, Math.PI + eyeOpen)
		// this.outerUpper.set(r*.5, Math.PI + lerp(maxTheta, 0, eyeOpen))

		
	}
		
	draw(p) {

		p.noiseDetail(3, 0.6);


		// Eye fill
		// p.strokeWeight(1)
		// p.stroke(0)
		// p.fill(100, 100, 100)
		// p.beginShape()
		// p.vertex(...this.inner.coords)
		// Vector.bezierVertex(p, this.innerUpper, this.outerUpper, this.outer)
		// Vector.bezierVertex(p, this.outerLower, this.innerLower, this.inner)
		// p.endShape()

		function drawShape(row0, controls0, row1, controls1) {
			p.beginShape()
			p.vertex(...row0[0].coords)
			Vector.bezierVertex(p, controls0[0], controls0[1], row0[1])
			p.vertex(...row1[1].coords)
			Vector.bezierVertex(p, controls1[1], controls1[0], row1[0])
			p.endShape()
		}	

		p.strokeWeight(1)
		p.stroke(0)
		p.fill(100, 100, 100)
		drawShape(this.corners, this.lowerControl, this.corners, this.upperControl)

		// Lashes
		// p.noFill()
		// p.strokeWeight(3)
		// p.beginShape()
		// p.vertex(...this.inner.coords)
		// Vector.bezierVertex(p, this.innerUpper, this.outerUpper, this.outer)
		// p.endShape()

		p.strokeWeight(1)
		p.fill(0)

		this.rows.forEach((rowLabel, rowIndex) => {
			let row = this[rowLabel]
			row.forEach((pt, index) => {
				p.fill(index*100, 100, 50)
				if (pt instanceof Vector) {
					p.stroke(index*100, 100, 30)
					pt.draw(p, 4)
				} else {
					pt.draw(p)
				}

				p.noStroke()
				p.fill(0)
				if (index === 0)
					p.text(rowLabel, pt.coords[0] + 5, pt.coords[1] + rowIndex*10)
				
			})
		})


	}
}