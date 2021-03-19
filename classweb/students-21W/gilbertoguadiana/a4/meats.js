let meatCount = 0

// Get the wind force at this time and position
function getWindForce(t, x, y) {
	let scale = .002
	let theta = 20*noise(x*scale*.5, y*scale*.5, t*.07)
	let strength = noise(x*scale, y*scale, t*.1 + 100)
	let r = 100 + 1000*strength*strength
	return Vector.polar(r, theta)
}

class Meat{
  constructor(position, velocity){
    this.idNumber = meatCount;
    meatCount++;

    if (velocity === undefined)
			velocity = Vector.randomPolar(10)

		if (position === undefined)
			position = new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)

		// Create a random meat particle... somewhere
		this.position = new Vector(...position)
		this.velocity = new Vector(...velocity)

    this.size = 30
    this.windForce = new Vector(0, 0)
  }

  draw(p) {
		p.textSize(this.size)
		p.text("🍖", ...this.position)
  }

  debugDraw(p,t){
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

  update(t, dt) {
    this.windForce = getWindForce(t, ...this.position)

    // Move with the wind force, but bigger particles move less
    this.velocity.addMultiples(this.windForce, dt/this.size*SLIDERS.meatDriveForce.value())
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
