
let springParticleCount = 0
let springEdgeCount = 0

let draggedParticle = undefined

let colors = {
	weaknesses: [150, 90, 90, .6],
	strengths: [350, 90, 40, .6],
	immunes: [250, 90, 40, .6]
}

function calculateDistance(u, v) {
	let sum = 0
	for (var i = 0; i < u.length; i++ ) {
		sum += (u[i] - v[i])**2
	}
	return Math.sqrt(sum)
}

class SpringEdge {
	constructor(p0, p1, label) {
	
		// console.log(p0.label, p1.label)
		// Calculate the distance between these two points
		// let dist = calculateDistance(p0.data.vec, p1.data.vec) - 5.9
		let dist = calculateDistance(p0.data.pvec, p1.data.pvec) - 8
		
		console.log(p0.label, p1.label, dist.toFixed(2))
		// console.log(p0.data)

		this.p0 = p0
		this.p1 = p1
		this.force0 = p0.addForce(this)
		this.force1 = p1.addForce(this)
		this.baseLength = (dist*100 + 100)
		this.edgeVector = new Vector(0,0)
		this.springOffset = 0
		this.label = label



	}

	update(t, dt) {

		// this.baseLength = (1.2+ Math.sin(t))*100
		this.edgeVector.setToDifference(this.p1.position, this.p0.position)
		this.m = this.edgeVector.magnitude
		this.edgeVector.normalize()

		this.springOffset = this.baseLength - this.m
		let springPower = this.springOffset*300
		this.force0.setToMultiple(this.edgeVector, -springPower)
		this.force1.setToMultiple(this.edgeVector, springPower)
	}
	
	draw(p, customDraw) {
		let color = colors[this.label] || [0,0,0]


		let weight = Math.min(5, 2*Math.pow(.5, -this.springOffset/this.baseLength))
		p.strokeWeight(weight)
		
		// p.stroke(...color, .1)
		p.stroke(0, 0, 0, .3)
		//  Draw this edge
		if (this.label) {
			this.edgeVector.drawArrow({
				color: colors[this.label],
				p: p,
				multiple: this.m - 20,
				offsetStart: this.p0.radius,
				offsetEnd: this.p1.radius,
				center: this.p0.position,
				v1: this.p1.position
			})
		}
		else {
			p.stroke(0, 0, 0, .4)

			Vector.drawLineBetween ({
				p: p,
				
				v0: this.p0.position,
				v1: this.p1.position
			})
		}
		if (customDraw) {
			customDraw(p, this)
		}
		p.strokeWeight(.2)
		p.noStroke()
	}
}


class SpringParticle {
	constructor(position, label, data) {
		this.idNumber = springParticleCount++
		this.label = label || "P" + this.idNumber
		this.data = data
	
		this.hue = Math.random()*360
		this.position = position || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		this.velocity = Vector.randomPolar(10)
		this.radius = 10
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
		this.borderForce.mult(-.15*this.mass)

		// Add forces
		this.springForces.forEach(f => this.velocity.addMultiples(f, dt/this.mass))
		this.velocity.addMultiples(this.wiggleForce, dt/this.mass)
		this.velocity.addMultiples(this.borderForce, dt/this.mass)

		if (app.draggedParticle !== this)
			this.position.addMultiples(this.velocity, dt)
		
		this.velocity.clampMagnitude(0, 1400)

		this.velocity.mult(.97)

	}

	draw(p, customDraw) {

		let pos = this.position.coords
			
		let count = 6
		for (var i = 0; i < count; i++) {
			let pct = i/(count)
			let r = this.radius*(1 - Math.pow(pct, 3))
			p.noStroke()
			p.fill((this.hue)%360, 100, 7 + 70*pct)
			p.circle(pos[0] + -.2*pct**3*r, pos[1] + -.3*pct**3*r, r)


		}
		if (this.label) {

			p.fill(0)
			p.text(this.label, pos[0] + 10, pos[1] + 14)
		}

		if (customDraw) {
			customDraw(p, this)
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

		for (var i = 0; i < 0; i++) {
			this.particles.push(new SpringParticle())
		}	

		for (var i = 0; i < 0; i++) {
			let p0 = this.particles[i%this.particles.length]
			this.addEdge(p0)
		}	

		this.svg = {
			raw: "no svg yet"
		}
	}


	connectAll() {
		for (var i = 0; i < this.particles.length; i++) {
			for (var j = i + 1; j <  this.particles.length; j++) {
				let p0 =  this.particles[i]
				let p1 =  this.particles[j]
				this.addEdge(p0, p1)
			}
		}

	}


	getAt(pos) {
		let closest = undefined
		let closestDist = 20
		this.particles.forEach(p => {
				
			let d = Vector.getDistance(p.position, pos) - p.radius
			if (d < closestDist) {
				closestDist = d
				closest = p
			}	
		})
		return closest
			
	}

	add(position, label, data) {
		let p0 = new SpringParticle(position, label, data)
		this.particles.push(p0)
		// for (var i = 0; i < 3; i++) {
		// 	this.addEdge(p0)
		// }
 	}

 	addEdge(p0, p1, label) {
		let index1 = Math.floor(Math.random()*this.particles.length)
		// let p1 = this.particles[index1]
		if (this.getEdgesConnecting(p0, p1).length == 0 && p0 !== p1)
			this.edges.push(new SpringEdge(p0, p1, label))
 	}

	getEdgesConnecting(p0, p1) {

		return this.edges.filter(e => (e.p0 === p0 && e.p1 === p1) || (e.p0 === p1 && e.p1 === p0))
	}

	update(t, dt) {
		this.particles.forEach(pt => pt.update(t, dt))
		this.edges.forEach(edge => edge.update(t, dt))

	
	}

	

	draw(p, drawParticle, drawEdge) {
		

		this.edges.forEach(pt => pt.draw(p, drawEdge))
		this.particles.forEach(pt => pt.draw(p, drawParticle))
		
	}

	debugDraw(p) {
		this.particles.forEach(pt => pt.debugDraw(p))
		
	}
}