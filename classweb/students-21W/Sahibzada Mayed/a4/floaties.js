let floatiesParticleCount = 0

// Get the wind force at this time and position
function getWindForce(t, x, y) {
	let scale = .002
	let theta = 20*noise(x*scale*.5, y*scale*.5, t*.07)
	let strength = noise(x*scale, y*scale, t*.1 + 100)
	let r = 100 + 1900*strength*strength
	return Vector.polar(r, theta)

}

// Draw a windmap of the snow at the current time
function debugDrawfloaties(p, t) {

	// How many columns and rows of points do we want?
	let tileSize = 20
	let tileX = Math.floor(simulationWidth/tileSize)
	let tileY = Math.floor(simulationHeight/tileSize)

	let drawScale = .04
	for (var i = 0; i < tileX; i++) {
		for (var j = 0; j < tileY; j++) {

			// What point are we at?
			let x = tileSize*(i + .5)
			let y = tileSize*(j + .5)

			// Calculate the force here
			let force = getWindForce(t, x, y)

			// Draw the current wind vector
			p.fill(240, 70, 50)
			p.noStroke()
			p.circle(x, y, 2)
			p.stroke(240, 70, 50, .8)
			p.line(x, y, x + drawScale*force[0], y + drawScale*force[1])
		}
	}
}


class floatiesParticle {
	constructor(position, velocity) {
		// Have an id number
		this.idNumber = floatiesParticleCount++

		if (velocity === undefined)
			velocity = Vector.randomPolar(10)

		if (position === undefined)
			position = new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)

		// Create a random particle... somewhere
		this.position = new Vector(...position)
		this.velocity = new Vector(...velocity)

		// Randomly sized 
		this.size = 6+ Math.random()*10

		this.windForce = new Vector(0, 0)
		this.gravity = new Vector(10, 25)
	}

	
	draw(p) {
	
		p.noStroke()
		p.fill(Math.random()*200, Math.random()*100, Math.random()*150, 1) 
		p.circle(...this.position, this.size)
		}
		
		
		
		

	// Time and delta time
	update(t, dt) {
		this.windForce = getWindForce(t, ...this.position)

		this.velocity.addMultiples(this.gravity, dt)

		// Move with the wind force, but bigger particles move less
		this.velocity.addMultiples(this.windForce, dt/this.size)
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight



		const maxSpeed = SLIDERS.WindSpeed.value()
		let speed = this.velocity.magnitude
		if (speed > maxSpeed)
			this.velocity.mult(maxSpeed/speed)

		this.velocity.mult(.99)
	}
}



		
