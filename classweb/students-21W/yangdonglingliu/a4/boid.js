

let fieryBoidCount = 0
let oceanicBoidCount = 0


let Boid = class {
	constructor(flock, type, position, velocity) {
		this.flock = flock

		this.type = type

		// Each boid gets a unique number, 
		//  useful for giving each one its own behavior or label
		if (this.type === "fiery")
			this.idNumber = fieryBoidCount++ 
		
		else if (this.type === "oceanic")
			this.idNumber = oceanicBoidCount++ 

		else throw("unknown type of boids")

		// Catch errors in case I pass something silly as an argument
		if (!Array.isArray(position))
			throw("position needs to be an array, got: " + position)
		if (!Array.isArray(velocity))
			throw("velocity needs to be an array, got:  " + velocity)
		

		this.position = position
		this.velocity = velocity


		// What forces does this boid have?
		// Have as many empty vectors as there are types of forces
		// Because this is where we will store them

		this.forces = {
			cohesion: new Vector(0, 0),
			alignment: new Vector(0, 0),
			separation: new Vector(0, 0),
			selfPropulsion: new Vector(0, 0),
		}


	
	}

	toString() {
		return `Boid${this.idNumber} p:(${this.position.toFixed(2)})  v:(${this.velocity.toFixed(2)})`
	}

	calculateForces(t, dt) {


		if (this.type === "fiery") {

			// This force pulls the boid toward the center of the flock
			this.forces.cohesion
				.setToDifference(this.position, this.flock.center)
				.mult(-.07* SLIDERS.fieryBoidCohesion.value())

			// The addition of all forces relative to other boids
			this.forces.separation.mult(0)
			this.flock.boids.forEach(boid => {
				if (boid !== this) {
					let offset = Vector.getDifference(this.position, boid.position)
					let d = offset.magnitude
					let range = 30
					//let range = SLIDERS.fieryBoidSeparation.value()
					// How close am I to this boid?

					if (d < range) {		
						let pushStrength = -90*(range - d)/range		
						offset.normalize().mult(pushStrength)
						this.forces.separation.add(offset)
					}
				}
			})

			// The boid gets a boost in the direction of the flocks average speed
			this.forces.alignment.copy(this.flock.averageVelocity).mult(0.6)

			// It also gets a boost in its own direction
			this.forces.selfPropulsion.setToPolar(SLIDERS.fieryBoidWander.value(), this.velocity.angle)
		}

		if (this.type === "oceanic") {

			// This force pulls the boid toward the center of the flock
			this.forces.cohesion
				.setToDifference(this.position, this.flock.center)
				.mult(-.07* SLIDERS.oceanicBoidCohesion.value())

			// The addition of all forces relative to other boids
			this.forces.separation.mult(0)
			this.flock.boids.forEach(boid => {
				if (boid !== this) {
					let offset = Vector.getDifference(this.position, boid.position)
					let d = offset.magnitude
					let range = 100
					//let range = SLIDERS.oceanicBoidSeparation.value()
					// How close am I to this boid?

					if (d < range) {		
						let pushStrength = -90*(range - d)/range		
						offset.normalize().mult(pushStrength)
						this.forces.separation.add(offset)
					}
				}
			})
		

			// The boid gets a boost in the direction of the flocks average speed
			this.forces.alignment.copy(this.flock.averageVelocity).mult(0.2)

			// It also gets a boost in its own direction
			this.forces.selfPropulsion.setToPolar(SLIDERS.oceanicBoidWander.value(), this.velocity.angle)
		}
	}


	// dt: 	How much time has elapsed? 
	// t: 	What is the current time
	update(t, dt) {
		dt = Math.min(1, dt) // Don't ever update more than 1 second at a time, things get too unstable
		

		// Position2 = Position1 + (Elapsed time)*Velocity
 		this.position.addMultiples(this.velocity, dt)

 		// Add up all the forces
 		// Velocity2 = Velocity1 + (Elapsed time)*Force
 		for (let forceKey in this.forces) {
 			let force = this.forces[forceKey]
 			this.velocity.addMultiples(force, dt)
 		}

 		// Clamp the maximum speed, to keep the boids from running too fast (or too slow)
		this.velocity.clampMagnitude(4, 100)

 		// Apply some drag.  This keeps them from getting a runaway effect
 		//let drag = 1 - SLIDERS.drag.value()
		let drag = 0.985 
		this.velocity.mult(drag)

 		// Wrap around
 		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight
		
 	}

	debugDraw(p) {

		let forceDisplayMultiple = 0.3

		// Get a list of all force names, then 
		// for each one, draw the force
		Object.keys(this.forces).map((forceKey, index) => {
			let force = this.forces[forceKey]
 			force.drawArrow({
 				p:p,
 				arrowSize: 6,
 				center: this.position,
 				multiple: forceDisplayMultiple,
 				color: [index*30 + 240, 100, 70, 1],
 			})
		})
	}


	draw(p) {
		let flap = Math.sin(p.millis()*.007 + this.idNumber) 
	
		if (this.type === "fiery") {
			//console.log('a fiery boid')
			let fieryLength = 10 	// How big is this boid?
			let fieryWingWidth = 5 + 1*flap	// How wide is this boid?
			
			// bookmark the matrix position before we move to draw this
			p.push()
			
			p.translate(...this.position)
			p.rotate(this.velocity.angle)

			p.noStroke()
			p.fill("#ee6c4d")
			p.beginShape()
			p.vertex(0, 0)					// front of the boid
			p.vertex(-fieryLength*(1.2 - .2*flap), fieryWingWidth)	// Wingtip
			p.vertex(-fieryLength, 0)				// back of the boid
			p.vertex(-fieryLength*(1.2 - .2*flap), -fieryWingWidth)
			p.endShape(p.CLOSE)

			// return to the original drawing position
			p.pop()

		}

		if (this.type === "oceanic") {
			let oceanicLength = 20 	// How big is this boid?
			let oceanicWingWidth = 10 + 2*flap	// How wide is this boid?
			
			// bookmark the matrix position before we move to draw this
			p.push()
			
			p.translate(...this.position)
			p.rotate(this.velocity.angle)

			p.noStroke()
			p.fill("#98c1d9")
			p.beginShape()
			p.vertex(0, 0)					// front of the boid
			p.vertex(-oceanicLength*(1.2 - .2*flap), oceanicWingWidth)	// Wingtip
			p.vertex(-oceanicLength, 0)				// back of the boid
			p.vertex(-oceanicLength*(1.2 - .2*flap), -oceanicWingWidth)
			p.endShape(p.CLOSE)

			// return to the original drawing position
			p.pop()

		}


	}
};