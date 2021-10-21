

class Face {
	constructor(aof) {
		// Keep these
		this.aof = aof
		this.center = new Vector(0,0)
		this.eyes = [new Eye(1), new Eye(-1)]
		this.ears = [new Ear(1), new Ear(-1)]
	}


	update() {
		//slider values
		const angle = this.aof.get("eyeAngle")
		const earAngle = this.aof.get("earAngle")
		const pupil = this.aof.get("pupilPosition")
		const mainColourHue = this.aof.get("mainColourHue")*360
		const mainColourSaturation = this.aof.get("mainColourSaturation")*100
		const mainColourBrightness = this.aof.get("mainColourBrightness")*100
		const eyeColourHue = this.aof.get("eyeColourHue")*360
		const eyeColourBrightness = this.aof.get("eyeColourBrightness")*100
		const pupilColourHue = this.aof.get("pupilColourHue")*360
		const pupilColourBrightness = this.aof.get("pupilColourBrightness")*100
		const earColourHue = this.aof.get("earColourHue")*360
		const earColourBrightness = this.aof.get("earColourBrightness")*100
		
		this.mainColourHue = mainColourHue
		this.mainColourBrightness = mainColourBrightness
		this.mainColourSaturation = mainColourSaturation
		
		//updating properties from sliders for eyes and ears
		this.eyes.forEach(eye => eye.update(angle, pupil, eyeColourHue, eyeColourBrightness, pupilColourHue, pupilColourBrightness))
		this.ears.forEach(ear => ear.update(earAngle, mainColourHue, mainColourBrightness, mainColourSaturation, earColourHue, earColourBrightness))
	}

	draw(p) {
		p.push()
		
		p.stroke(0)
		p.noFill()
		p.strokeWeight(1)
		
		//draw ears first - this is important since ear shape is not perfect
		this.ears.forEach(ear => ear.draw(p))

		//fill in colour from slider
		p.fill(this.mainColourHue, this.mainColourSaturation, this.mainColourBrightness)
		//draw head
		p.beginShape()
		p.curveVertex(-30, -30)
		p.curveVertex(-30, -30)
		p.curveVertex(-60, 0)
		p.curveVertex(-60, 65)
		p.curveVertex(0, 90)
		p.curveVertex(60, 65)
		p.curveVertex(60, 0)
		p.curveVertex(30, -30)
		p.endShape(p.CLOSE)

		//draw nose
		p.fill(0)
		p.ellipse(0,50,5,1.5)

		//draw mouth
		p.noFill()
		p.beginShape()
		p.curveVertex(-25,60)
		p.curveVertex(-25,60)
		p.curveVertex(-15,65)
		p.curveVertex(0,60)
		p.curveVertex(15,65)
		p.curveVertex(25,60)
		p.curveVertex(25,60)
		p.endShape()

		//draw eyes
		this.eyes.forEach(eye => eye.draw(p))

		p.pop()


	}
}

Face.landmarks = {
	"Eevee": [1.00,0.00,0.59,0.10,0.47,0.57,0.12,0.20,0.98,0.00,0.52,1.00],
	"Flareon": [1.00,0.87,0.56,0.06,0.80,0.61,0.77,0.12,0.98,0.00,0.52,1.00],
	"Jolteon": [1.00,0.39,0.38,0.12,0.94,0.71,0.12,0.00,0.98,0.00,0.52,1.00],
	"Vaporeon": [0.48,0.84,0.00,0.53,0.63,0.68,0.15,0.84,0.98,0.00,0.52,1.00],
	"Umbreon": [0.36,0.92,0.59,0.50,0.21,0.01,0.14,0.49,0.98,0.50,0.52,0.00],
	"Espeon": [0.29,0.84,0.56,0.87,0.55,0.79,0.76,0.46,0.72,0.66,0.13,1.00]
}

Face.labels = ["pupilPosition", "eyeAngle", "earAngle", "mainColourHue", "mainColourSaturation", "mainColourBrightness", "earColourHue", "earColourBrightness", "eyeColourHue", "eyeColourBrightness", "pupilColourHue", "pupilColourBrightness"]

class Eye {
	constructor(side){
		this.side=side
		this.angle=0
		this.pupil=-10
	}

	update(angle, pupil, eyeColourHue, eyeColourBrightness, pupilColourHue, pupilColourBrightness){
		this.angle = angle*Math.PI*2
		this.pupil = 10-(pupil*20)
		this.eyeColourHue = eyeColourHue
		this.eyeColourBrightness = eyeColourBrightness
		this.pupilColourHue = pupilColourHue
		this.pupilColourBrightness = pupilColourBrightness
	}

	draw(p){
		p.noFill()
		p.push()
		p.translate(-25*this.side, 20)
		p.rotate(this.angle*this.side)
		
		//draw eye
		p.fill(this.eyeColourHue, 100, this.eyeColourBrightness)
		p.ellipse(0,0,15,25)
		
		//draw pupil
		p.fill(this.pupilColourHue, 100, this.pupilColourBrightness)
		p.ellipse(5*this.side,this.pupil,5,8)
		
		p.pop()
	}
}

class Ear {
	constructor(side){
		//decides whether to draw left or right ear
		this.side=side
		//used for ear angle
		this.angle=0
		this.mainColourHue=""
		this.mainColourBrightness=""
		this.mainColourSaturation=""
		this.earColourHue=""
		this.earColourBrightness=""
	}

	update(angle, mainColourHue, mainColourBrightness, mainColourSaturation, earColourHue, earColourBrightness){
		this.angle = (3*Math.PI/2)+angle*(Math.PI/2)
		this.mainColourHue = mainColourHue
		this.mainColourBrightness = mainColourBrightness
		this.earColourHue = earColourHue
		this.earColourBrightness = earColourBrightness
		this.mainColourSaturation = mainColourSaturation
	}

	draw(p){
		p.noFill()
		p.push()
		p.translate(-30*this.side, -30)
		p.rotate(this.angle*this.side)
		
		p.stroke(0)
		
		//calculate values for the X and Y coordinate. Done based on best visual representation of ears
		let val = -15+(this.angle-4.7)*23
		let val2 = (this.angle-4.7)*16
		let val3 = -1*Math.abs(7.5-(this.angle-4.7))+21
		
		//draw each ear
		p.fill(this.mainColourHue, this.mainColourSaturation, this.mainColourBrightness)
		p.beginShape()
		p.vertex(-25*this.side, val)
		p.bezierVertex(-35*this.side,val, -15*this.side,-30, 0*this.side, -80)
		p.bezierVertex(15*this.side,-30,(val2+10)*this.side,val3-15, (val2+2)*this.side, val3)
		p.endShape(p.CLOSE)

		//draw each inner ear
		p.fill(this.earColourHue, 100, this.earColourBrightness)
		p.beginShape()
		p.vertex(-15*this.side, val)
		p.bezierVertex(-25*this.side, val, -5*this.side, -30, 0*this.side, -70)
		p.bezierVertex(5*this.side,-30, (val2)*this.side,val3-5, (val2-5)*this.side, val3)
		p.endShape(p.CLOSE)
		
		p.pop()
	}
}
