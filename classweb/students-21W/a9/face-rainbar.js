
// Cyberpunk DJ mask.  Could make the ears vibrate with music

masks.rainbar = function( p, t) {
	p.background(0)

	// Make an outline but also make it weird
	let outlineCount = 4
	for (var i = 0; i < outlineCount; i++) {
		let pct = (i/outlineCount + t*.5)%1
		let opacity = Math.sin(pct*Math.PI)
		let faceOutline = joinSides(face.sides[0].faceRings[0],face.sides[1].faceRings[0]).map(((pt,index) => {
			let pt2 = new Vector()
			pt2.setToLerp(face.center, pt, .8 +pct + pct*noise(t + index*.4 + pct))
			pt2.coords[0] *= 1.5
			return pt2
		}))
		p.stroke(0, 0, 100, opacity)
		drawContour(p, faceOutline.slice(1), true)
	}


	face.sideOrder.forEach((side) => {



		// Draw the three ear points
		p.noStroke()
		side.ear.forEach((earPos, earIndex) => {
			p.fill(earIndex*30 + 130, 100, 50)
			earPos.draw(p, (10 + -earIndex*2 + 20*noise(earIndex, t*4))*face.scale)
		})
		p.fill(0, 0, 0, .5)
		side.ear[1].draw(p, 20*face.scale)
		side.ear[1].draw(p, 10*face.scale)

		// Draw the face background by filling in between the face side and the centerline
		// side.index is either 1 or -1, so we can use that to change color between sides
		p.fill(200, 100, 20 + side.index*10)
		drawStrip(p, side.faceRings[0], face.centerLine)
		
		p.noStroke()

		// // Draw multiple strips around the face
		for (var i = 0; i < 2; i++) {
			
			p.fill((i*30 + 50 + 40*t)%360, 100, 50)

			// Draw the triangle mesh
			drawStrip(p, side.faceRings[i + 1], side.faceRings[i])
		}	
	})


	// Draw lines between each of the face points on either side
	for (var i = 0; i < 18; i++) {
		p.strokeWeight(3)
		p.stroke(i*20, 100, 50)
		let p0 = face.sideOrder[0].faceRings[2][i]
		let p1 = face.sideOrder[1].faceRings[2][i]
		Vector.drawLineBetween({p:p, v0: p0, v1: p1})
	}

	// Draw the eye on either side
	face.sideOrder.forEach((side) => {
		// Draw the eye lines
		side.eyeRings.forEach((eyeRing,eyeIndex) => {
			if (eyeIndex === 4) {
				p.fill(0)
				p.noStroke()
				drawContour(p, eyeRing, true)
			}

			let h = (40 + 70*eyeIndex + t*80)%360
			
			drawNeonContour(p, eyeRing, [h, 100, 50], 5, true)
		})


	})

	// Draw the center face line
	p.noFill()
	drawNeonContour(p, face.centerLine.slice(0,14), [150, 100, 50], 10, false)
	drawNeonContour(p, face.centerLine.slice(20), [150, 100, 50], 10, false)

	p.noFill()
	// Draw the mouth lines
	face.mouth.forEach((mouthLine,mouthIndex) => {
		if (mouthIndex > 2) {
			if (mouthIndex === 4) {
				p.fill(0)
				p.noStroke()
				drawContour(p, mouthLine, true)
			}

			let h = (40 + 70*mouthIndex + 100*t)%360
			
			// Neon style
			drawNeonContour(p, mouthLine, [h, 100, 50], 5, true)
		
		}
	})
}
