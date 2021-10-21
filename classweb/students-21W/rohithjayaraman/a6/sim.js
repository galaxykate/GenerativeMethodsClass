//possible emojis
const emoji = "😎 🤠 😄".split(" ");

//simulation counter
let simCount = 0;

//options variable to do emoji-wise calculations later
const options = {
  "😎": 0,
  "🤠": 1,
  "😄": 2,
};

class Simulation {
  constructor(mode) {
    this.mode = mode;
    this.idNumber = simCount++;
    this.noiseSeed = this.idNumber;
    this.stepCount = 0;

    this.w = 19;
    this.h = 15;

    this.isWrapped = true;
    this.isPaused = true;
    this.selectedCell = undefined;

    this.resilience = undefined;
    this.groupSize = undefined;

    this.drawMode = "😎";

    this.emojiGrid = new Grid(this.w, this.h, this.isWrapped);

    this.randomize();
  }

  //set which emoji drawn to grid if user clicks
  setDrawMode(val) {
    this.drawMode = val;
  }

  //draw random grid
  randomize() {
    const count = {
      "😎": 95,
      "🤠": 95,
      "😄": 95,
    };

    this.emojiGrid.setAll((x, y) => {
      while (true) {
        const val = getRandom(emoji);
        if (count[val] > 0) {
          count[val] -= 1;
          return val;
        }
      }
    });
  }

  //perform one step  
  step() {
    this.stepCount++;

    //set values for next grid based on conditions
    this.emojiGrid.setNext((x, y, currentValue) => {
      //get all 8 neighbours (wrapped)
      let neighbors = this.getNeighborPositions(x, y, true);

      let count = { 0: 0, 1: 0, 2: 0 };
      let total = 0;

      //check if number of neighbours needs to be changed/filtered
      if (
        (this.mode == "group" && this.groupSize != -1) ||
        this.mode == "influence"
      ) {
        if (this.mode == "influence") {
          this.groupSize = 5;
        }
        //filter neighbours
        let neighbourIndex = [];
        let groupCount = 0;
        while (true) {
          const index = Math.random() * 8;
          if (!neighbourIndex.includes(index)) {
            neighbourIndex.push(index);
            groupCount += 1;
            if (groupCount == this.groupSize) {
              break;
            }
          }
        }
        neighbors.filter((neighbour, index) => neighbourIndex.includes(index));
      }

      // if (x == 0 && y == 0) {
      //   console.log(currentValue, count[0], count[1], count[2]);
      //   neighbors.map(nb => console.log(this.emojiGrid.get(nb[0], nb[1]), options[this.emojiGrid.get(nb[0], nb[1])]))
      // }

      //check if influence needs to be added
      if (this.mode == "influence") {
        neighbors.map((nb) => {
          const val = options[this.emojiGrid.get(nb[0], nb[1])];
          const influence = Math.random();
          count[val] += influence;
          total += influence;
          // if (x == 0 && y == 0) {console.log(count); console.log(total);}
        });
      }
      //regular case - weightage of all peers is equal 
      else {
        neighbors.map((nb) => {
          const val = options[this.emojiGrid.get(nb[0], nb[1])];
          count[val] += 1;
          total += 1;
        });
      }

      //set value based on old value
      switch (currentValue) {
        case "🤠":
          if (count[0] >= Math.floor((total * this.resilience * 2) / 100)) {
            return "😎";
          } else if (
            count[2] >= Math.floor((total * this.resilience * 1.1) / 100)
          ) {
            return "😄";
          }
          return "🤠";
        case "😄":
          //console.log(count[0], count[1])
          if (
            count[0] >= Math.floor((total * this.resilience) / 100) &&
            count[1] >= Math.floor((total * this.resilience) / 100)
          ) {
            return Math.random > 0.5 ? "😎" : "🤠";
          } else if (count[0] >= Math.floor((total * this.resilience) / 100)) {
            return "😎";
          } else if (count[1] >= Math.floor((total * this.resilience) / 100)) {
            return "🤠";
          }
          return "😄";
        case "😎":
          if (count[1] >= Math.floor((total * this.resilience * 2) / 100)) {
            return "🤠";
          } else if (
            count[2] > Math.floor((total * this.resilience * 1.1) / 100)
          ) {
            return "😄";
          }
          return "😎";
      }
    });

    //swap grids
    this.emojiGrid.swap();
  }

  //draw cell in place
  drawCell(p, x, y, cellX, cellY, cellW, cellH, resilience, groupSize) {
    //set values from sliders - done to get easy interface between vue component and sim
    this.resilience = resilience;
    this.groupSize = groupSize;
    
    if (this.selectedCell && this.selectedCell[0] === x && this.selectedCell[1] === y) {
      p.strokeWeight(2);
      p.stroke("red");
    } 
    else {
      p.strokeWeight(1);
      p.stroke(0, 0, 0, 0.2);
    }
    //draw the stuff
    p.textSize(20);
    p.rect(cellX, cellY, cellW, cellH);

    let em = this.emojiGrid.get(x, y);
    p.text(em, cellX + cellW / 10, cellY + (3 * cellH) / 4);
  }

  //highlight selected cell in red
  select(x, y) {
    this.selectedCell = [x, y];
  }

  //if user clicks modify cell
  click(x, y) {
    //console.log(x, y, this.drawMode);
    this.emojiGrid.set(x, y, this.drawMode);
  }

  //get neighbour positions
  getNeighborPositions(x1, y1, wrap) {
    let x0 = x1 - 1;
    let x2 = x1 + 1;
    let y0 = y1 - 1;
    let y2 = y1 + 1;
    if (wrap) {
      x0 = (x0 + this.w) % this.w;
      x2 = (x2 + this.w) % this.w;
      y0 = (y0 + this.h) % this.h;
      y2 = (y2 + this.h) % this.h;
    }

    return [
      [x0, y0],
      [x1, y0],
      [x2, y0],
      [x2, y1],
      [x2, y2],
      [x1, y2],
      [x0, y2],
      [x0, y1],
    ];
  }
}
