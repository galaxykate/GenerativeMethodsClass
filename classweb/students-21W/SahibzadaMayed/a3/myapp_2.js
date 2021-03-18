var hue;

function setup() {
  createCanvas(500, 500);
  background(0);
  hue = 0;
  
  // Button for saving the canvas locally on your computer
  saveButton = createButton('Save');
  saveButton.mousePressed(saveFile);

  // Button for clearing the canvas
  clearCanvas = createButton('Clear');
  clearCanvas.mousePressed(clearcanvas);

}

function draw() {
}

function mouseDragged() {
  if (hue > 360) {
    hue = 0;
  } else {
    hue += 5;
  }
  colorMode(HSL, 360);
  noStroke();
  fill(hue, 220,220);
  ellipse(mouseX, mouseY, 10, 10);
}


// Save File Function
function saveFile() {
  save('my-canvas.jpg');
}

// Clear Screen function
function clearcanvas() {
  background(0);
}

