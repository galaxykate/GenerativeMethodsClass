// sensors that make up the braitenberg runner
let Sensor = class {
	constructor(position, channel) {
		// position holds an array of x,y values
		this.position = position
		this.channel = channel
	}

	value() {
		// return noise(scale*this.position[0], scale*this.position[1])**2
		return lightmap.sample(...this.position)[this.channel]/255
	}

	draw(p) {

	}
}

// keep track of number of runners on screen
let runnersCount = 0;

let Runner = class {
	constructor(position) {
		this.idNumber = runnersCount++

		this.position = new Vector(...position)
		this.velocity = Vector.randomPolar(10)
		this.force = new Vector(0,0)

		this.size = 40
		this.eyeAngle = .6
		this.eyeRadius = 14

		this.eye0 = new Sensor(new Vector(0,0), 1)
		this.eye1 = new Sensor(new Vector(0,0), 1)
		this.eye2 = new Sensor(new Vector(0,0), 0)
		this.eye3 = new Sensor(new Vector(0,0), 0)

		this.wheel0 = 0
		this.wheel1 = 0

		this.type = 1

		this.angle = Math.random()*Math.PI*2
	}

	draw(p) {

		p.rectMode(p.RADIUS);

		// Draw the body
		p.push()
		p.translate(...this.position)
		// p.rotate(this.angle)
		p.textSize(this.size)
		p.text("🏃", 0, 0)

		p.pop()


		p.fill(0, 0, 100)
		p.stroke(0, 0, 0)

		this.eye0.draw(p)
		this.eye1.draw(p)

	}


	debugDraw(p) {
		p.push()
		p.translate(...this.position)
		p.rotate(this.angle)

		let wheelPower0 = 15*this.wheel0 + 2
		p.fill(this.wheel0*100, 100, 50)
		p.rect(wheelPower0/2, -this.size, wheelPower0, 2)

		let wheelPower1 = 15*this.wheel1 + 2
		p.fill(this.wheel1*100, 100, 50)
		p.rect(wheelPower1/2, this.size, wheelPower1, 2)

		p.pop()


	}

	update(t, dt) {
		// love for hunger weighs more than curiosity of shooting stars
		this.wheel0 = 0.75*(1 - this.eye0.value()) + 0.25*(1-this.eye3.value())
		this.wheel1 = 0.75*(1 - this.eye1.value()) + 0.25*(1-this.eye2.value())


		this.angle += (this.wheel0 - this.wheel1)*.3

		let driveForce = (400*(this.wheel0 + this.wheel1) + 1)*SLIDERS.runnerDriveForce.value();
		this.force.setToPolar(driveForce, this.angle)

		// Avoid all others
		runners.forEach(bug => {
			if (this !== bug) {

				let offset = Vector.getDifference(this.position, bug.position)
				let d = offset.magnitude
				let range = 40
				if (d < range) {
					// console.log("skoot")
					let avoidPower = 400*((range - d)/range)**3
					this.force.addMultiples(offset, -avoidPower/d)
				}

			}
		})

		this.velocity.addMultiples(this.force, dt)
		this.position.addMultiples(this.velocity, dt)

		this.velocity.mult(.7)

		// wrap around
		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight

		// Where are my eyes?
		this.eye0.position.setToPolarOffset(this.position, this.eyeRadius, this.angle - this.eyeAngle)
		this.eye1.position.setToPolarOffset(this.position, this.eyeRadius, this.angle + this.eyeAngle)
		this.eye2.position.setToPolarOffset(this.position, this.eyeRadius, this.angle - this.eyeAngle)
		this.eye3.position.setToPolarOffset(this.position, this.eyeRadius, this.angle + this.eyeAngle)

	}
}
