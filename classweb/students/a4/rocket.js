let rocketCount = 0
class Rocket {
	constructor(position) {
		this.idNumber = rocketCount++

		this.position = position || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		this.velocity = Vector.randomPolar(20)
		
		this.turnStrength = 0
		this.turnForce = new Vector(0,0)
		this.thrusterStrength = 0
		this.thrusterForce = new Vector(0,0)

		this.flameAnimation = 0

		this.trail = []
	}

	update(t, dt) {
		let angle = this.velocity.angle
		
		this.flameAnimation += dt*2*this.thrusterStrength

		this.turnStrength = (1.2*(noise(t*.3, this.idNumber + 100)*2 - 1))
		this.turnForce.setToPolar(700*this.turnStrength, this.velocity.angle + Math.PI/2);
		
		this.thrusterStrength = (1.2*noise(t*.2, this.idNumber))**3
		this.thrusterForce.setToPolar(300*this.thrusterStrength, this.velocity.angle);
		
		this.velocity.addMultiples(this.thrusterForce, dt)
		this.velocity.addMultiples(this.turnForce, dt)
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight
		
		this.velocity.mult(.99)
		this.velocity.clampMagnitude(10, 150)

		// Store a trail that is 80? long
		this.trail.push(this.position.slice(0))
		this.trail = this.trail.slice(this.trail.length - 120)
		
	}

	draw(p) {
		p.noStroke()
		p.fill(0, 0, 0, .4)
		
		this.trail.forEach(pt => p.circle(...pt, 3))

		p.push()
		p.translate(...this.position)
		p.rotate(this.velocity.angle)

		p.noStroke()
		p.rectMode(p.CENTER)
		p.fill(0, 0, 50)
		p.rect(10, 0, 15, 10)
		p.ellipse(30, 0, 45, 10)

		p.beginShape()
		p.vertex(0, 0)
		p.vertex(20, 0)
		p.fill(0, 0, 70)
		p.vertex(0, -40*this.turnStrength)
		p.endShape()

		let t = this.flameAnimation
		let flameCount = 7
		p.scale(this.thrusterStrength, .6 + this.thrusterStrength*.4)
		for (var i = 0; i < flameCount; i++) {
			let pct = ((i + t*10)%flameCount)/flameCount
			let r = (.3 + Math.sin(pct*Math.PI))*(1-pct)
			p.fill(50 - pct*50, 100, 50)
			p.noStroke()
			p.ellipse(-pct*100, pct*3*Math.sin(i*3 + t), r*40, r*15)
		}

		p.pop()

		
	}

	debugDraw(p) {
		// console.log(this.force)
		let forceDrawMultiple = .4
		this.turnForce.drawArrow({
			p: p,
			center: this.position,
			multiple: forceDrawMultiple,
			color: [290,100,50]
		})

		this.thrusterForce.drawArrow({
			p: p,
			center: this.position,
			multiple: forceDrawMultiple,
			color: [0,0,0]
		})
	}
}