
let curvePointCount = 0
let curveCount = 0

class Curve {
	constructor(p0, cp0, cp1, p1, hue, saturation, lightness) {

		this.p0 = p0
		this.p1 = p1
		this.cp0 = cp0
		this.cp1 = cp1

		this.hue = hue
		this.saturation = saturation
		this.lightness = lightness
	}
	
	draw(p) {

		p.fill(this.hue, this.saturation, this.lightness, 0.7)
		p.noStroke()
		//p.strokeWeight(2)
		//p.stroke("white")
		p.bezier(...this.p0.position, ...this.cp0.position, ...this.cp1.position, ...this.p1.position)
	}
}


class CurvePoint {
	constructor(position, hue, saturation, lightness) {
		this.idNumber = curvePointCount++

		if (position === undefined)
			position = new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		
		if (hue === undefined)
			hue = Math.random()*360

		if (saturation === undefined)
			saturation = 80

		if (lightness === undefined)
			lightness = 80

		this.hue = hue
		this.saturation = saturation
		this.lightness = lightness
		
		this.position = position
		this.velocity = Vector.randomPolar(10)
		this.radius = Math.random()**2*50 + 10
		this.mass = this.radius**2

		this.wiggleForce = new Vector(0, 0)
		this.borderForce = new Vector(0, 0)
	}

	addForce() {
		let f = Vector.randomPolar(10)
		return f
	}

	update(t, dt) {
		
		// Occaisional sharp wiggles
		let wiggleMag = 2000*SLIDERS.curvesWiggleForce.value()*Math.max(0,(noise(t*.7, this.idNumber + 10) - .6)*(1 + this.mass))
		// console.log(wiggleMag)
		this.wiggleForce.setToPolar(wiggleMag, 20*noise(t*.2, this.idNumber))
		
		// this.borderForce.setToDifference(this.position, [simulationWidth/2, simulationHeight/2])
		// this.borderForce.mult(-.5*this.mass)

		// Add forces
		this.velocity.addMultiples(this.wiggleForce, dt/this.mass)
		// this.velocity.addMultiples(this.borderForce, dt/this.mass)
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight
		
		this.velocity.clampMagnitude(0, 1400)

		this.velocity.mult(.97)

	}

	draw(p) {
		let count = 5
		for (var i = 0; i < count; i++) {
			let pct = i/(count)
			let r = this.radius*(1 - Math.pow(pct, 3))
			p.stroke(0)
			p.strokeWeight(2)
			p.fill(this.hue, this.saturation, this.lightness, 0.8)
			p.circle(this.position[0] + -.2*pct**3*r, this.position[1] + -.3*pct**3*r, r)
		}

		
	}

	debugDraw(p) {
		
		let forceDisplayMultiple = .4

		p.strokeWeight(4)

		this.wiggleForce.drawArrow({
			center: this.position, 
			p: p,
			color: [100, 100, 100],
			offsetStart: this.radius/2,
			multiple: forceDisplayMultiple/this.mass
		})
		// this.borderForce.drawArrow({
		// 	center: this.position, 
		// 	p: p,
		// 	color: [300, 100, 30],
		// 	offsetStart: this.radius/2,
		// 	multiple: forceDisplayMultiple/this.mass
		// })

		// p.strokeWeight(1)

	}
}

class CurveSystem {
	constructor() {
		this.curvePoints = []
		this.curves = []

		for (var i = 0; i < 4; i++) {
			this.curvePoints.push(new CurvePoint())
		}
		this.addCurve(this.curvePoints[3])	

	}

	addPoint(position, hue, saturation, lightness) {
		let p0 = new CurvePoint(position, hue, saturation, lightness)
		this.curvePoints.push(p0)
		this.addCurve(p0, hue, saturation, lightness)
 	}

 	addCurve(p0, hue, saturation, lightness) {

		// let index1 = Math.floor(Math.random()*this.curvePoints.length)
		// let p1 = this.curvePoints[index1]
		// if (this.getEdgesConnecting(p0, p1).length == 0 && p0 !== p1)
		// 	this.edges.push(new SpringEdge(p0, p1))
		
		let currIndex = this.curvePoints.length - 1
		let p1 = this.curvePoints[currIndex - 3]
		let cp1 = this.curvePoints[currIndex - 2]
		let cp0 = this.curvePoints[currIndex - 1]

		this.curves.push(new Curve(p0, cp0, cp1, p1, hue, saturation, lightness))
	}

	

	update(t, dt) {
		this.curvePoints.forEach(pt => pt.update(t, dt))
		//this.curves.forEach(edge => edge.update(t, dt))
	}

	draw(p) {
		this.curvePoints.forEach(pt => pt.draw(p))
		this.curves.forEach(pt => pt.draw(p))
	}

	debugDraw(p) {
		this.curvePoints.forEach(pt => pt.debugDraw(p))
		
	}
}