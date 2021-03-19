

class BlueDemonMask {
	constructor() {
		this.hand0Points = hand[0].points.map(p => p.coords);
		this.hand1Points = hand[1].points.map(p => p.coords);
	}

	draw(p, t) {
		p.background(150, 55, 50, 1)

		// Drawing the face

		// Draw the outline of the mask in blue
    for (var i = 0; i < 3; i++) {
	    p.fill(233, 66, 54);
			p.noStroke();
			let outlinePoints1 = face.sideOrder[0].faceRings[i].concat(face.centerLine.slice().reverse())
			let outlinePoints2 = face.sideOrder[1].faceRings[i].concat(face.centerLine.slice().reverse())
	    drawContour(p, outlinePoints1);
	    drawContour(p, outlinePoints2);
  	}

		// create changing geometry on the face
		let numConnections = Math.floor(20*SLIDER.connections);
		let start_fill = 100
		let start_lightness = 70;
		for(var i = 0; i<numConnections; i++){
			let pct = i/numConnections;
			let faceRingIndex = i % 3;
			let eyeRingIndex = i % 5;

			let faceRingLength = Math.min(face.sideOrder[0].faceRings[faceRingIndex].length, face.sideOrder[1].faceRings[faceRingIndex].length)
			let eyeRingLength = Math.min(face.sideOrder[0].eyeRings[eyeRingIndex].length, face.sideOrder[1].eyeRings[eyeRingIndex].length)
			let noiseValue = 5;
			let noiseStep = SLIDER.noise*noiseValue*Math.sin(t);

			let eyeStep = Math.floor(p.noise(noiseStep)*eyeRingLength);
			let faceStep = Math.floor(p.noise(noiseStep)*faceRingLength);

			p.fill(start_fill*pct, .1) // change fill according to percent with some transparency.
			// creates fills between face outlines and eye outlines
			drawStrip(p, face.sideOrder[0].eyeRings[eyeRingIndex], face.sideOrder[0].faceRings[faceRingIndex]);
			drawStrip(p, face.sideOrder[1].eyeRings[eyeRingIndex], face.sideOrder[1].faceRings[faceRingIndex]);

			p.fill(283, 75, pct*start_lightness*SLIDER.lightness, .5)

			// draw strips between parts of face outlines and eye outlines with slices from Perlin noise
			drawStrip(p, face.sideOrder[0].eyeRings[eyeRingIndex].slice(eyeStep,eyeRingLength), face.sideOrder[0].faceRings[faceRingIndex]);
			drawStrip(p, face.sideOrder[1].eyeRings[eyeRingIndex], face.sideOrder[1].faceRings[faceRingIndex].slice(faceStep,faceRingLength));
		}
	  // Draw white outline around mouth and eyes
    p.fill(80);
    drawContour(p, face.sideOrder[0].eyeRings[2], true);
    drawContour(p, face.sideOrder[1].eyeRings[2], true);
		drawContour(p, face.mouth[1], true);

		// Draw black eyes, nose, mouth
    p.fill(0);
    drawContour(p, face.sideOrder[0].eyeRings[4], true);
    drawContour(p, face.sideOrder[1].eyeRings[4], true);

		drawContour(p, face.sideOrder[0].nose[0].slice(5,20), true);
    drawContour(p, face.sideOrder[1].nose[0].slice(5,20), true);

		drawContour(p, face.mouth[3], true);

		this.delaunayHand0 = Delaunator.from(this.hand0Points);
		this.delaunayHand1 = Delaunator.from(this.hand1Points);

		// Draw the hands using delaunay triangles

		forEachTriangle(this.hand0Points, this.delaunayHand0, (tIndex, points) => {
			let colorValue = p.noise(points[0][0]*0.07)*360
			p.fill(colorValue,50,50,0.9);
			p.noStroke();
			p.triangle(...points[0],...points[1],...points[2]);
		});

		forEachTriangle(this.hand1Points, this.delaunayHand1, (tIndex, points) => {
			let colorValue = p.noise(points[0][0]*0.03)*360
			p.fill(colorValue,50,50,0.9);
			p.noStroke();
			p.triangle(...points[0],...points[1],...points[2]);
		})

		// forEachTriangle(this.hand0Points, this.delaunayHand0, (tIndex, points) => {
		// 	let value = 0;
		// 	points.forEach(c => {value = value+c[0]+c[1]})
		// 	let colorValue = Math.abs(value % 360);
		// 	// p.fill(colorValue,50,50);
		// 	// p.noStroke();
		// 	p.noFill();
		// 	p.stroke(colorValue,50,50);
		// 	p.triangle(...points[0],...points[1],...points[2]);
		// });
		//
		// forEachTriangle(this.hand1Points, this.delaunayHand1, (tIndex, points) => {
		// 	let value = 0;
		// 	points.forEach(c => {value = value+c[0]+c[1]})
		// 	let colorValue = Math.abs(value % 360);
		// 	console.log(colorValue)
		// 	p.fill(colorValue,50,50);
		// 	p.noStroke();
		// 	p.triangle(...points[0],...points[1],...points[2]);
		// })

    // drawTestHandPoints(p);
	}

	update(t, dt, frameCount) {

	}
}

masks.blueDemon = BlueDemonMask
