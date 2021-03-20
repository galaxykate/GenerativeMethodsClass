
let bubblesCount = 0

// Get the wind force at this time and position
function getWindForce(t, x, y) {
	let scale = 0.002
	let theta = 20*noise(x*scale*.5, y*scale*.5, t*.07)
	let strength = noise(x*scale, y*scale, t*.1 + 100)
	let r = 100 + SLIDERS.windStrength.value()*strength*strength
	return Vector.polar(r, theta)

}

// Draw a windmap of the snow at the current time
function debugDrawBubbles(p, t) {

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
			p.fill("white")
			p.noStroke()
			p.circle(x, y, 2)
			p.stroke("white")
			p.strokeWeight(1)
			p.line(x, y, x + drawScale*force[0], y + drawScale*force[1])
		}
	}
}

// Bubbles that are pushed around by a wind vectorfield
class Bubble {
	constructor(position, hue, saturation, lightness) {
		// Have an id number
		this.idNumber = bubblesCount++

		if (position === undefined)
			position = new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		
		if (hue === undefined)
			hue = Math.random()*360

		if (saturation === undefined)
			saturation = 80

		if (lightness === undefined)
			lightness = 80

		// Create a random bubble... somewhere
		this.position = position
		
		this.velocity = Vector.randomPolar(10)

		// Randomly sized bubble
		this.size = 10 + Math.random()*20

		this.windForce = new Vector(0, 0)

		//this.buoyancy = new Vector(0, -25)
		this.hue = hue
		this.saturation = saturation
		this.lightness = lightness
	}


	draw(p) {
		p.noStroke()
		p.fill(this.hue, this.saturation, this.lightness, 0.8)
		p.circle(...this.position, this.size)
	}


	// Time and delta time
	update(t, dt) {
		this.windForce = getWindForce(t, ...this.position)

		this.velocity.addMultiples(new Vector(0, -SLIDERS.buoyancy.value()), dt)
		//this.velocity.addMultiples(this.buoyancy, dt)

		// Move with the wind force, but bigger particles move less
		this.velocity.addMultiples(this.windForce, dt/this.size)
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight



		const maxSpeed = 100
		let speed = this.velocity.magnitude
		if (speed > maxSpeed)
			this.velocity.mult(maxSpeed/speed)

		this.velocity.mult(.99)
	}
}
