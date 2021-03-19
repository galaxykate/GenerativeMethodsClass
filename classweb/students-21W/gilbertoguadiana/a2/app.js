// Utility functions
// Given a processing object, a loop length, a radius, and an offset (optional)
function getLoopingNoise({
  p,
  loopLength,
  radius,
  offset = 0
}) {
  let t = p.millis()

  // This number should go from 0 to 1 every loopLength seconds
  // And PI*2 radians every loopLength seconds
  let noiseScale = 1
  let loopPct = (t * .001 / loopLength) % 1

  let theta = 2 * Math.PI * loopPct

  // Place to sample the noise from
  let x = radius * Math.cos(theta)
  let y = radius * Math.sin(theta)

  let noiseVal = p.noise(x * noiseScale, y * noiseScale, offset)
  return noiseVal
}


function getP5Element(index) {
  let element = document.getElementById("drawing" + index).getElementsByClassName("drawing-p5holder")[0]
  return element
}


//===========================================================

const WIDTH = 300
const HEIGHT = 300

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello, animation!")

  // Rename your drawing here if you want
  let drawingTitles = ["Wordy Bats",
    "Dot Constellations",
    "Boombox Speaker",
    "Racing",
    "Nuclear Campfire"
  ]
  let mainElement = document.getElementById("main")

  // Ignore this section if you want
  // This is me adding a label and a canvas-holder to each swatch
  // For each drawing
  for (var i = 0; i < 5; i++) {
    let el = document.createElement("div")
    el.className = "drawing"
    el.id = "drawing" + i
    mainElement.append(el)


    // Add a label
    let label = document.createElement("div")
    label.className = "drawing-label"
    label.innerHTML = "Drawing #" + i + ":" + drawingTitles[i]
    el.append(label)

    // Add a div to hold the canvas (so we can resize it independently of the outer frame)
    let canvasHolder = document.createElement("div")
    canvasHolder.className = "drawing-p5holder"
    canvasHolder.style = `width:${WIDTH};height:${HEIGHT}`
    el.append(canvasHolder)
  }

  // Comment out these lines to not draw each
  setupDrawing0()
  setupDrawing1()
  setupDrawing2()
  setupDrawing3()
  setupDrawing4()

});


function setupDrawing0() {

  // Do things *once, before* P5 starts drawing
  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);

    // Set the color mode to HSL colors
    p.colorMode(p.HSL);

    // Set the background of the canvas
    p.background(115,51,63);
  }

  // Do this for every frame
  function draw(p) {
    // Paint the previous canvas to erase it. Pass in HSL values for color
    p.background(115,51,63);

    // Get the time past in seconds
    let t = p.millis() * .001
    // change the hue based on the time spent
    let hue = (t * 100) % 360

    let count = 10
    for (var i = 0; i < count; i++) {

      // Save where we are in the count to get gradual changes
      let pct = i / count
      // set fill of the circles we make. Change color over time
      p.fill(hue*Math.sin(t * 1 + i * 1), 100, pct*100)

      // A stroke (outline) aound the circle will be slightly darker
      // than the main color (pct*100 - 20)
      p.strokeWeight(10)
      p.stroke(hue, 100, pct * 100 + 10)

      // draw circles from left to right of the canvas
      let x = pct * p.width

      // change the y value to go up and down asynchronously
      let y = (.5 + .5 * Math.sin(t * 1 + i * 1)) * p.height
      p.triangle(x, y, x/2, y, x/2, 2*y)
      p.triangle(x, y, 1.5*x, y, 1.5*x, 2*y)
      p.ellipse(x, y, 60, 60)

      p.noStroke()
      p.fill(0)

      // generate changing text
      let stringLength = 4;
      let displayString = String.fromCharCode(i+65)

      for(let j = 0; j<stringLength; j++){
        let pctDone = j/stringLength
        let charValue = Math.floor(10*Math.sin(t * 1 + i * 1)*pctDone)
        let appendedString = String.fromCharCode(i+65+charValue)
        displayString = displayString.concat(appendedString)
      }
      p.text(displayString, x - 20, y)
    }
  }

  let element = getP5Element(0)
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

function setupDrawing1() {

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {

    // Draw a semi-transparent background every 10 frames.
    if (p.frameCount % 10 == 0)
      p.background(0, 0, 0, 0.3);

    // Make a percent that goes from 0-1 every 3 seconds
    let t = p.millis() * .001
    let loopPct = (t / 3) % 1

    // Go all the way across the screen for each loop
    let x = loopPct * p.width

    let bounceFrequency = 50
    let bounceX = Math.sin(loopPct * bounceFrequency) * p.width;
    p.fill(18, 90, 58)
    p.stroke(18, 90, 58)

    p.noiseDetail(5, .9)

    let count = 10;
    for(i = 0; i<count; i++){
      let pct = i/count;
      y = pct*p.height + 10
      let noiseX = p.noise(pct*loopPct*5)
      let bounceX = (Math.sin((pct+.1)*loopPct * bounceFrequency)*p.width) % p.width;
      p.circle(bounceX, y, 10)
    }

  }


  let element = getP5Element(1) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

function setupDrawing2() {

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {

    p.background(0, 0, 0, .3);

    let t = p.millis() *.001
    let loopTime = 6;

    // Sometimes its easiest to translate into the center of the screen
    // so that the origin (0,0) is at the center and not the top left
    p.push()
    p.translate(p.width / 2, p.height / 2)

    p.noStroke()
    p.fill(0, 100, 100)

    // See? The (0,0) point is now in the center of the screen
    p.circle(0, 0, 10, 10)


    let sides = 30

    for (var i = 0; i < sides; i++) {

      p.rotate(Math.PI * 2 / sides)


      // Create a number of dots that are positioned with noise
      let dotCount = 10
      for (var j = 0; j < dotCount; j++) {
        let offsetX = 200 * p.noise(t/loopTime + 500, j * .1) - 80
        let offsetY = 200 * p.noise(t/loopTime + 600, j * .1) - 80 % p.height/2

        let hue = 360 * i / sides
        p.fill(hue, 100, 30 + 60 * j / dotCount, .5)
        p.circle(offsetX, 0, 10)
        p.fill(hue, 100, 90)
        p.circle(offsetX, offsetY, 5)
      }

    }

    p.pop()

  }


  let element = getP5Element(2)
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

function setupDrawing3() {

  // This is a demonstration of a trick that I use to create looping noise
  // (you can use it with the function getLoopingNoise
  // without knowing how it works)

  // Variables that we want *everything* to have access to
  let noiseScale = .04
  let noiseOffset = 100

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);

    let tileCount = 60
    let tilesW = p.width / tileCount
    let tilesH = p.height / tileCount
    p.noiseDetail(5, 0.3);

    // Create a grid of squares to show a 2D noise function

    p.noStroke()
    for (var i = 0; i < tileCount; i++) {
      for (var j = 0; j < tileCount; j++) {
        let x = tilesW * i
        let y = tilesH * j
        let noiseVal = p.noise(x * noiseScale + noiseOffset, y * noiseScale + noiseOffset)

        p.fill(0, 0, noiseVal * 100)
        p.rect(x, y, tilesW, tilesH)

      }
    }
  }

  function draw(p) {
    let t = p.millis()

    // Go around the loop every 6 seconds
    let loopPct = (t / 6000) % 1
    let theta = loopPct * Math.PI * 2

    // Center the origin
    p.push()
    p.translate(p.width / 2, p.height / 2)

    for (var i = 0; i < 5; i++) {
      let theta1 = theta + p.noise(2+i,2+i)
      let r = 30 + 30 * i
      let x = r * Math.cos(theta1)
      let y = r * Math.sin(theta1)

      let noiseVal = p.noise(x * noiseScale + noiseOffset, y * noiseScale + noiseOffset)
      let radius = 40 * noiseVal
      p.fill(0, 0, 100 * noiseVal)

      p.stroke(0)
      p.circle(x, y, radius)
    }

    p.pop()
  }


  let element = getP5Element(3)
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

function setupDrawing4() {

  let loopLength = 6

  let svgs = [campFireSVG]

  // Use my included SVG library to load these commands and scale the SVG
  // This library lets me load the SVG, but also scale it to fit a certain size
  // Since SVGs can be any size, this keeps any possible SVG I load to a uniform size
  // ...so that I don't have to change the rest of the drawing code
  let svgImage = new SVGImage(svgs[0])
  svgImage.scaleToFit(WIDTH * .7, HEIGHT * .7, true)


  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {

    let loopPct = (p.millis() * .001 / loopLength) % 6

    //p.background(0, 0, 0, .05)
    p.stroke("red")
    p.fill(26,100,70,0.1)

    // coordinate transforms to draw the SVG in the middle and upright
    p.push()
    p.translate(p.width / 2, p.height / 2);
    p.rotate(Math.PI)
    svgImage.draw(p)
    p.pop()

    // let count = 10;
    // for (var i = 0; i < count; i++){
    //   let pct = i/count
    //   p.fill(5,100,70,0.1);
    //   p.circle(p.width/2,pct*p.height/2,10)
    // }

    p.push()
    p.translate(p.width / 2, p.height / 2)

    let shapes = 5

    for (var i = 0; i < shapes; i++) {
      p.beginShape()

      p.stroke(0, 100, 100)
      p.fill(i * 10, 100, 50, .2)

      let sides = 33

      for (var j = 0; j < sides; j++) {
        let theta0 = -(Math.PI * 2 * (j) / sides) % (Math.PI)
        let r0 = (40 + 2 * i * i) * getLoopingNoise({
          p: p,
          loopLength: loopLength,
          radius: i,
          offset: j * .3 + i
        }) + i * 20
        p.vertex(r0 * Math.cos(theta0), r0 * Math.sin(theta0)+200)

      }

      p.endShape(p.CLOSE)

    }

    p.pop()

  }


  let element = getP5Element(4) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}
