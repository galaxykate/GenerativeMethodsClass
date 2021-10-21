let count=0

/*
  seeker - particle that seeks the snitch i.e. is in LOVE with the snitch in terms 
  of braitenberg terminology and tries to dodge the bludger i.e. HATES the bludger
  in terms of the braitenberg terminology. Writes to blue channel
*/
class Seeker{
  constructor(position) {
    this.position = new Vector(...position)
    this.velocity = Vector.randomPolar(10)
    this.force = new Vector(0,0)
    this.gravity = new Vector(0,25)

    this.eyeAngle = .9
    this.eyeRadius = 8

    this.eye0 = new EyeSensor(new Vector(0,0))
    this.eye1 = new EyeSensor(new Vector(0,0))

    //using 6 wheel variables since seeker reads data from 2 channels - red and green
    this.wheel0 = 0
    this.wheel1 = 0

    //green channel data
    this.wheel00 = 0
    this.wheel11 = 0

    //red channel data
    this.wheel01 = 0
    this.wheel10 = 0
    
    //angle of seeker
    this.angle = Math.random()*Math.PI*2
	}

  //draw the seeker
  draw(p) {
		//eyes positioned at diametrically opposite points - angle, 180 + angle
		this.eye0.position.setToPolarOffset(this.position, this.eyeRadius, this.angle - this.eyeAngle)
		this.eye1.position.setToPolarOffset(this.position, this.eyeRadius, 180 + this.angle - this.eyeAngle)
		
		p.push()
		p.translate(...this.position)
		p.rotate(this.angle)
		
		p.fill("#eac086")
    p.stroke('black')
    p.strokeWeight(2)
    
    //head
    p.circle(0,0,30)

    //mouth
    p.line(-5, 7, 5,7)
    
    p.stroke("#ae0001")
    //torso
    p.line(0,15,0,50)
    
    //arms1
    p.line(0,20,15,40)
    p.line(0,20,5,40)
    
    p.stroke("#eac086")
    //forearms
    p.line(15,40,35,55)
    p.line(5,40,25,58)
    
    p.stroke("black")
    //left leg
    p.line(0,50,20,60)
    p.line(20,60,-10,75)
    
    p.stroke('#8b4513')
    p.strokeWeight(4)
    //broom handle
    p.line(70,50, -30,70);
    
    p.stroke('black')
    p.strokeWeight(2)
    //right leg - drawn after broom to give effect of one leg behind broom and one leg in front
    p.line(0,50,10,60)
    p.line(10,60,-20,75)

    p.stroke('#8b4513')
    p.strokeWeight(1)
    p.fill('#CD853F')
    //broom end
    p.beginShape()
    p.vertex(-30,70)
    //(0-90)/2 = average
    const average = -45
    p.bezierVertex(average,50, average, 50, -90,80)
    p.bezierVertex(average, 90, average,90, -30,70)
    p.endShape()
		p.pop()
	
		//draw eyes - channels needed are red and green
    this.eye0.draw(p, [255,255,0])
		this.eye1.draw(p, [255,255,0])
	}

  //update seeker position
  update(seekers, dt){

    //get channel data
    this.wheel0 = this.eye0.sense()
    this.wheel1 = this.eye1.sense()
    
    //get green channel data and convert to LOVE phenomenon
    this.wheel00 = 1 - this.wheel0[1]
    this.wheel11 = 1 - this.wheel1[1]

    //get red channel data and convert to HATE phenomenon
    this.wheel01 = this.wheel0[0]
    this.wheel10 = this.wheel1[0]
    
    //check which angle holds more power - named good and bad due to them representing snitch and bludger respectively
    this.goodAngle = this.wheel00 - this.wheel11
    this.badAngle = this.wheel01 - this.wheel10
    this.angle += this.goodAngle > this.badAngle ? this.goodAngle*.3 + this.badAngle*.15 : this.goodAngle*.15 + this.badAngle*.3

    //adjust drive force based on all values
    let driveForce = 200*(this.wheel00 + this.wheel11 + this.wheel10 + this.wheel01) + 1
    this.force.setToPolar(driveForce, this.angle)


    //avoid seeker collision
    seekers.forEach(seeker => {
      if(this!=seeker){
        let offset = Vector.getDifference(this.position, seeker.position)
				let d = offset.magnitude
				let range = 300
				if (d < range) {
					let avoidPower = 400*((range - d)/range)**3
					this.force.addMultiples(offset, -avoidPower/d)
				}
      }
    })

    //update velocity and position
    this.velocity.addMultiples(this.force, dt)
    this.velocity.addMultiples(this.gravity, dt)
		this.position.addMultiples(this.velocity, dt)

		//update drag based on slider value
    let drag = 1 - SLIDERS.seekerDrag.value()
 		this.velocity.mult(drag)

		//update position to avoid particle going off screen
		this.position[0] = (this.position[0] + width)%width
		this.position[1] = (this.position[1] + height)%height
  }

  //debug draw seeker - draws velocity vector, gravity vector and force vector
  drawDebug() {

    this.velocity.drawArrow({
      p:p5Obj,
      center: this.position,
      multiple: 1,
      arrowSize: 6,
      color: [0, 0, 0],
    }) 
      

    let forceDisplayMultiple = 1

    this.gravity.drawArrow({
      p:p5Obj,
      center: this.position,
      multiple: forceDisplayMultiple,
      color: [255, 0, 0],
    }) 
      
    this.force.drawArrow({
      p:p5Obj,
      center: this.position,
      multiple: forceDisplayMultiple,
      color: [0, 255, 0],
    }) 

	}

}

//class managing seeker providing easy interface
class Seekers {
  constructor(n){
    this.seekers = []
    for(var i=0;i<n;i++){
      const position = new Vector(10+Math.random() * (width-20), 10 + Math.random() * (height-20))
      this.seekers.push(new Seeker(position))
    }
  }

  draw(){
    this.seekers.forEach(seeker => seeker.draw(p5Obj))
  }

  update(dt){
    this.seekers.forEach(seeker => seeker.update(this.seekers, dt))
  }

  addSeeker(pos){
    this.seekers.push(new Seeker(pos))
  }

  drawDebug(){
    this.seekers.forEach(seeker => seeker.drawDebug())
  }
}