
let springParticleCount = 0
let springEdgeCount = 0

class SpringEdge {
	constructor(p0, p1) {

		this.p0 = p0
		this.p1 = p1
		this.force0 = p0.addForce(this)
		this.force1 = p1.addForce(this)
		this.baseLength = Math.random()*200 + 50
		this.edgeVector = new Vector(0,0)
		this.springOffset = 0
	}

	update(t, dt) {
		this.edgeVector.setToDifference(this.p1.position, this.p0.position)
		let m = this.edgeVector.magnitude
		this.edgeVector.normalize()

		this.springOffset = this.baseLength - m
		let springPower = this.springOffset*300
		this.force0.setToMultiple(this.edgeVector, -springPower)
		this.force1.setToMultiple(this.edgeVector, springPower)
	}
	
	draw(p) {

		p.strokeWeight(2*Math.pow(.5, -this.springOffset/this.baseLength))
		p.stroke(0, 0, 0, .9)
		Vector.drawLineBetween({
			p: p,
			offsetStart: this.p0.radius/2,
			offsetEnd: this.p1.radius/2,
			v0: this.p0.position,
			v1: this.p1.position
		})

		// this.edgeVector.drawArrow({
		// 	p:p,
		// 	center: this.p0.position,
		// })
	}
}


class SpringParticle {
	constructor(position) {
		this.idNumber = springParticleCount++

		this.hue = Math.random()*360
		this.position = position || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		this.velocity = Vector.randomPolar(10)
		this.radius = Math.random()**2*50 + 10
		this.mass = this.radius**2

		this.springForces = []
		this.wiggleForce = new Vector(0, 0)
		this.borderForce = new Vector(0, 0)
	}

	addForce() {
		let f = Vector.randomPolar(10)
		this.springForces.push(f)
		return f
	}

	update(t, dt) {
		
		// Occaisional sharp wiggles
		let wiggleMag = 2000*Math.max(0,(noise(t*.7, this.idNumber + 10) - .6)*(1 + this.mass))
		// console.log(wiggleMag)
		this.wiggleForce.setToPolar(wiggleMag, 20*noise(t*.2, this.idNumber))
		
		this.borderForce.setToDifference(this.position, [simulationWidth/2, simulationHeight/2])
		this.borderForce.mult(-.5*this.mass)

		// Add forces
		this.springForces.forEach(f => this.velocity.addMultiples(f, dt/this.mass))
		this.velocity.addMultiples(this.wiggleForce, dt/this.mass)
		this.velocity.addMultiples(this.borderForce, dt/this.mass)
		this.position.addMultiples(this.velocity, dt)
		
		this.velocity.clampMagnitude(0, 1400)

		this.velocity.mult(.97)

	}

	draw(p) {
		let count = 6
		for (var i = 0; i < count; i++) {
			let pct = i/(count)
			let r = this.radius*(1 - Math.pow(pct, 3))
			p.noStroke()
			p.fill((this.hue)%360, 100, 7 + 70*pct)
			p.circle(this.position[0] + -.2*pct**3*r, this.position[1] + -.3*pct**3*r, r)
		}

		
	}

	debugDraw(p) {
		
		let forceDisplayMultiple = .4

		p.strokeWeight(4)
		this.springForces.forEach(f => {
			f.drawArrow({
				center: this.position, 
				offsetStart: this.radius/2,
				color: [0, 0, 0, .2],
				p: p,
				multiple: forceDisplayMultiple/this.mass
			})
		})

		this.wiggleForce.drawArrow({
			center: this.position, 
			p: p,
			color: [200, 100, 30],
			offsetStart: this.radius/2,
			multiple: forceDisplayMultiple/this.mass
		})
		this.borderForce.drawArrow({
			center: this.position, 
			p: p,
			color: [300, 100, 30],
			offsetStart: this.radius/2,
			multiple: forceDisplayMultiple/this.mass
		})

		p.strokeWeight(1)

	}
}

class SpringSystem {
	constructor() {
		this.particles = []
		this.edges = []

		for (var i = 0; i < 8; i++) {
			this.particles.push(new SpringParticle())
		}	

		for (var i = 0; i < 20; i++) {
			let p0 = this.particles[i%this.particles.length]
			this.addEdge(p0)
		}	
	}

	add(position) {
		let p0 = new SpringParticle(position)
		this.particles.push(p0)
		for (var i = 0; i < 3; i++) {
			this.addEdge(p0)
		}
 	}

 	addEdge(p0) {
		let index1 = Math.floor(Math.random()*this.particles.length)
		let p1 = this.particles[index1]
		if (this.getEdgesConnecting(p0, p1).length == 0 && p0 !== p1)
			this.edges.push(new SpringEdge(p0, p1))
 	}

	getEdgesConnecting(p0, p1) {

		return this.edges.filter(e => (e.p0 === p0 && e.p1 === p1) || (e.p0 === p1 && e.p1 === p0))
	}

	update(t, dt) {
		this.particles.forEach(pt => pt.update(t, dt))
		this.edges.forEach(edge => edge.update(t, dt))
	}

	draw(p) {
		
		this.particles.forEach(pt => pt.draw(p))
		this.edges.forEach(pt => pt.draw(p))
	}

	debugDraw(p) {
		this.particles.forEach(pt => pt.debugDraw(p))
		
	}
}