
let cycleLens = [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]

class CirclePattern {
	constructor(aof) {

		// all of my slider value fields
		this.aof = aof
		this.center = new Vector()
		this.visCycleLen = 8
		this.visNum = 5
		this.angCycleLen = 12
		this.angMin = 0
		this.angMax = Math.PI
		this.strokeLen = 20
	}


	update(t, dt) {
		// Update fields with current values of aof
		
		// the length of cycles of (visible + invisible strokes)
		// set to be a factor of 48
		this.visCycleLen = cycleLens[this.aof.get("cycle length")]

		// the number of visible strokes in each cycle
		// manifested as "density" of the pattern
		this.visNum = Math.max(Math.floor((this.aof.get("density") + 1)/10*this.visCycleLen), 1)

		// the cycle length of stroke angles (angle relative to the main angle)
		this.angCycleLen = cycleLens[this.aof.get("angle cycle length")]

		// the range of angles
		this.angMin = this.aof.get("angle min")/10*Math.PI
		this.angMax = this.aof.get("angle max")/10*(Math.PI*2)

		// the length of strokes
		this.strokeLen = this.aof.get("stroke length")/9*30 + 10

	}

	draw(p) {
		
		let angleTotalNum = 48
		let radiusTotalNum = 10
		let radiusTotal = 120
		
		p.push()
		// first go through the radius
		for (let radiusNum=1; radiusNum <= radiusTotalNum; radiusNum++) {
			let radius = (radiusNum/radiusTotalNum) * radiusTotal

			// then go through angles
			for (let angleNum=0; angleNum < angleTotalNum; angleNum++) {
				let angle = (angleNum/angleTotalNum) * (Math.PI * 2)
				let x = radius * Math.cos(angle)
				let y = radius * Math.sin(angle)

				// go to each point on the polar coordinate
				p.push()
				p.translate(x, y)
				
				// find out the stroke angle "ang" (angle relative to the main angle "angle")
				let angNum = angleNum%this.angCycleLen
				let ang = (angNum/Math.max(this.angCycleLen-1, 1)) * (this.angMax - this.angMin) + this.angMin
				let x1 = this.strokeLen/2 * Math.cos(angle+ang)
				let y1 = this.strokeLen/2 * Math.sin(angle+ang)
				let x2 = this.strokeLen/2 * Math.cos(angle+ang+Math.PI)
				let y2 = this.strokeLen/2 * Math.sin(angle+ang+Math.PI)

				p.strokeWeight(2)

				// find out whether the stroke should be vislble/invisible
				if (angleNum%this.visCycleLen <= this.visNum) p.stroke(360)
				else p.stroke(0)
				
				p.line(x1, y1, x2, y2)				
				p.pop()
			} 
		}

		p.pop()
	}
}
CirclePattern.landmarks = {
	"daisy": [2.00,5.00,2.00,9.00,6.00,7.00],
	"dahlia": [0.00,9.00,2.00,1.00,3.00,3.00],
	"butterfly": [8.00,5.00,2.00,9.00,0.00,7.00],
	"snowflake": [5.00,6.00,4.00,5.00,6.00,7.00],
	"brushes": [8.00,7.00,7.00,5.00,0.00,9.00],
	"pin wheel": [4.00,2.00,2.00,6.00,5.00,9.00],
	"magnetic field": [0.00,2.00,8.00,3.00,7.00,4.00],
	"wavy circles": [5.00,8.00,1.00,4.00,8.00,1.00]
}
CirclePattern.labels = ["cycle length", "density", "angle cycle length", "angle min", "angle max", "stroke length"]
