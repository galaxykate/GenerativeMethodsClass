let particleCount = 0


class KateParticle {
	constructor(position) {
		this.idNumber = particleCount++

		this.hue = Math.random()*360
		this.position = Vector.random([0, simulationWidth], [0, simulationHeight])
		this.velocity = Vector.randomPolar(0)

		this.gravity = new Vector(0, 0)
		this.border = new Vector(0, 0)
		this.wiggle = new Vector(0, 0)
	}

	// Takes a processing object
	draw(p) {
		
		p.noStroke(0)
		p.fill(this.hue, 100, 30)
		p.circle(...this.position, 10)


			
		
	}

	drawDebug(p) {

		if (this.idNumber %10 == 0) {
			// console.log(vector)
			this.velocity.drawArrow({
				p:p,
				center: this.position,
				multiple: 1,
				arrowSize: 6,
				color: [0, 0, 0, .3],
			}) 
				

			let forceDisplayMultiple = 1

			this.gravity.drawArrow({
				p:p,
				center: this.position,
				multiple: forceDisplayMultiple,
				color: [260, 100, 50],
			}) 
				
			this.wiggle.drawArrow({
				p:p,
				center: this.position,
				multiple: forceDisplayMultiple,
				color: [320, 100, 50],
			}) 

			this.border.drawArrow({
				p:p,
				center: this.position,
				multiple: forceDisplayMultiple,
				color: [320, 100, 50],
			}) 
		}
	}

	// Move the particles
	// t is the current time (in seconds), dt is the *elapsed time* in seconds
	update(t, dt) {
		
		// A force to keep everything on screen
		let screenCenter = [simulationWidth/2,simulationHeight/2]
		this.border.setToDifference(this.position, screenCenter)
		let maxRange = 200
		let range = Math.max(0, this.border.magnitude - maxRange)
		this.border.normalize()

		let borderForce = SLIDERS.katesBorder.value()
		this.border.mult(-range*borderForce)

		// let scale = .01
		let scale = .1*SLIDERS.katesNoiseScale.value()
		// Wiggle according to time and idNumber
		// this.wiggle.setToPolar(20, 20*mainP5.noise(t*.1 + .1*this.idNumber))
		
		// Wiggle according to location
		let wiggleForce = 100*SLIDERS.katesWiggleForce.value()
		this.wiggle.setToPolar(wiggleForce, 20*noise(this.position[0]*scale, this.position[1]*scale))


		this.position.addMultiples(this.velocity, dt)

		this.velocity.addMultiples(this.border, dt)
		this.velocity.addMultiples(this.gravity, dt)
		this.velocity.addMultiples(this.wiggle, dt)
		
		// Apply some "drag"
		let drag = 1 - SLIDERS.katesDrag.value()
 		this.velocity.mult(drag)
 		// console.log(drag)

	}
}