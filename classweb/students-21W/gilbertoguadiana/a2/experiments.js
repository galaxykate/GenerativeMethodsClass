2// Store cool experiments I find while doing assignment 2.

// weird looking bats
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
      // set fill of the circles we make
      p.fill(hue, 100, pct*100)

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

      // You can add text with P5 too, for debugging or for style
      // Uncomment these to label the circles with a number
        p.noStroke()
      p.fill(0)
      p.text("Bat #" + i, x - 20, y)
    }
  }

  // Starter code:
  // Setup a P5 instance with these draw and setup functions
  let element = getP5Element(0) // My function to get the element for this index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// side to side randomness with fading. figure out looping
function setupDrawing1() {

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {

    // Draw a semi-transparent background every 10 frames.
    if (p.frameCount % 10 == 0)
      p.background(0, 0, 0, 0.5);

    // Make a percent that goes from 0-1 every 6 seconds
    let t = p.millis() * .001
    let loopPct = (t / 2) % 1

    // Go all the way across the screen for each loop
    let x = loopPct * p.width

    // predictable movement in purple with sine wave
    let bounceFrequency = 50
    let bounceX = Math.sin(loopPct * bounceFrequency) * p.width;
    p.fill(18, 90, 58)
    p.stroke(18, 90, 58)

    p.noiseDetail(5, .9)

    let count = 10;
    for(i = 0; i<count; i++){
      let pct = i/count;
      y = pct*p.height + 10
      let noiseX = p.noise((3*loopPct+pct)*5)
      let bounceX = (Math.sin(loopPct * bounceFrequency)*p.width + noiseX*p.width) % p.width;
      p.circle(bounceX, y, 10)
    }

  }


  let element = getP5Element(1) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// moving text with trails
function setupDrawing2() {
  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    let w = p.width
    let h = p.height

    // go through the color wheel
    let hue = (100 + p.frameCount) % 360

    let t = p.frameCount * .001
    let x = .4 * w * Math.cos(t * 10) + w / 2
    let y = .4 * h * Math.sin(t * 14) + h / 2

    p.push()
    p.translate(x, y)

    let angle = Math.sin(t * 20)
    //p.rotate(angle)

    let scale = 2 * Math.sin(t * 14) + 3
    p.scale(scale, scale)

    p.strokeWeight(4)
    p.stroke(hue, 100, 50,0.1) // Oh, this looks nice if I reduce the alpha
    p.fill(hue, 80, 80)

    p.text("Gilberto", 0, 0)
    p.pop()
  }


  let element = getP5Element(2) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// cool looking speaker
function setupDrawing3() {

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {

    p.background(0, 0, 0, .3);

    let t = p.frameCount * .01

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
        let offsetX = 200 * p.noise(t + 500, j * .1) - 80
        let offsetY = 200 * p.noise(t + 600, j * .1) - 80 % p.height/2

        let hue = 360 * i / sides
        p.fill(hue, 100, 30 + 60 * j / dotCount, .5)
        p.circle(offsetX, 0, 10)
        p.fill(hue, 100, 90)
        p.circle(offsetX, offsetY, 5)
      }

    }

    // Always match each push to a pop.
    // Pop() resets the translation to where it was at the last
    // pop, no matter how many transformations there were
    p.pop()

  }


  let element = getP5Element(3) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// noisy spirals
function setupDrawing4() {

  // Pick out a random hue,
  // and declare it up here in the outer scope
  // where both setup and draw have access to it

  let hue = Math.random() * 360

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    p.background(0, 0, 50)
    let t = p.millis() * .001

    p.push()
    p.translate(p.width / 2, p.height / 2)

    p.noiseDetail(5, 0.3);


    let count = 130
    for (var i = 0; i < count; i++) {
      let theta = i * .1 + 3*t
      // I'm using "r" as a radius
      // it gets bigger with bigger i values
      // so it spirals outwards
      // But also I'm adding some noise
      // so it wiggles a bit
      let r = i + 70 * p.noise(i * .1 + t * 2, 3*t)

      // Convert from polar coordinates to x,y
      let x = r * Math.cos(theta)
      let y = r * Math.sin(theta)

      p.line(0, 0, x+30*p.noise(i * .1 + t * 2, 3*t), y+10*p.noise(i * .1 + t * 2, 3*t))
      p.fill(0, 100, 100)
      p.circle(x, y, i * .1 + 1)

    }


    p.pop()
  }


  let element = getP5Element(4) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// racing circles in loops
function setupDrawing5() {

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


  let element = getP5Element(5) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// pacman?
function setupDrawing6() {
  let loopLength = 6

  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    p.background(0, 0, 0)
    let t = p.millis() * .001


    p.push()
    p.translate(p.width / 2, p.height / 2)

    let shapes = 5

    for (var i = 0; i < shapes; i++) {
      p.beginShape()

      p.stroke(0, 100, 100)
      p.fill(i * 10, 100, 50, .2)

      let sides = 33

      for (var j = 0; j < sides; j++) {
        let theta0 = Math.PI * 2 * (j) / sides
        let r0 = (40 + 2 * i * i) * getLoopingNoise({
          p: p,
          loopLength: loopLength,
          radius: i,
          offset: j * .3 + i
        }) + i * 20
        p.vertex(r0 * Math.cos(theta0), r0 * Math.sin(theta0))

      }
      p.vertex(10,10)
      p.vertex(30,30)
      p.vertex(80,120)
      p.endShape(p.CLOSE)

    }

    p.pop()
  }


  let element = getP5Element(6) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// spiral
function setupDrawing7() {

  let hue = Math.random() * 360
  let loopLength = 6



  function setup(p) {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode(p.HSL);
    p.background(0);
  }

  function draw(p) {
    p.background(0, 0, 0)

    let t = p.millis() * .001

    p.push()
    p.translate(p.width / 2, p.height / 2)

    // Make a blue-purple gradient by stacking circles
    for (var i = 0; i < 6; i++) {
      p.fill(210 + i * 10, 100, 20, .1)
      let r = 1 + .2 * i
      p.ellipse(0, 0, r * 200, r * 140)
    }

    // Here's a function to draw a star that fades out as it ages
    function drawStar(index, agePct) {
      // Goes from 0 to 1 to 0, smoothly
      let fade = Math.sin(agePct * Math.PI)


      // Draw the center
      p.noStroke()

      // Flicker 10 times per lifespan
      let blink = .6 + .3 * Math.sin(agePct * Math.PI * 20)
      p.fill(0, 100, 100, fade * blink)
      p.circle(0, 0, 5)

      p.fill((index * 20) % 360, 100, 80, fade * blink * .1)
      p.circle(0, 0, 25 * blink)

      p.fill(0, 100, 100, fade * .8)
      p.beginShape()
      let starPts = 6

      for (var i = 0; i < starPts; i++) {
        let theta = Math.PI * 2 * i / starPts
        // Use noise to ascillate the length of the star's "arms"
        // for a twinkling effect
        let r = fade * 20 * (i % 2 + .2) * p.noise(i + index, 10 * agePct)
        p.vertex(r * Math.cos(theta), r * Math.sin(theta))
      }
      p.endShape()
    }

    let starCount = 90
    for (var i = 0; i < starCount; i++) {
      // Each star has an age, and cycles from 0 to 1
      // But with an offset, so they don't all do it at the same time
      let agePct = ((i * 2.9 + t) % loopLength) / loopLength

      // Arrange the stars in a spiral
      let r = 10 * Math.pow(i, .9)
      let theta = 1.2 * Math.pow(i, .8)

      let x = r * Math.cos(theta)
      let y = r * Math.sin(theta)

      p.push()
      p.translate(x, y)

      drawStar(i, agePct)
      p.pop()

    }
    p.pop()

  }


  let element = getP5Element(7) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}

// SVG nonsense
function setupDrawing8() {

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

    let loopPct = (p.millis() * .001 / loopLength) % 1

    //p.background(0, 0, 0, .05)
    p.stroke("red")
    p.fill(26,100,70,0.1)

    // coordinate transforms to draw the SVG in the middle and upright
    p.push()
    p.translate(p.width / 2, p.height / 2);
    p.rotate(Math.PI)
    svgImage.draw(p)
    p.pop()



    let count = 10;
    for (var i = 0; i < count; i++){
      let pct = i/count
      p.fill(5,100,70,0.1);
      p.circle(p.width/2,pct*p.height/2,10)
    }

    p.push()
    p.translate(p.width / 2, p.height / 2)

    let shapes = 5

    for (var i = 0; i < shapes; i++) {
      p.beginShape()

      p.stroke(0, 100, 100)
      p.fill(i * 10, 100, 50, .2)

      let sides = 33

      for (var j = 0; j < sides; j++) {
        let theta0 = Math.PI * 2 * (j) / sides
        let r0 = (40 + 2 * i * i) * getLoopingNoise({
          p: p,
          loopLength: loopLength,
          radius: i,
          offset: j * .3 + i
        }) + i * 20
        p.vertex(r0 * Math.cos(theta0), r0 * Math.sin(theta0))

      }
      p.vertex(10,10)
      p.vertex(30,30)
      p.vertex(80,120)
      p.endShape(p.CLOSE)

    }

    p.pop()

  }


  let element = getP5Element(8) // <- Make sure to change this to the right index
  let myP5 = new p5(function(p) {
    p.setup = () => setup(p)
    p.draw = () => draw(p)
  }, element);
}
