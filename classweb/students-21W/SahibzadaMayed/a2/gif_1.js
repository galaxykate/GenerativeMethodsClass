  function setup() {
  createCanvas(600, 400, WEBGL);
}

function draw() {
  let from = color(25, Math.floor((Math.random())*25), 0);
  let to = color(Math.floor((Math.random())*100), 100, 105);
  let b = Math.floor((Math.random())*2);
  l1 = lerpColor(from,to, 0.5);
  l2 = lerpColor(to,from, 0.5);
  background(100,10,20);
  
  // When the user clicks the mouse button
  if (mouseIsPressed) {
  rotateY(frameCount * 0.004);
  for (let j = 0; j < 10; j++) {
    push();
    for (let i = 0; i < 50; i++) {
      translate(sin(frameCount * 0.001 + j) * 100, cos(frameCount * 0.001 + j) * 100, i * 0.1);
      rotateZ(frameCount * 0.005);
      push();
      cone(6,6);
      fill(l2);
      pop();
                                 } // Close inner for loop
      pop();
                               } //Close outer for loop
                       } // Close if loop
  
  // When the user doesn't do anything
  else  {
     rotateZ(frameCount * 0.01);
      for (let j = 0; j < 10; j++) {
    push();
    for (let i = 0; i < 50; i++) {
      translate(sin(frameCount * 0.001 + j) * 100, cos(frameCount * 0.001 + j) * 100, i * 0.1);
      rotateZ(frameCount * 0.005);
      push();
      ellipsoid(2,6);
      fill(l2);
      pop();
                                } // Close inner for loop
    pop();
                                   } //Close outer for loop
      } //Close else loop
} // Close function draw
