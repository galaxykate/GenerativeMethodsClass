//width and height for the canvas
const width=400
const height=400

//get canvas holder element based on index
function fetchElement(index) {
  let element = document.getElementById("sub-holder" + index).getElementsByClassName('canvas-holder')[0];
  console.log(element);
	return element;
}

//get a random number within size
function getRandom(size){
  return Math.floor(Math.random()*size);
}

document.addEventListener("DOMContentLoaded", function(){
  console.log('page loaded');

  const holder = document.getElementById("holder");

  const drawingTitles = ['An optical illusion', 'Bounce!', 'A battle with malfunctional light sabers']
  
  for (var i = 0; i < 3; i++) {
		let el = document.createElement("div")
		el.className = "sub-holder"
		el.id = "sub-holder" + i
    holder.append(el)
    
    // Add a label
		let label = document.createElement("div")
		label.className = "sub-holder-label"
		label.innerHTML = drawingTitles[i]
		el.append(label)


		// Add a div to hold the canvas
		let canvasHolder = document.createElement("div")
		canvasHolder.className = "canvas-holder"
		el.append(canvasHolder)
  }
  
  spiral();
  ball();
  battle();
})

//draw an archimedes spiral that gives an optical illusion
function spiral(){
  let angle=0

  function setup(p){
    p.createCanvas(width, height);
    //using theta in degrees so need angle mode to be degrees
    p.angleMode('degrees');
    //best visual effect
    p.frameRate(12);
  }

  function draw(p){
    p.background('black');
    
    //good practice to push and pop when transformations/translations are involved
    p.push()
    
    p.translate(width/2, height/2);
    
    p.stroke('white');
    p.strokeWeight(10)
    
    angle=angle+0.01
    radius=0.1
    
    //keep track of previous point to know where to draw the line to. Start from origin on each redraw
    prevX=0
    prevY=0

    /*
    archimedes spiral equation is r = a * theta
    x = r * sin(theta)
    y = r * cos(theta)
    */
    for(i=0;i<3000;i++){
      //from equation above, a = r/theta
      a = angle===0 ? 0 : radius/angle
      
      //make x,y dependent on i and angle so that spiral becomes bigger and bigger 
      x = (a*(i+1)*angle)*Math.sin(angle);
      y = (a*(i+1)*angle)*Math.cos(angle);

      //console.log(prevX, prevY,x,y);
      
      //daw a line from previous point to current point and then make current point as previous point
      p.line(prevX, prevY, x,y);
      prevX=x;
      prevY=y;
      
      angle=angle+0.01
    }
    p.pop()
  }

  new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, fetchElement(0))
}

//draw a bouncing ball that follows basic laws of physics
function ball(){
  //randomly initialise position of the ball. Using 200 minus random value since origin is center of the canvas
  posX=200-getRandom(400)
  posY=200-getRandom(400)
  
  //randomly initialise velocities. Max velocity is 10
  vX = 4 + getRandom(6)
  vY = 3 + getRandom(7)
  
  ballRadius=25

  function setup(p){
    p.createCanvas(width, height);
    //using theta in degrees so need angle mode to be degrees
    p.angleMode('degrees');
  }

  function draw(p){
    //last param i.e. 20 is for opacity
    p.background(p.color('#87CEFA'), 20);
    
    //good practice to push and pop when transformations/translations are involved
    p.push()

    p.translate(width/2, height/2);
    
    //trying to use the 'disney effect' by bordering ball with a darker shade of the same color
    p.fill(p.color('#EE0000'));
    p.stroke(p.color('#BB0000'))
    
    //console.log(posX, posY)

    //p5 circle takes diameter as third param
    p.circle(posX,posY,ballRadius*2);
    
    //check if left or right border reached and if so reverse velocity in X direction
    if((posX-ballRadius)<(-1*width/2) || (posX+ballRadius)>width/2){
      vX = -1*vX;
    }

    //check if top or bottom border reached and if so reverse velocity in Y direction
    if((posY+ballRadius)>height/2 || (posY-ballRadius)<(-1*height/2)){
      vY = -1*vY;
    }

    //update position
    posX += vX
    posY += vY

    p.pop()
  }

  new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, fetchElement(1))
}

//battle scene with faulty (length changing) lightsabers and sparkling stars
function battle(){
  //Initialisations of noise variables
  let nx1=100
  let ny1=2000
  let nx2=2000
  let ny2=1000
  
  function setup(p){
    p.createCanvas(width, height);
    
    //using theta in degrees so need angle mode to be degrees
    p.angleMode('degrees');
  }

  function draw(p){
    p.background(0,0,0,25);

    //good practice to push and pop when transformations/translations are involved
    p.push()
    
    p.translate(width/2, height/2)

    /*
    drawing background/base
    trying to use the 'disney effect' by bordering base with a slightly darker shade
    */
    p.fill('#222222')
    p.stroke('#111111')
    p.arc(0,200,400,130,180,0)  

    p.fill('white')
    p.stroke('white')
    
    /*
      randomly initialising star positions and drawing them
      Stars are slightly persistent due to opacity
      Stars are drawn only in top half of canvas
      Star radius picked as 5 for visual effects
    */
    starx = width/2-getRandom(width)
    stary = -1*height/2+getRandom(height/2)
    //console.log(starx, stary)
    p.ellipse(starx,stary, getRandom(5), getRandom(5))

    p.noFill()
    p.stroke('white')
    p.strokeWeight(2)
    
    //drawing human 1. Values are based on visual effect
    //head
    p.circle(-70, 60, 30)
    //torso
    p.line(-70, 75, -70, 105)
    //legs
    p.line(-70, 105, -80, 143)
    p.line(-70, 105, -60, 140)
    //arms
    p.line(-70, 85, -50, 80)
    p.line(-70, 90, -50, 80)
  
    //drawing human 2. Values are based on visual effect
    //head
    p.circle(70, 60, 30)
    //torso
    p.line(70, 75, 70, 105)
    //legs
    p.line(70, 105, 80, 143)
    p.line(70, 105, 60, 140)
    //arms
    p.line(70, 85, 50, 80)
    p.line(70, 90, 50, 80)
  
    //updating noise variables
    nx1+=0.01
    ny1-=0.01
    nx2-=0.01
    ny2-=0.01

    /*
    sx1 is x coordinate of saber1, sy2 is y coordinate of saber2
    initial values such as -50, 80 and 50, 80 were chosen using intersection point of hands of the 2 humans
    overall range of sword length was decided based on visual effects
    order of the 2 variables sent to noise was randomly switched for y coordinates of the swords
    */
    sx1=-50+p.noise(nx1,ny1)*130;
    sy1=80-p.noise(ny1,nx1)*130;
    sx2=50-p.noise(nx2,ny2)*130;
    sy2=80-p.noise(ny2,nx2)*130;

    p.strokeWeight(10)

    //saber1. -50,80 is intersection of hands of human 1
    p.stroke('red')
    p.line(-50,80,sx1,sy1)
    
    //saber2. 50,80 is intersection of hands of human 2
    p.stroke('#00BFFF')
    p.line(50,80,sx2,sy2)

    p.pop()
  }

  new p5(function(p) {
		p.setup = () => setup(p)
		p.draw = () => draw(p)
	}, fetchElement(2))
}
