
function setup() {
 createCanvas(600, 400, WEBGL);
speedslider = createSlider( 0,  0.0005, 0.0, 0.0001)
speedlabel = createButton('Attack Speed!')
}




function draw() {
  background(100,10,20);
  
     rotateZ(frameCount * 0.01);
      for (let j = 0; j < 10; j++) {
    push();
    for (let i = 0; i < 50; i++) {
      translate(sin(frameCount * 0.001 + j) * 100, cos(frameCount * 0.001 + j) * 100, i * 0.1);
      rotateZ(frameCount * speedslider.value());
      push();
      cone(6,6);
      fill(255);
      pop();
                                } // Close inner for loop
    pop();
                                   } //Close outer for loop
  
} // Close function draw
