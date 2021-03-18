class LTree {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {
		
		this.aof = aof
		this.root = new LTreeBranch(this)
		this.center = new Vector()
		this.flowerColor = new Vector()
	}


	update(t, dt) {
		let hue = this.aof.get("flowerHue")
		// Update this with the current value of the AOF and any other parameters, like time
		this.root.start.orientation = -Math.PI/2
		this.root.update(t, dt)

		this.flowerColor.setTo((300*hue + 100)%360, 100, 80)

	}

	draw(p) {
		p.push()
		
		// Draw the root (and recursively, all the branches)
		p.noStroke()
		this.root.draw(p)
		
		p.pop()
	}
}


// Static properties for this class
LTree.landmarks = {
	"The OG": [0.0, 0.0, 0.0, 1.00,0.345, 0.171],
	"Multiple Floating Heads": [1.0, 1.0, 0.0,0.590,0.891, 0.507],
	"Frizzly Mini-Spiked": [0.609, 0.0,0.365,1.00,0.179,0.778],
	"Single Armageddon": [0.0, 0.0, 0.0, 0.926,0.891, 1],
	"Roundball Armageddon": [0.513, 0.264, 1.0, 0.0,0.105, 0.927]
}	
LTree.labels = ["range of impact", "scope", "size of grip handle", "bluntness", "size of spike nodes", "Spikiness"]

let branchCount = 0

class LTreeBranch {
	constructor(parent) {

		this.idNumber = branchCount++
		
		
		if (parent instanceof LTreeBranch) {
			this.parent = parent
			this.depth = parent.depth + 1
			this.tree = this.parent.tree
		}
		else {
			this.depth = 0
			this.tree = parent
		}

		let impact = this.tree.aof.get("range of impact")

		this.start = new LTreeBranchNode()
		this.end = new LTreeBranchNode()
		this.length = 0



	
		this.branches = []

		

		if (this.depth < 3) {
			let numBranches = 2
			for (var i = 0; i < numBranches; i++) {
				
				this.branches.push(new LTreeBranch(this))
			}
		}

	}	

	update(t, dt) {

		this.end.setToPolarOffset(this.start, this.length, this.start.orientation)

		let impact = this.tree.aof.get("range of impact")

		let scope = this.tree.aof.get("scope")
		let grip = this.tree.aof.get("size of grip handle")
		

		this.end.orientation = this.start.orientation


		// Multiply by somewhere between .5  and .9
		
		if (this.parent) {
			this.length = this.parent.length * (.5 + .4*scope)
		}
		
		else  {

			// TRUNK!
			this.start.color.setTo(20, 40, 50)
			this.start.radius = 30*(.9 - .4*grip)
			this.length = 100*(.9 - .4*scope)
		}

		this.end.radius = this.start.radius * (.5 + .4*grip)
		this.end.color.copy(this.start.color)

		this.branches.forEach((b,i) => {
			let pct = this.branches.length==1?.5:i/(this.branches.length - 1) - .5

			let waving =  Math.sin(t + this.depth)*.1
			let theta = (1.8*impact + .5)*pct + waving


			b.start.copy(this.end)
			b.start.radius = this.end.radius 
			b.start.color.copy(this.end.color)

			b.start.orientation =  this.end.orientation + theta

			b.update(t, dt)
		})
	}

	draw(p) {
		let theta = this.orientation
		p.fill(...this.start.color.coords)




		

		this.start.draw(p)
		this.end.draw(p)
		this.branches.forEach(b => b.draw(p))

		// Flower
		if (this.branches.length === 0) {
			p.push()

			p.translate(...this.end.coords)
			p.rotate(this.end.orientation)
			

			p.fill(...this.tree.flowerColor.coords)
			let blunt = this.tree.aof.get("bluntness")
			let spike = this.tree.aof.get("Spikiness")
			let petalCount = 6
			for (var i = 0; i < petalCount; i++) {
				let theta = i*Math.PI*2/petalCount
				let r = this.tree.aof.get("size of spike nodes")*20 + 10
				p.beginShape()
				p.vertex(0, 0)
				Vector.polarVertex(p, r*spike, theta - blunt)
				Vector.polarVertex(p, r, theta)
				Vector.polarVertex(p, r*spike, theta + blunt)
				p.vertex(0, 0)
				p.endShape()
			}


			p.pop()
		}
		
	}
}


// Like a Vector but with orientation and radius
class LTreeBranchNode extends Vector {
	constructor() {
		super(0,0)
		this.radius = Math.random()*10 + 10
		this.orientation = Math.random()*6.15
		this.color = new Vector(0, 0, 0)
	}

	draw(p) {

		p.fill(100, 0, 100)
		p.stroke(0, 0, 0)
		p.circle(...this.coords, this.radius)
		let r = this.radius + 10
		p.line(...this.coords, this.coords[0] + r*Math.cos(this.orientation), this.coords[1] + r*Math.sin(this.orientation))
	}
}
