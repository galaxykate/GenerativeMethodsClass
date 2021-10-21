/*
  bludger - particle that moves towards seeker i.e. is in LOVE with seeker according to braitenberg terminology
  writes to red channel
*/
class Bludger {
  constructor(pos){
    this.position = new Vector(...pos);
    this.velocity = Vector.randomPolar(10)
    this.force = new Vector(0, 0)
		this.gravity = new Vector(0, 25)

    //for sensor
    this.eyeAngle = .6
    this.eyeRadius = 5

    //create sensor
    this.eye0 = new EyeSensor(new Vector(0,0))
    this.eye1 = new EyeSensor(new Vector(0,0))

    //wheels - represent directional movement even though they aren't rendered on screen
    this.wheel0 = 0
    this.wheel1 = 0

    //angle that particle is at 
    this.angle = Math.random()*Math.PI*2
  }

  //draw the bludger and its eyes
  draw(){
    p5Obj.noStroke()
    p5Obj.strokeWeight(1)
    p5Obj.fill("#800000")
    p5Obj.circle(...this.position, 40)    

    //set eyes position as diametrically opposite points - angle, 180+angle
    this.eye0.position.setToPolarOffset(this.position, this.eyeRadius, this.angle - this.eyeAngle)
		this.eye1.position.setToPolarOffset(this.position, this.eyeRadius, 180 + (this.angle - this.eyeAngle))
    
    /*
      draw eyes - the pupil becomes bigger/darker depending on lightmap values...
      ...only for the channels that this particle reads i.e. blue for bludger since it reads from the channel that seeker writes to
    */
    this.eye0.draw(p5Obj, [0,0,255])
		this.eye1.draw(p5Obj, [0,0,255])
  }

  //update bludger position
  update(dt){
    //get wheel positions from sensor value i.e. from the lightmap
    this.wheel0 = 1 - this.eye0.sense()[2]
    this.wheel1 = 1 - this.eye1.sense()[2]
    
    this.angle += (this.wheel0 - this.wheel1)*.3

    let driveForce = 200*(this.wheel0 + this.wheel1) + 1
		this.force.setToPolar(driveForce, this.angle)

    //update velocity and position based on calculated values
    this.velocity.addMultiples(this.force, dt)
    this.velocity.addMultiples(this.gravity, dt)
		this.position.addMultiples(this.velocity, dt)

    //update drag based on slider value
    let drag = 1 - SLIDERS.bludgerDrag.value()
 		this.velocity.mult(drag)

		//ensure particle comes back on screen using wrap around
		this.position[0] = (this.position[0] + width)%width
		this.position[1] = (this.position[1] + height)%height
  }

  //debug draw bludger - draws velocity vector, gravity vector and force vector
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
      color: [255, 255, 0],
    }) 
      
    this.force.drawArrow({
      p:p5Obj,
      center: this.position,
      multiple: forceDisplayMultiple,
      color: [0, 255, 0],
    }) 

	}

}

//manage bludger particles through easy interface
class Bludgers {

  constructor(n){
    this.bludgers=[]
    for(var i=0;i<n;i++){
      const position = new Vector(10+Math.random() * (width-20), 10 + Math.random() * (height-20))
      this.bludgers.push(new Bludger(position))
    }
  }

  draw(){
    this.bludgers.forEach(bludger => bludger.draw())
  }

  update(dt){
    this.bludgers.forEach((bludger) => bludger.update(dt))
  }

  addBludger(pos){
    this.bludgers.push(new Bludger(pos))
  }

  drawDebug(){
    this.bludgers.forEach(bludger => bludger.drawDebug())
  }
}