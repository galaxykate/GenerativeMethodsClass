

class JugglerMask {
	constructor() {
		this.particles = []
		this.edges = []

		for (var j = 0; j < 2; j++) {
			for (var i = 0; i < 5; i++) {
				for (var k = 0; k < 10; k ++) {
						let pt = new Vector()
						pt.id = `hand-${j}-${i}`
						pt.radius = 10 + Math.random()*10
						pt.idNumber = j*5 + i + 100*k
						pt.velocity =  new Vector()
						pt.force =  new Vector()
						pt.color = [Math.random()*360, 100, 50]
						pt.attachPoint = hand[j].fingers[i][3]
						this.particles.push(pt)
				}
			
			}
		}
	}
	draw(p, t) {
		p.background(100, 100, 100)

		// Both face sides
		face.sideOrder.forEach(side => {
			p.stroke(0)
			p.fill(80 + side.index*10)



			let outlinePoints = side.faceRings[0].concat(face.centerLine.slice().reverse())
			drawContour(p, outlinePoints)

			p.noFill()
			let eyebrow = side.eyeRings[0].slice(2, 7).map(pt => {
				let pt2 = new Vector(0,0)

				pt2.setToLerp(side.eye, pt, .2 + 2*SLIDER.eyebrow)
				return pt2
			})

			drawContour(p, eyebrow)

			drawContour(p, side.eyeRings[4])
			side.eye.draw(p, 5)
		})



		this.particles.forEach(pt => {
			p.fill(pt.color)
			pt.draw(p, pt.radius)

			p.stroke(0)
			p.strokeWeight(1)
			Vector.drawLineBetween({p:p, v0:pt, v1:pt.attachPoint})

		})


		// drawTestFacePoints(p);	
		drawTestHandPoints(p);	
	}

	update(t, dt, frameCount) {
		let offset = new Vector()
		this.particles.forEach(pt => {
			pt.force.setTo(0, 60)



			offset.setToDifference(pt, pt.attachPoint)
			let m = offset.magnitude
			// console.log(m)
			pt.force.addMultiples(offset, -100)

			pt.force.addPolar(1000, 10*noise(pt.idNumber + t))

			pt.velocity.addMultiples(pt.force, dt)
			pt.velocity.mult(.98)

			pt.addMultiples(pt.velocity, dt)

			// pt.setToLerp(pt, pt.attachPoint, .1)
		})
	}
}

masks.juggler = JugglerMask