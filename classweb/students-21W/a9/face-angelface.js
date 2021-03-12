masks.angelFace = function(p, t) {
	p.background(0, 0, 50, .02)

	let flare = 5*SLIDER.a + 1
	// Draw the background
	face.sideOrder.forEach(side => {
		side.eyeRings.forEach((ring, ringIndex) => {
			let ring2 = ring.map((pt, ptIndex) => {
				let lerpPct = 1*ringIndex + (ringIndex + flare)*noise(9*ptIndex + t)
			
				let pt1 = new Vector()
				pt1.setToLerp(side.eye, pt, lerpPct)

				return pt1
			})
			// Draw this eye ring
			p.fill(0, 0, 0, .02)
			// p.stroke(0)
			// p.strokeWeight(.3)
			drawContour(p, ring2)
		})
	})

	face.sideOrder.forEach(side => {
		
		
		
		// eyelashes?
		let ring0 = side.eyeRings[4]
		let ring1 = side.eyeRings[1]
		let vOuter = new Vector(0,0)
		let cp0 = new Vector(0,0)
		let cp1 = new Vector(0,0)
		let cp0a = new Vector(0,0)
		let cp1a = new Vector(0,0)
		let dir = new Vector(0,0)
		let n = new Vector(0,0)
		let offset = new Vector(1,0)

		let eyeDir = new Vector()
		eyeDir.setToDifference(face.center, side.eye)


		function drawFeather(index, pct) {
			let ft = t*.2
			p.strokeWeight(1)

			let v0 = ring0[index]
			let v1 = ring0[index + 3]
			let v2 = ring1[index + 2]

			

			let radius = (2 + 6*pct**2 )*(1 + .5*Math.sin(t*.2 + index + pct))
			let wave = 1*pct + 2*t
			let waveStrength = (pct)* side.index*100
			let waveOffset = 1 + 2*SLIDER.c
			let pctControl0 = .2 + .4*SLIDER.b
			let pctControl1 = .4 + .4*SLIDER.b

			vOuter.setToLerp(v0, v2, radius)

			offset.setToDifference(v0, vOuter)
			offset.coords[1] += .01
			// console.log(offset.coords)

			dir.setToDifference(v1, v0)
			n.setToNormal(offset)

			cp0.setToLerp(v0, vOuter, pctControl0)
				.addMultiples(n,.5*waveStrength*Math.sin(wave))
			cp1.setToLerp(v0, vOuter, pctControl1)
				.addMultiples(n, waveStrength*Math.sin(wave + waveOffset))
			
			cp0a.setToLerp(v1, vOuter, pctControl0)
				.addMultiples(n, .5*waveStrength*Math.sin(wave))
			cp1a.setToLerp(v1, vOuter, pctControl1)
				.addMultiples(n, 1.8*waveStrength*Math.sin(wave + waveOffset))
			
			vOuter.addMultiples(n, .5*waveStrength*Math.sin(wave + waveOffset*1.2))
			// cp1.setToLerp(v0, v2, radius*.2)
			// 	.addMultiples(dir, 14 )
			// cp1.setTo(v1)
	
				// .addMultiples(dir, pct*10 + 2*Math.sin(ft*4 + index*.2 + pct*3.2))
				// .addMultiples(eyeDir, -1*pct)
			// console.log(vOuter.toFixed(2))
			// cp0.setToLerp(v0, vOuter, .4).addMultiples(eyeDir, -pct + 3*noise(1.2*t + index, pct))
			// 	.addMultiples(dir, 10 + 10*noise(t*.8 + 100 + pct + index))

			// cp1.setToLerp(v0, vOuter, .6 + 3*noise(t*.2, index + pct))
			// 	.addMultiples(eyeDir, -.2*noise(.7*ft + index, 3*pct))
			// cp1.addMultiples(dir, pct*10 + 2*Math.sin(t*6 + index*.2 + pct*4.2))
				
			
			p.noStroke()
			p.noFill()
			let hue = (190 + 60*index + 170*noise(1*t + 4*pct))%360
			p.fill(hue, 100, 30 + 60*noise(index + 1.2*t + 3*pct), .5)
			// p.stroke(130 + 50*pct, 100, 20, .4)
			// p.fill(0)

			p.beginShape()
			
			v0.vertex(p)

			vOuter.bezierVertex(p, cp0, cp1)
			// vOuter.vertex(p)
			// cp0.vertex(p)
			v1.bezierVertex(p, cp1a, cp0a)
			// v1.vertex(p)
			

			
		

			p.endShape(p.CLOSE)
			p.fill((hue + 10)%360, 100, 50 + 30*noise(index + 2*t + 3*pct), .5)
			// Blinky eyes?
			let r =  10*pct + 1
			vOuter.draw(p, r)
			p.fill(0)
			// p.ellipse(...vOuter.coords, r, r*side.blink)
		
		}

		let featherCount = 5
		for (var i = 1; i < 10; i++) {
			for (var k = 0; k < featherCount; k++) {

				let pct = 1 - k/featherCount
				drawFeather(i, pct)
			}
		}


		p.fill(0, 0, 100, .3)

		p.circle(...side.eye.coords, 4)
		p.circle(...side.eye.coords, 2)
		// Draw interesting math

		// Eyebrows
		p.noStroke()
		p.fill(0, 0, 100)
		let pt2 = new Vector()
		let eyeBrowPoints = side.eyeRings[0].slice(2, 7)
		
		p.beginShape()
		let eyeBrowLift = SLIDER.eyebrow - .5
		
		eyeBrowPoints.forEach((pt,index) => {
			let pct = index/eyeBrowPoints.length
			pt2.setToLerp(side.eye, pt, 1 + eyeBrowLift + pct)
			if (index == 0)
				pt2.vertex(p)
			else
				pt2.curveVertex(p)
		})
		eyeBrowPoints.slice().reverse().forEach((pt,index) => {
			let pct = 1 - index/eyeBrowPoints.length
			pt2.setToLerp(side.eye, pt, (1.2 + 1.2*eyeBrowLift)*pct)
			pt2.curveVertex(p)
		})
	
		p.endShape(p.CLOSE)
	})

	// p.stroke(0, 0, 100, 1)
	// p.fill(0, 0, 0, .4)
	// drawContour(p, face.mouth[4])
}