//used to display the selected mode name on screen
const modes = {
  flag: "Party flag",
  snitch: "Snitch",
  marker: "Permanent marker",
};
const width = 600;
const height = 400;

//keeping track of where mouse was dragged for drawing party flag/marker line
let mousePositions = [];
//keeping track of where snitch was created for animating snitch
let snitchPositions = [];
//keeping track of snitch wings position. 2 options are base and spread
let snitchWingsPosition = "base";
//mode of the drawing tool. Flag is the default
let mode = "flag";
//keeping a global P5 object to enable clear canvas
let p5Obj = undefined;

//clears the canvas and empties mousePositions, snitchPositions
function clearCanvas() {
  p5Obj.background("white");
  mousePositions = [];
  snitchPositions = [];
}

//check if a click was within canvas since events are received for any click in browser
function withinLimits(p) {
  return (
    p.mouseX >= 0 && p.mouseX <= width && p.mouseY >= 0 && p.mouseY <= height
  );
}

/*
Sets mode of drawing tool. 
Displays the name of the mode on screen. 
Decides if color picker needs to be displayed (shown only for marker mode)
*/
function setMode(chosenMode) {
  mode = chosenMode;
  const modeDisplay = document.getElementById("mode-display");
  modeDisplay.textContent = `Selected mode: ${modes[mode]}`;
  const colorPicker = document.getElementById("colour");
  if (chosenMode == "marker") {
    colorPicker.hidden = false;
  } else {
    colorPicker.hidden = true;
  }
}

//sets color of color picker text to chosen color
function setColor(colorPicker) {
  //console.log(colorPicker)
  document.documentElement.style.setProperty("--my-color", colorPicker.value);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Home page loaded");

  //hides color picker on page load since default mode is flag and not marker
  const colorPicker = document.getElementById("colour");
  colorPicker.hidden = true;

  //shows default selected mode text
  const modeDisplay = document.getElementById("mode-display");
  modeDisplay.textContent = `Selected mode: ${modes[mode]}`;

  const canvasHolder = document.getElementById("canvas");

  p5Obj = new p5(function (p) {
    p.setup = () => {
      p.createCanvas(width, height);
      p.colorMode(p.HSL);
      p.background("white");
    };

    p.mouseClicked = () => {
      //if correct mode and click was within screen then draw snitch
      if (mode == "snitch" && withinLimits(p)) {
        // console.log('clicked', p.mouseX, p.mouseY);
        snitch(p, p.mouseX, p.mouseY);
        snitchPositions.push([p.mouseX, p.mouseY]);
      }

      //adding a return false as P5 recommends this
      return false;
    };

    p.mouseReleased = () => {
      //adding this to avoid a huge shape being drawn if mouse is released and pressed again
      mousePositions = [];
    };

    p.mouseDragged = () => {
      //if mouse position was within limits then add it to mousePositions
      if (withinLimits(p)) {
        mousePositions.push([p.mouseX, p.mouseY]);
      }

      //call appropriate function based on mode
      if (mode == "flag") {
        flag(p);
      } else if (mode == "marker") {
        //select and set fill color from color picker
        const colorPicker = document.getElementById("colour");
        p.stroke(colorPicker.value);
        marker(p);
      }
    };

    p.draw = () => {
      //animate snitch wings
      moveSnitchWings(p);
    };
  }, canvasHolder);
});

//draws the snitch
function snitch(p, x, y, wingPosition) {
  //Recommended practice: Push before any translation/rotation operation
  p.push();
  //translate to (x,y) which is where mouse was clicked.
  p.translate(x, y);

  const radius = 15;
  //based on wing position, set wing multipler which will decide where the wing end point is 
  const wingMultipler = wingPosition == "base" ? 1 : -1;

  //angles chosen based on visual effect
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
    leftWingStart[0] - 80,
    leftWingStart[1] - wingMultipler * 5,
  ];
  const rightWingEnd = [
    rightWingStart[0] + 80,
    rightWingStart[1] - wingMultipler * 5,
  ];

  //use vector library to get magnitude of the vector that represents difference between wing start and end
  const leftWingDifference = vector.getSub(leftWingEnd, leftWingStart);
  const leftWingMagnitude = vector.magnitude(leftWingDifference);
  const rightWingDifference = vector.getSub(rightWingEnd, rightWingStart);
  const rightWingMagnitude = vector.magnitude(rightWingDifference);

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
  rectangle has following properties: 
  starting X coordinate: X coordinate of left wing end which is the left most point of snitch
  starting Y coordinate: -radius which represents top most point of snitch (since we translated origin to x,y)
  width: difference of X coordinate of right wind end and left wing end
  height: diameter of snitch
  */
  p.rect(leftWingEnd[0], -radius, rightWingEnd[0] - leftWingEnd[0], radius * 2);

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

//animates the wings of the snitch
function moveSnitchWings(p) {
  //run every 8 frames
  if (p.frameCount % 8 == 0) {
    /*
    call snitch function with the required snitch wing position
    hard coding wing position in function call(lines 257, 262) as no await is being used i.e. no promise for order of execution
    switch snitch wing position to the other value i.e. switch base to spread and vice versa
    */
    if (snitchWingsPosition == "base") {
      snitchPositions.map((snitchPosition) => {
        snitch(p, snitchPosition[0], snitchPosition[1], "base");
      });
      snitchWingsPosition = "spread";
    } else {
      snitchPositions.map((snitchPosition) => {
        snitch(p, snitchPosition[0], snitchPosition[1], "spread");
      });
      snitchWingsPosition = "base";
    }
  }
}

//draw party flag
function flag(p) {
  //get every 4th point
  const everyFourth = mousePositions.filter((element, index) => {
    return (mousePositions.length - index) % 4 === 0;
  });

  //fetch last 2 points from array of every 4 points
  const count = 2;
  const lastTwo = everyFourth.slice(everyFourth.length - count);

  if (lastTwo.length > 0 && mousePositions.length % 4 === 0) {
    p.beginShape();
    //declare first point as vertex since we cannot reference it in bezier vertex
    p.vertex(...lastTwo[0]);
    p.stroke(0);
    p.strokeWeight(1);
    //randomise fill colour
    p.fill(Math.random() * 360, 100, 50, 0.5);

    for (var i = 1; i < lastTwo.length; i++) {
      const previous = lastTwo[i - 1];
      const current = lastTwo[i];
      const difference = vector.getSub(current, previous);
      const magnitude = vector.magnitude(difference);
      //calculate control points. Value was chosen based on visual effect. 
      const controlPoint1 = [previous[0], previous[1] + magnitude];
      const controlPoint2 = [current[0], current[1] + magnitude];

      /*
      create bezier vertex. 
      control point 2 used as control point 1 and vice versa.
      Same reason as in snitch i.e. to get a sharp corner in the curve.
      */
      p.bezierVertex(...controlPoint2, ...controlPoint1, ...current);
    }
    //closed shape ensures border line drawn
    p.endShape(p.CLOSE);
  }
}

//allow user to draw as if with a permanent marker
function marker(p) {
  const previous = mousePositions[mousePositions.length - 2];
  const current = mousePositions[mousePositions.length - 1];
  //calculate speed to vary stroke width
  const speed = Math.sqrt(p.movedX * p.movedX + p.movedY * p.movedY);
  if (previous) {
    p.strokeWeight(speed);
    p.line(...previous, ...current);
  }
}
