
function setup() { 
  createCanvas(500, 500);
  angleMode(DEGREES);
  background(0);
  
   // Setting up the slider for the stroke weight
  sizeButton = createButton('Brush Size Slider');
  sizeSlider = createSlider(0.5, 4, 0.5, 0.5);
  
    // Setting up the slider for controlling the symmetry of the pattern
  SymmetryButton = createButton('Symmetry');
  symmetrySlider = createSlider(5, 20, 5, 1);
  
      // Setting up the slider for controlling the symmetry of the pattern
  // rainbowStroke = createButton('Rainbow Frenzy');
  // rainbowStroke.mousePressed(makerainbow)

// Button for saving the canvas locally on your computer
  saveButton = createButton('Save');
  saveButton.mousePressed(saveFile);

  // Button for clearing the canvas
  clearCanvas = createButton('Clear');
  clearCanvas.mousePressed(clearcanvas);
 
 
  
}

let tally = 0;
let track = 0;
// Save File Function
function saveFile() {
  save('my-canvas.jpg');
}

// Clear Screen function
function clearcanvas() {
  background(0);
  tally = 0;
  track = 0;
}

function makerainbow() {
tally = 1;
}

function makeMosaic()
{
 track = 1;
}

function draw() {
  translate(width / 2, height / 2);

    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;
    symmetry = symmetrySlider.value();
    let angle = 360 / symmetry;
    
    if (mouseIsPressed) {
      if (tally == 0 && track == 0){
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        strokeWeight(sizeSlider.value());
        line(mx, my, pmx, pmy); 
        stroke(255); 
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
      } //Close if loop
      
      
      else if (tally == 1 && track == 0) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        strokeWeight(sizeSlider.value());
        line(mx, my, pmx, pmy);
        stroke(Math.random()*255,Math.random()*255,Math.random()*255)
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
      } //Close else loop
      
      else if (tally == 1 && track == 1) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        strokeWeight(sizeSlider.value());
        line(mx, my, mx, my);
        stroke(Math.random()*255,Math.random()*255,Math.random()*255)
        push();
        scale(1, -1);
        line(mx, my, mx, my);
        pop();
      }
      } //Close else loop
      
       else if (tally == 0 && track == 1) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        strokeWeight(sizeSlider.value());
        line(mx, my, mx, my);
        stroke(255)
        push();
        scale(1, -1);
        line(mx, my, mx, my);
        pop();
      }
      } //Close else loop
      
      
      
    }
}
