const width = 1000;
const height = 550;

//initially create 8 snitches, 5 seekers and 5 bludgers
const snitches = new Snitches(8);
const seekers = new Seekers(5);
const bludgers = new Bludgers(5);

const SLIDERS = {};
const FLAGS = {
  drawSnitchDebug: false,
  drawBludgerDebug: false,
  drawSeekerDebug: false,
};

let mode = "Snitch";
let paused = false;
let p5Obj = undefined;
let lightmap = undefined;
let background = undefined;

//copied code from professor kate to easily render a slider on screen
function createSlider({ label, min, max, defaultValue, step = 1 }) {
  //create a slider
  SLIDERS[label] = p5Obj.createSlider(min, max, defaultValue, step);

  //get and create elements to hold the slider
  let controls = document.getElementById("controls");
  let holder = document.createElement("div");
  holder.className = "slider";
  holder.innerHTML = label;

  //attach the slider
  controls.append(holder);
  holder.append(SLIDERS[label].elt);
}

/*
set the create mode i.e. what gets added to the canvas when mouse is clicked
modes possible are snitch, bludger and seeker
*/
function setMode(chosenMode) {
  mode = chosenMode;
  const modeDisplay = document.getElementById("mode-display");
  modeDisplay.textContent = `Selected mode: Create ${mode}`;
}

//run after page load
document.addEventListener("DOMContentLoaded", function () {
  
  //initial mode display
  const modeDisplay = document.getElementById("mode-display");
  modeDisplay.textContent = `Selected mode: Create ${mode}`;

  //fetch canvas and lightmap elements
  const mainCanvas = document.getElementById("main");
  const lightmapCanvas = document.getElementById("lightmap");
  
  /*
    create a new lightmap
    Snitch - writes to green channel and does not read from any channel
    Bludger - writes to red channel and reads from blue channel
    Seeker - writes to blue channel and reads from green, red channels
  */
  lightmap = new Lightmap({
    drawMap: function () {
      bludgers.bludgers.forEach((bludger) =>
        lightmap.drawScope([255, 0, 0], bludger.position)
      );
      snitches.snitches.forEach((snitch) =>
        lightmap.drawScope([0, 255, 0], snitch.position)
      );
      seekers.seekers.forEach((seeker) =>
        lightmap.drawScope([0, 0, 255], seeker.position)
      );
    },
    element: lightmapCanvas,
  });

  //global P5 object
  p5Obj = new p5(function (p) {
    p.setup = () => {
      p.createCanvas(width, height);

      //create required sliders - one from snitch wiggle force, one for bludger drag force and one for seeker drag force
      createSlider({label: "snitchWiggleForce", min: 1, max: 10, defaultValue: 2, step: 0.1});
      createSlider({label: "bludgerDrag", min: 0.001, max: 0.3, defaultValue: 0.1, step: 0.01});
      createSlider({label: "seekerDrag", min: 0.001, max: 0.3, defaultValue: 0.1, step: 0.01});
    }

    p.mouseClicked = () => {
      //check if click was within canvas
      if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
        let mousePos = new Vector(p.mouseX, p.mouseY);

        //call corresponding class to create new particle
        switch (mode) {
          case "Bludger":
            bludgers.addBludger(mousePos);
            break;
          case "Snitch":
            snitches.addSnitch(mousePos);
            break;
          case "Seeker":
            seekers.addSeeker(mousePos);
            break;
        }
      }
    };

    p.draw = () => {
      p.background("#87cefa");

      //delta time i.e. time between frames
      const dt = p.deltaTime * 0.001;

      //draw all particles
      snitches.draw();
      seekers.draw();
      bludgers.draw();

      //update all particles if not paused
      if (!paused) {
        snitches.update(dt);
        bludgers.update(dt);
        seekers.update(dt);
      }

      //draw debug for any particles that have debug set to true
      if (FLAGS.drawSnitchDebug) {
        snitches.drawDebug();
      }
      if (FLAGS.drawBludgerDebug) {
        bludgers.drawDebug();
      }
      if (FLAGS.drawSeekerDebug) {
        seekers.drawDebug();
      }
    };
  }, mainCanvas);
});
