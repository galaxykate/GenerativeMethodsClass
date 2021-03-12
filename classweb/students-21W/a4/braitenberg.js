
let Sensor = class {
	constructor(position, channel) {
		this.position = position
		this.channel = channel
	}



	value() {
		// return noise(scale*this.position[0], scale*this.position[1])**2
		return lightmap.sample(...this.position)[this.channel]/255
	}

	draw(p) {
		p.fill(0, 100, 100)
		p.circle(...this.position, 10)
		p.fill(0)
		p.circle(...this.position, 10*this.value())
	}
}

let bugCount = 0;

let Braitenbug = class {
	constructor(position) {
		this.idNumber = bugCount++

		this.position = new Vector(...position)
		this.velocity = Vector.randomPolar(10)
		this.force = new Vector(0,0)

		this.size = 15
		this.eyeAngle = .6
		this.eyeRadius = 14

		this.eye0 = new Sensor(new Vector(0,0), 1)
		this.eye1 = new Sensor(new Vector(0,0), 1)

		this.wheel0 = 0
		this.wheel1 = 0

		this.type = this.idNumber%4
		
		this.angle = Math.random()*Math.PI*2
	}

	draw(p) {


		
		p.rectMode(p.RADIUS);
		
		// Draw the body
		p.push()
		p.translate(...this.position)
		p.rotate(this.angle)
		
		// Draw wheels
		p.stroke(0)
		p.fill(0,0, 40)
		p.rect(0, this.size*.7, 8, 3, 4)
		p.rect(0, -this.size*.7, 8, 3, 4)

		// Draw the chassis
		p.fill(0)
		p.noStroke()
		p.ellipse(-this.size*.5, 0, this.size*1.8, this.size*1.4)
		p.fill(20)
		p.ellipse(this.size*.5, 0, this.size, this.size)

		p.rotate(Math.PI/2)
		p.textSize(14)
		p.text(["♥️", "⚔️", "⭐️", "💀"][this.type], -7, this.size)

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

		
		// this.wheel0 = noise(t, this.idNumber)
		// this.wheel1 = noise(t + 1000, this.idNumber)

		switch(this.type) {
			case 0: 
				// this.wheel0 = 1
				this.wheel1 = 1 - this.eye1.value()
				this.wheel0 = 1 - this.eye0.value()
				break
			case 1: 
				// this.wheel0 = 1
				this.wheel1 = this.eye0.value()
				this.wheel0 = this.eye1.value()
				break
			case 2: 

				//Curiosity
				// this.wheel0 = 1
				this.wheel1 = 1 - this.eye0.value()
				this.wheel0 = 1 - this.eye1.value()
				break

			case 3: 
				this.wheel0 = this.eye0.value()
				this.wheel1 = this.eye1.value()
				break
		}
		
		
		

		// console.log(this.wheel0, this.wheel1)

		this.angle += (this.wheel0 - this.wheel1)*.3

		let driveForce = 200*(this.wheel0 + this.wheel1) + 1
		this.force.setToPolar(driveForce, this.angle)

		// Avoid all others
		bugs.forEach(bug => {
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
			
	}
}

/*
switch(this.type) {
				// Love
				
			case 0:

				this.wheel0 = 1 - this.eye0.value()
				this.wheel1 = 1 - this.eye1.value()
				break;
			case 1:
				// Hate
				this.wheel0 = this.eye0.value()
				this.wheel1 = this.eye1.value()
				break;
			case 2:
				// Curiosity
				this.wheel0 = 1 - this.eye1.value()
				this.wheel1 = 1 - this.eye0.value()
				break;
			case 3:
				// Cowardice
				this.wheel0 = this.eye1.value()
				this.wheel1 = this.eye0.value()
				break;

		}
	*/