class PuppetSystem {
	constructor() {
		this.particles = []	
		for (var i = 0; i < 30; i++) {
			this.add()
		}
	}
	add() {

		let p = Vector.polar(Math.random()*100, Math.random()*6.14)
		p.idNumber = this.particles.length
		p.v = Vector.polar(Math.random()*10, Math.random()*6.14)
		p.force = new Vector()

		this.particles.push(p)

	}

	update(t, dt) {
		this.particles.forEach(pt => {

			let center = face.sides[pt.idNumber%2].eye
			pt.force.setToDifference(center, pt).mult(10)
			pt.force.addPolar(420, 30*noise(pt.idNumber*10 + t))
			
			pt.v.addMultiples(pt.force, dt)

			pt.addMultiples(pt.v, dt)
			// pt.v.mult(.999)
		
			pt.setToLerp(pt, center, .1)
		})
	}

	draw(p, t) {
		p.fill(0, 0, 100, .2)
		p.noStroke()

		this.particles.forEach(pt => pt.draw(p, 4))
	}
}




//=================================================================================
//=================================================================================
// Demo masks



//=================================================================================
//  Utilities

function joinSides(contour0, contour1) {
	return contour0.concat(contour1.slice().reverse())
}

function drawNeonContour(p, contour, color, width, close) {
		p.noFill()
		p.strokeWeight(width*2)
		p.stroke(color[0], color[1], color[2], .3)
		drawContour(p, contour, close)
		p.strokeWeight(width)
		p.stroke(color[0], color[1], color[2] + 10, .3)
		drawContour(p, contour, close)
		p.strokeWeight(width*.6)
		p.stroke(color[0], color[1], color[2] + 30, 1)
		drawContour(p, contour, close)
}

function drawContour(p, contour, close) {
	face.sideOrder.forEach((side) => {
		p.beginShape()
		contour[0].vertex(p)
		
		contour.slice().forEach(pt => pt.curveVertex(p))
		contour[contour.length - 1].vertex(p)
		p.endShape(close?p.CLOSE:undefined)
	})
}


function drawFaceDirection() {

	p.strokeWeight(3)
	face.direction.drawArrow({p:p, 
		center:face.noseTip, 
		color: [0,0,0]
	})
}

function drawEarArrows() {
	// Draw the arrow to the ears

	side.noseToEar.drawArrow({p:p, 
		center:face.noseTip, 
		color: [100 + 90*side.index, 100, 50]
	})
}

function drawStrip(p, contour0, contour1) {
	p.beginShape(p.TRIANGLE_STRIP)
	for (var i = 0; i < contour0.length; i++) {
		contour0[i].vertex(p)
		contour1[i].vertex(p)
	}
	
	p.endShape()
}

// Draw all the face points
function drawTestFacePoints(p) {
	p.noStroke()
	p.fill(0)
	let radius =  1/app.zoom + .1

	p.textSize(radius*6)
	face.points.forEach((pt,i) => {
		pt.draw(p, radius)
		
		p.text(pt.index, pt.coords[0], pt.coords[1])
	})
}


function drawTestHandPoints(p) {

	let radius =  1/app.zoom + .1



	p.textSize(radius*6)
	hand.forEach(h => {
		

		h.fingers.forEach((finger, fingerIndex) => {
			p.noFill()
			p.strokeWeight(16)
			p.stroke(fingerIndex*40, 100, 50)
			drawContour(p, finger)
		})

		// Draw labeled points
		p.noStroke()
		p.fill(0)
		h.points.forEach((pt,i) => {
			pt.draw(p, radius)
			p.text(pt.index, pt.coords[0], pt.coords[1])
		})

		// Draw arrows
		p.strokeWeight(3)
		h.handDir.drawArrow({
			p:p, 
			center:h.wrist, 
			color: [100,100,50]
		})

		h.pointDir.forEach((dir,index) => dir.drawArrow({
			p:p, 
			center: h.fingers[index][3],
			color: [100 + 30*index,100,50]
		}))



	})


}

//====================================




function drawEyeContours(p, t) {
	p.fill(0, 100, 50)
	p.stroke(0)
	p.strokeWeight(.2)
	face.sides.forEach((side, index) => {
		side.eyeRings.slice().reverse().forEach((ring, ringIndex) => {
			if (ringIndex == 4) {
				p.fill(0, 100, 100)
				
			} else {
				p.fill(0, 100, 50)
			}
			drawContour(p, ring)
			
		})

		let eye2 = new Vector()
		let eyePos = noise(t*5)
		if (index === 0)
			eyePos = 1 - eyePos
		let inner = side.eyeRings[0]
		eye2.setToLerp(inner[0], inner[8], eyePos)
		p.fill(0, 0, 0)
		eye2.draw(p, 8)
		p.fill(0, 0, 100)
		eye2.draw(p, 2)
	})
}





function drawSpotlight(p, color=[100,100,100]) {
	p.noStroke()
	let count = 20
	for (var i = 0; i < count; i++) {
		let pct = i/count
		let r = 200*(1 - pct) + 30

		p.fill(...color, .3/count)
		p.circle(face.center.coords[0] + 9*Math.cos(i *.2),face.center.coords[1] + 9*Math.sin(i), r)
	}

}

class Tiara {
	constructor() {

	}

	update(t, td) {

	}

	draw(p) {

	}
}

function drawAngelFace(p, t) {
	
		

}