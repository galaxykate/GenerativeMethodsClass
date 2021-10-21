//subtract two vectors - utility function
function getSub(v1, v0) {
  let dimension = 2
  v = [0,0]
  for (var i = 0; i < dimension; i++) {
    v[i] = v1[i] - v0[i]
  }
  return v
}

//snitch - moves randomly, writes to green channel
class Snitch {

  constructor(pos) {
    this.position = new Vector(...pos);
    this.velocity = Vector.randomPolar(10)
    //randomly generated force
    this.wingForce = new Vector(0, 0)
		this.gravity = new Vector(0, 25)
    this.wiggleForce = new Vector(0,0)
  }

  //draws the snitch
  draw(){
    const p = p5Obj;
    //all code reused from a3 drawing tool when I drew a snitch
    p.push();

    p.translate(...this.position);

    const radius = 10;
    
    const leftWingAngle = (225 * Math.PI) / 180;
    const rightWingAngle = (315 * Math.PI) / 180;

    //wing start points chosen as points on snitch i.e. circle
    const leftWingStart = [
      radius * Math.cos(leftWingAngle),
      radius * Math.sin(leftWingAngle),
    ];
    const rightWingStart = [
      radius * Math.cos(rightWingAngle),
      radius * Math.sin(rightWingAngle),
    ];

    /*
    values chosen based on visual effect
    wing multipler decides wing end position
    */
    const leftWingEnd = [
      leftWingStart[0] - 40,
      leftWingStart[1] + 1.5,
    ];
    const rightWingEnd = [
      rightWingStart[0] + 40,
      rightWingStart[1] + 1.5,
    ];

    //use vector library to get magnitude of the vector that represents difference between wing start and end
    const leftWingDifference = getSub(leftWingEnd, leftWingStart);
    const leftWingMagnitude = new Vector(...leftWingDifference).magnitude;
    const rightWingDifference = getSub(rightWingEnd, rightWingStart);
    const rightWingMagnitude = new Vector(...rightWingDifference).magnitude;

    /*
    create 2 control points for each wing
    values chosen based on experimentation/visual effect
    control points 1 and 2 are for the main wing shape
    control points 3 and 4 are for the wing line that connects wing start and wing end (via an almost straight line)
    */
    const leftWingControlPoint1 = [leftWingStart[0] + leftWingMagnitude / 4, leftWingEnd[1] + leftWingMagnitude / 3];
    const leftWingControlPoint2 = [leftWingStart[0] - leftWingMagnitude / 2, leftWingEnd[1] + leftWingMagnitude / 6];
    const leftWingControlPoint3 = [leftWingStart[0], leftWingStart[1] + 2];
    const leftWingControlPoint4 = [leftWingEnd[0], leftWingEnd[1] + 2];

    const rightWingControlPoint1 = [rightWingStart[0] - rightWingMagnitude / 4, rightWingEnd[1] + rightWingMagnitude / 3];
    const rightWingControlPoint2 = [rightWingStart[0] + rightWingMagnitude / 2, rightWingEnd[1] + rightWingMagnitude / 6];
    const rightWingControlPoint3 = [rightWingStart[0], rightWingStart[1] + 2];
    const rightWingControlPoint4 = [rightWingEnd[0], rightWingEnd[1] + 2];

    //drawing rectangle to erase previous wing position drawing
    p.strokeWeight(1);
    p.stroke("white");
    p.fill("white");
    
    /*
    drawing snitch body
    using "disney effect" of having slightly darker border
    */
    p.stroke("#a17f1a");
    p.fill("#efbf65");

    p.circle(0, 0, radius * 2);

    /*
    drawing wings
    using "disney effect" of having slightly darker border
    */
    p.stroke("#a0a0a0");
    p.fill("#d3d3d3");

    /*
    drawing main left wing
    using control point 2 as control point 1 and control point 1 as control point 2
    ^ this is to get a sharp corner in the curve
    */
    p.bezier(
      ...leftWingStart,
      ...leftWingControlPoint2,
      ...leftWingControlPoint1,
      ...leftWingEnd
    );
    p.bezier(
      ...leftWingStart,
      ...leftWingControlPoint3,
      ...leftWingControlPoint4,
      ...leftWingEnd
    );
    /*
    drawing main right wing
    using control point 2 as control point 1 and control point 1 as control point 2
    ^ this is to get a sharp corner in the curve
    */
    p.bezier(
      ...rightWingStart,
      ...rightWingControlPoint2,
      ...rightWingControlPoint1,
      ...rightWingEnd
    );
    p.bezier(
      ...rightWingStart,
      ...rightWingControlPoint3,
      ...rightWingControlPoint4,
      ...rightWingEnd
    );

    //pop is important as every push must have a corresponding pop
    p.pop();
  }

  //update snitch position
  update(dt){
    /*
      calculate wing force and wiggle force
      wing force calculated randomly - chosen limits are based on visual effects
    */
    this.wingForce = new Vector(width/2-(Math.random() * width), -30*Math.random());
    const wiggleForce = 100*SLIDERS.snitchWiggleForce.value()
    this.wiggleForce.setToPolar(wiggleForce, 20*p5Obj.noise(...this.position))

    //update velocity and position
    this.velocity.addMultiples(this.gravity, dt)
		this.velocity.addMultiples(this.wingForce, dt)
    this.velocity.addMultiples(this.wiggleForce, dt)
    
    this.position.addMultiples(this.velocity, dt)
    
    //update position to avoid particle going off screen
    this.position[0] = (this.position[0]+width)%width
    this.position[1] = (this.position[1]+height)%height
		
    //drag force
    this.velocity.mult(.99)
  }

  //draw debug snitch - draws velocity, gravity, wiggle force and wing force
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
      
    this.wingForce.drawArrow({
      p:p5Obj,
      center: this.position,
      multiple: forceDisplayMultiple,
      color: [0, 255, 0],
    }) 

    this.wiggleForce.drawArrow({
      p:p5Obj,
      center: this.position,
      multiple: forceDisplayMultiple,
      color: [0, 255, 0],
    }) 

	}

}

//snitches class to maintain list of snitches for providing easy interface
class Snitches {

  constructor(n){
    this.snitches=[]
    for(var i=0;i<n;i++){
      const pos = new Vector(10+Math.random() * (width-20), 10 + Math.random() * (height-20))
      this.snitches.push(new Snitch(pos))
    }
  }

  draw(){
    this.snitches.forEach(snitch => snitch.draw())
  }

  update(dt){
    this.snitches.forEach((snitch) => snitch.update(dt))
  }

  addSnitch(pos){
    this.snitches.push(new Snitch(pos))
  }

  drawDebug(){
    this.snitches.forEach(snitch => snitch.drawDebug())
  }
}
