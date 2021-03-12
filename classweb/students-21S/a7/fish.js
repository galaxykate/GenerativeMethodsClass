

class Fish {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {
		
		this.aof = aof
		this.center = new Vector()
	}


	update(t, dt) {
		// let hue = this.aof.get("flowerHue")
		// // Update this with the current value of the AOF and any other parameters, like time
		// this.root.energy = this.aof.energy
		// this.root.start.orientation = -Math.PI/2
		// this.root.update(t, dt)

		// this.flowerColor.setTo((300*hue + 100)%360, 100, 80)

	}

	draw(p) {
		p.push()
		
		// Draw the root (and recursively, all the branches)
		p.noStroke()
		p.strokeWeight(1)
		p.stroke(0,0,0)
		let hue = this.aof.get("hue")*360
		console.log("hue", hue)
		p.fill(hue, 100, 50)
		let radius = this.aof.get("size") *50 + 20
		p.ellipse(0, 0, radius, radius*(1 + this.aof.get("aspect")))		
		p.ellipse(radius *.8, 0, radius, radius*.3)		
		
		
		p.pop()
	}
}


// Static properties for this class
Fish.landmarks = {
	"palm": [0.4, 0.5, 0.1, 0.5],
	"pine": [0.4, 0.5, 0.1, 0.5],
	"oak": [0.4, 0.5, 0.1, 0.5],
	"willow": [0.4, 0.5, 0.1, 0.5]
}
Fish.labels = ["size", "hue", "aspect"]

