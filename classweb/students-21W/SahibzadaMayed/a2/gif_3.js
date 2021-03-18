var angle = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(Math.random()*15);
  angle += 0.05;
  stroke(255);
   
  translate(80,550)
  branch(20);
  translate(0,-100)
  branch(20);
  translate(0,-100)
  branch(20);
  translate(0,-100)
  branch(20);
  translate(0,-100)
  branch(20);
  translate(0,-100)
  branch(20);
  // Left hand side straight line ends here
  
  translate(100,200);
  branch(20);
  translate(100,100);
  branch(20);
  translate(100,-50);
  branch(20);
  translate(100,-50);
  branch(20);
  translate(0,150);
  branch(20);
  translate(0,130);
  branch(20);
  translate(0,140);
  branch(20);
  translate(0,140);
  branch(20);
  
}

function branch(length) {
  line(20,20,Math.random(),-length/2);
  line(20,20,Math.random(),length);
  translate(0, -length);
  if (length > 4) {
    push();
    rotate(-angle);
    branch(length * Math.random());
    pop();
    push();
    rotate(angle);
    branch(length * Math.random());
    pop();
    length ++;
  }

}
