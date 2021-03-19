let shootingStarsCount = 0

class ShootingStar{
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

    this.size = 50
  }

  draw(p) {
		p.textSize(this.size)
		p.text("🌠", ...this.position)
  }

  debugDraw(p){
    this.velocity.drawArrow({
      p:p,
      arrowSize: 20,
      center: this.position,
      multiple: 5,
      color: [1*30 + 240, 100, 70, 1],
    })
  }

  update(t, dt) {

    this.position.addMultiples(this.velocity, SLIDERS.shootingStarDriveForce.value()*dt)

    this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
    this.position[1] = (this.position[1] + simulationHeight)%simulationHeight

    const maxSpeed = 100
    let speed = this.velocity.magnitude
    if (speed > maxSpeed)
      this.velocity.mult(maxSpeed/speed)

  }
}
