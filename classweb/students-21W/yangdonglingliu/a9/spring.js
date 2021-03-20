
class SpringEdge {
	constructor(start, end) {
		this.start = start
		this.end = end
		this.baseDistance =50 + Math.random()*50
		this.edgeVector = new Vector()
		this.handle0 = new Vector.Handle(this.start, 50, Math.random() - .5)
		this.handle1 = new Vector.Handle(this.end, 50, Math.random() - .5 + Math.PI)
	}

	update(t, dt) {
		this.handle0.update()
		this.handle1.update()
	}
	ease(amt) {
		this.edgeVector.setToDifference(this.end, this.start)
		let m = this.edgeVector.magnitude
		if (m !== 0) {
			let stretch = (m - this.baseDistance)
			if (this.start.force)
				this.start.addMultiples(this.edgeVector, amt*stretch/m)
			if (this.end.force)
				this.end.addMultiples(this.edgeVector, -amt*stretch/m)
		}
	}

	applyForce() {
		this.edgeVector.setToDifference(this.end, this.start)
		let m = this.edgeVector.magnitude

		if (m !== 0) {
			let stretch = (m - this.baseDistance)/this.baseDistance
			// console.log(stretch, m)
			let force = stretch*100

			if (this.start.force)
				this.start.force.addMultiples(this.edgeVector, force)
			if (this.end.force)
				this.end.force.addMultiples(this.edgeVector, -force)
		}

		
	}

	draw(p) {
		// this.handle0.draw(p)
		// this.handle1.draw(p)
		p.stroke(0)
		p.noFill()
		p.beginShape()
		this.start.vertex(p)
		Vector.drawBezierVertex(p, this.handle0, this.handle1)
		p.endShape()

		p.fill(0)
		p.beginShape()
		this.end.polarOffsetVertex(p, 9, this.handle1.theta)
		this.end.polarOffsetVertex(p, 19, this.handle1.theta - .3)
		this.end.polarOffsetVertex(p, 19, this.handle1.theta + .3)
		p.endShape()
	}

	toSVG() {
		let curvePath = `M${this.start.toSVG()} C${this.end.toSVG()}`
		// return `<path d="M${this.start.toSVG()} L${this.end.toSVG()}" stroke="black" />` 
	}

}

class SpringGraph {
	constructor() {
		this.particles = []
		this.edges = []
	}

	addParticle(id) {
		let p = new Vector(Math.random()*300 - 150, Math.random()*200 - 100)
		p.id = id
		p.idNumber = this.particles.length
		p.force = new Vector()
		p.velocity = Vector.polar(10, Math.random()*6.15)
		this.particles.push(p)
		return p
	}

	addEdge(start, end) {
		if (typeof start === "string") {
			start = this.particles.find(p => p.id === start)
		}
		if (typeof end === "string") {
			end = this.particles.find(p => p.id === end)
		}
		if (start !== undefined && end !== undefined) {
			let e = new SpringEdge(start, end)
			this.edges.push(e)
		} else {
			console.warn("INVALID EDGE", start, end)
		}
		
	}

	update(t, dt) {

		// Update all the particle forces
		let offset = new Vector()
		let f = 1 - 1/(1+Math.pow(Math.E, -t*.1))
		
		// console.log(f)
			
		this.particles.forEach(pt => {
			pt.force.mult(0)
			pt.force.setToMultiple(pt, -.1)

			// Wander
			// console.log(t)
			
			// Gravity
			pt.force.coords[1] += 400


			let pf = f * 200*(3 + Math.sin(t*3 + pt.idNumber))
			pt.force.addPolar(pf, 12*(1 + Math.sin(pt.idNumber*2 + t*.5)))

			// Spacing
			// this.particles.forEach(p2 => {
			// 	if (p2 !== pt) {
			// 		offset.setToDifference(p2, pt)
			// 		let m = offset.magnitude
			// 		let range = 150
			// 		if (m < range && m > 0)
			// 			pt.force.addMultiples(offset, -.1*(range - m) /m)
			// 	}
			// })
		})
		this.edges.forEach(e => {
			e.applyForce()
			// e.ease(.01 + Math.random()*.01)
		})

		this.particles.forEach(p => {
			p.velocity.addMultiples(p.force, dt)
			p.addMultiples(p.velocity, dt)

			p.velocity.clampMagnitude(0, 200)
			p.velocity.mult(.98)
			Vue.set(p.coords, 0, p.coords[0])
		})
		this.edges.forEach(e => e.update(t, dt))
	}

	draw(p) {
		p.noFill()
		p.stroke(0)
		this.particles.forEach(pt => pt.draw(p, 14))
		this.edges.forEach(e => e.draw(p, 4))
	}

	toSVG() {
		let edgeSVG = this.edges.map(e => e.toSVG()).join("\n")

		let pointSVG = this.particles.map(p => {
			return `<circle cx="${p.coords[0].toFixed(2)}" cy="${p.coords[1].toFixed(2)}" r="10" fill="red" />`
		}).join("\n")


		return `<g>${edgeSVG}\n${pointSVG}</g>`
	}
}
