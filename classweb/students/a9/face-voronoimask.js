

class VoronoiMask {
	constructor() {
		this.particles = []
		this.edges = []

		for (var j = 0; j < 2; j++) {
			for (var i = 0; i < 5; i++) {
				let pt = new Vector()
				pt.id = `hand-${j}-${i}`
				pt.radius = 10 + Math.random()*10
				pt.idNumber = j*5 + i
				pt.velocity =  new Vector()
				pt.force =  new Vector()
				pt.color = [Math.random()*360, 100, 50]
				pt.attachPoint = hand[j].fingers[i][3]
				this.particles.push(pt)
			}
		}

		let ringPoints = []
		let count = 40
		for (var i = 0; i < count; i++) {
			let theta  = i*Math.PI*2/count
			ringPoints.push(Vector.polar(200 + (i%2)*20, theta))
			ringPoints.push(Vector.polar(300 + (i%2)*20, theta))
			ringPoints.push(Vector.polar(400 + (i%2)*20, theta))
		}
		this.voronoiPoints = face.points.concat(ringPoints).concat(hand[0].points).concat(hand[1].points)
		
		
	}

	draw(p) {
		p.background(100, 100, 100)
		p.stroke(0)
		p.noFill(0)
		p.circle(0, 0, 300)

		p.fill(0)
		p.noStroke()
		// drawTestFacePoints(p)
		// drawTestHandPoints(p)

		this.particles.forEach(pt => {
			p.fill(pt.color)
			pt.draw(p, pt.radius)
		})

		p.fill(0)
		this.voronoiPoints.forEach(pt => pt.draw(p, 2))

	
		// Convert to a simpler array of vectors 
		let pts = this.voronoiPoints.map(p => p.coords)

		// Create the diagram
		const delaunay = Delaunator.from(pts);
		// if (Math.random() > .98)
		// 	console.log(delaunay)

		p.stroke(0)
		p.strokeWeight(.1)

		let vpct = SLIDER.voronoiLerp

		forEachVoronoiCell(pts, delaunay, (centerIndex, verts) => {

			if (centerIndex%1 == 0) {
				let pt = this.voronoiPoints[centerIndex]
				p.noStroke()
				p.fill(centerIndex%360, 100, 50, .4)
				// pt.draw(p, 1)
				p.beginShape()
				// verts.forEach(vert => p.vertex(...vert))
				verts.forEach(vert => Vector.lerpVertex(p, pt, vert, vpct))
				p.endShape(p.CLOSE)

				p.fill((centerIndex + 50)%360, 100, 50, .4)
				p.beginShape()
				// verts.forEach(vert => p.vertex(...vert))
				verts.forEach(vert => Vector.lerpVertex(p, pt, vert, vpct-.2))
				p.endShape(p.CLOSE)
			}
			
		})
	



	}

	update(t, dt, frameCount) {
		console.log("update")
		this.particles.forEach(pt => {
			pt.addMultiples(pt.velocity, dt)
			pt.setToLerp(pt, pt.attachPoint, .1)
		})
	}
}


masks.voronoiMask = VoronoiMask