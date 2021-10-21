class fireMask {
  constructor() {
    this.colorCount = 2;
    this.colors = ["#B62203", "#FC6400", "#FAC000"];
    this.fingerTrails = [[[],[],[],[],[]], [[],[],[],[],[]]]
  }

  drawFireHands(p) {
    const ws = SLIDER.palmSize;
    hand.forEach((singleHand, singleHandIndex) => {
      if (singleHand.visible) {
        singleHand.fingers.forEach((finger, fingerIndex) => {
          let trail = this.fingerTrails[singleHandIndex][fingerIndex]
          if (!app.paused)
				    addToTrail(trail, finger[3], 8)
			      p.fill(this.colors[Math.floor(Math.random() * 2.99)]);
			      drawRibbon(p, trail, (pct, side) => {

				    return 10*pct
			      })
          finger.forEach((point) => {
            // p.fill(colors[Math.floor(Math.random()*2.99)]);
            // let height = Math.random()*30 + 10
            // let width = 10
            // p.ellipse(...point.coords, width, height)
            p.fill(this.colors[Math.floor(Math.random() * 2.99)]);
            let radius = Math.random() * 10 + 10;
            p.circle(...point.coords, radius);
          });
        });

        p.fill(this.colors[Math.floor(Math.random() * 2.99)]);
        let radius = ws * 40 + 20;
        p.circle(
          singleHand.center.coords[0],
          (singleHand.center.coords[1] + singleHand.wrist.coords[1]) / 2,
          radius
        );
      }
    });
  }

  drawFireFace(p, ring, t) {
    let fl = SLIDER.flameLength;
    let fs = SLIDER.flameSpeed;

    const amplitude = (fs * 2 + 1) * t * 3;

    face.sideOrder.forEach((side) => {
      const reversedContour = side.faceRings[ring].slice(4, 18).reverse();
      //console.log(side)
      p.beginShape();
      p.vertex(...reversedContour[0].coords);
      reversedContour.slice().forEach((pt, index) => {
        if (index % 3 == 0 && index <= reversedContour.length - 3) {
          let coords = reversedContour[index + 2].coords;
          let x = coords[0];
          let y = coords[1];
          //console.log(index, coords)
          p.curveVertex(...pt.coords);
          p.curveVertex(
            x - side.index * fl * Math.sin(amplitude) * (30 + 10 * (1 - ring)),
            y - 20 * fl * Math.sin(amplitude)
          );
          p.curveVertex(...coords);
        }
      });
      p.vertex(...reversedContour[reversedContour.length - 1].coords);
      p.endShape(p.CLOSE);
    });

    p.beginShape();
    let points = [
      ...face.sideOrder[0].faceRings[ring].slice(0, 5).reverse(),
      ...face.sideOrder[1].faceRings[ring].slice(1, 5),
    ];
    p.vertex(...points[0].coords);
    points.forEach((point, index) => {
      if (index % 2 == 0) {
        p.curveVertex(...point.coords);
      } else {
        p.curveVertex(
          point.coords[0],
          point.coords[1] - 15 * fl * Math.sin(amplitude)
        );
      }
    });
    p.vertex(...points[points.length - 1].coords);
    p.endShape(p.CLOSE);

    let length = face.centerLine.length;
    if (ring == 0) {
      drawContour(p, face.centerLine.slice(0, 2));
      drawContour(p, face.centerLine.slice(length - 2, length));
    } else if (ring == 1) {
      drawContour(p, face.centerLine.slice(1, 3));
      drawContour(p, face.centerLine.slice(length - 3, length - 1));
    } else if (ring == 2) {
      drawContour(p, face.centerLine.slice(2, length - 2));
    }
  }

  draw(p, t) {
    // p.background("#D73502")
    // let red = p.color("#801100");
    // let orange = p.color("#D73502");
    // let yellow = p.color("#FF7500");
    // let pct = [0.2, 0.4, 0.6, 0.8]
    // let interA = p.lerpColor(red, orange, 0.5);
    // let interB = p.lerpColor(interA, yellow, 0.5);
    let interB = this.colors[this.colorCount];
    p.background(interB);

    p.noStroke();
    
    //draw layer 0
    p.fill(this.colors[0]);
    this.drawFireFace(p, 0, t);
    drawContour(p, face.sides[0].faceRings[0]);
    drawContour(p, face.sides[1].faceRings[0]);
    
    //draw layer 1
    p.fill(this.colors[1]);
    this.drawFireFace(p, 1, t);
    drawContour(p, face.sides[0].faceRings[1]);
    drawContour(p, face.sides[1].faceRings[1]);
    
    //draw layer 2
    p.fill(this.colors[2]);
    this.drawFireFace(p, 2, t);
    drawContour(p, face.sides[0].faceRings[2]);
    drawContour(p, face.sides[1].faceRings[2]);
    
    //draw base layer for eyes and mouth
    p.fill(this.colors[1]);
    drawContour(p, face.sides[0].eyeRings[3]);
    drawContour(p, face.sides[1].eyeRings[3]);
    drawContour(p, face.mouth[3]);
    // drawContour(p, hand[0].fingers[0])
    // drawContour(p, hand[1].fingers[0])
    
    //draw inner layer for eyes and mouth
    p.fill(this.colors[0]);
    p.circle(...face.sides[0].eye.coords, 10);
    p.circle(...face.sides[1].eye.coords, 10);
    // drawContour(p, face.sides[1].eye)
    drawContour(p, face.mouth[4]);
    
    //draw pupils
    p.fill(this.colors[2]);
    p.circle(...face.sides[0].eye.coords, 4);
    p.circle(...face.sides[1].eye.coords, 4);

    //draw hands
    this.drawFireHands(p);
  }

  update(frameCount) {
    if (frameCount % 15 == 0) {
      this.colorCount += 1;
      this.colorCount = this.colorCount % 3;
    }
  }
}

masks.fire = fireMask;
