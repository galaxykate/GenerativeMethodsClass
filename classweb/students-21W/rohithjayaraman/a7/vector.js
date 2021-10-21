// NON-extended-array vector (safe for Vue)

// Define UMD module for both AMD and browser.
((root, factory) => {
	// Detects AMD/RequireJS"s define function.
	if (typeof define === "function" && define.amd) {
		// Is AMD/RequireJS. Call factory with AMD/RequireJS"s define function.
		define("Vector", [], factory);
	} else {
		// Is Browser. Directly call factory.
		// Imported dependencies are global variables(properties of window object).
		// Exported module is also a global variable(property of window object)
		root.Vector = factory();
	}
})(typeof self !== "undefined" ? self : this, () => {

	function getDimension() {
		let d = undefined
		for (var i = 0; i < arguments.length; i++) {
			if (!Array.isArray(arguments[i]))
				throw("Unexpected non-array argument: " + arguments[i])
			let d2 =  arguments[i].length
			if (d == undefined)
				d = d2
			if (d2 != d) {
				d = Math.min(d, d2)
				console.warn("Unequal vector lengths:", d, d2)
			}
		}
		return d
	}

	class Vector  {
		constructor() {
			if (arguments.length == 0)
				this.coords = new Array(0,0)
			else
				this.coords = new Array(...arguments)
			
			for (var i = 0; i < arguments.length; i++) {
				if (isNaN(arguments[i]))
					console.warn(`NaN argument for Vector constructor: ${arguments[i]}(${typeof arguments[i]})`)
			}
		}

		// Check if this vector is broken in some way
		isValid() {
			for (var i = 0; i < this.coords.length; i++) {
				if (this.coords[i] === undefined || this.coords[i] === null|| isNaN(this.coords[i]))
					return false
			}
			return true
		}

		print() {
			console.log("(" + this.coords.map(s => s.toFixed(2)).join(",") + ")")
		}


		//=============================================================
		// set

		// Copy a vector or an array
		copy(v) {
			if (v.coords)
				v = v.coords

			for (var i = 0; i < v.length; i++) {
				this.coords[i] = v[i]
			}
			return this
		}

		setTo(x, y, z) {
			this.coords[0] = x
			this.coords[1] = y
			this.coords[2] = z
		}

		setToDifference(v1, v0) {
			if (v1.coords)
				v1 = v1.coords
			if (v0.coords)
				v0 = v0.coords

			for (var i = 0; i < v1.length; i++) {
				this.coords[i] = v1[i] - v0[i] 
			}
			return this
		}

		setToMultiple(v, m) {
			if (v.coords)
				v = v.coords

			for (var i = 0; i < v.length; i++) {
				this.coords[i] = v[i]*m			}
			return this
		}



		setToPolar(r, theta) {
			this.coords[0] = r*Math.cos(theta)
			this.coords[1] = r*Math.sin(theta)

			return this
		}


		setToPolarOffset(v, r, theta) {
			if (v.coords)
				v = v.coords

			this.coords[0] = v[0] + r*Math.cos(theta)
			this.coords[1] = v[1] + r*Math.sin(theta)
			for (var i = 2; i < v.length; i++) {
				this.coords[i] = v[i]
			}
			return this
		}

		//=============================================================
		// Multiplications
		mult(m) {
			if (isNaN(m))
				throw(`Invalid NaN multiplier ${m}`)

			for (var i = 0; i < this.coords.length; i++) {
				this.coords[i] *= m
			}
			return this
		}

		div(m) {
			if (isNaN(m))
				throw(`Invalid NaN multiplier ${m}`)
			if (m === 0) {
				return 
			}

			for (var i = 0; i < this.coords.length; i++) {
				this.coords[i] /= m
			}
			return this
		}
		
		//=============================================================
		// Additions

		addPolar(r, theta) {
			if (r == undefined || isNaN(r))
				throw(`Undefined radius for polar coordinate r:${r} theta:${theta}`)
			if (theta == undefined || isNaN(theta))
				throw(`Undefined theta for polar coordinate r:${r} theta:${theta}`)

			this.coords[0] += r*Math.cos(theta)
			this.coords[1] += r*Math.sin(theta)
			
			return this
		}
		
		add() {

			for (var j = 0; j < arguments.length; j++) {
				let v = arguments[j].coords || arguments[j]
				for (var i = 0; i < this.coords.length; i++) {
					if (v[i] !== undefined)
						this.coords[i] += v[i]
				}
			}
			
			return this
		}


		addMultiples() {
			let count = arguments.length/2
			for (var i = 0; i < this.coords.length; i++) {
				// Do each dimension
				for (var j = 0; j < count; j++) {

					let v = arguments[j*2].coords || arguments[j*2]
				

					// Ignore vectors that too short
					//   assume they are 0 in this dimension
					if (v[i] !== undefined) {
						const m = arguments[j*2 + 1]
						if (isNaN(m)) {
							throw(`addMultiples: NaN scalar multiple ${m}`)
						}
						if (isNaN(v[i])) {
							console.log(v, v[i])
							throw(`addMultiples: NaN element of vector ${v}`)
						}
						this.coords[i] += v[i] * m
					}
				}
			}
			
			return this
		}

		//=============================================================
		// Magnitude operations

		get magnitude() {
			let sum = 0
			for (var i = 0; i < this.coords.length; i++) {
				sum += this.coords[i]**2
			}
			
			return Math.sqrt(sum)
		}

		get angle() {
			return Math.atan2(this.coords[1], this.coords[0])
		}

		normalize() {
			let m = this.magnitude
			if (m  > 0) {
				for (var i = 0; i < this.coords.length; i++) {
					this.coords[i] /= m
				}
				
			}
			return this
		}

		clampMagnitude(min, max) {
			let m = this.magnitude
			this.mult(Math.max(Math.min(max, m), min)/m)
			return this
		}

		//=============================================================
		// Drawing
		toSVG() {
			return this.coords.map(s => s.toFixed(2)).join(" ")
		}

		drawLine({p, 
				center=[0,0,0], 
				multiple=1,
				offsetStart=0, 
				offsetEnd=0}) {

			let m = this.magnitude
			let v = [this.coords[0]/m,this.coords[1]/m]
			p.line(
				center[0] + v*offsetStart[0],
				center[1] + v*offsetStart[1],
				center[0] + this.coords[0] - v*offsetEnd[0],
				center[1] + this.coords[1] - v*offsetEnd[1],


			)
		}


		drawArrow({p, 
				center=[0,0,0], 
				multiple=1,
				arrowSize=10, 
				color=[0,0,0], 
				offsetStart=0, 
				offsetEnd=0}) {


			let m = this.magnitude*multiple
			p.push()
			if (center)
				p.translate(...center.coords)

			p.rotate(this.angle)
			p.translate(offsetStart, 0)


			p.noFill()
			p.stroke(color)
			p.line(0, 0, m - arrowSize, 0)

			p.translate(m, 0)

			p.noStroke()
			p.fill(color)
			
			p.beginShape()
			p.vertex(0, 0)
			p.vertex(-arrowSize*1.2, arrowSize*.5)
			p.vertex(-arrowSize, 0)
			p.vertex(-arrowSize*1.2, -arrowSize*.5)
			p.endShape(p.CLOSE)
			
			p.pop()
		}

		draw(p, radius=3) {
			p.circle(...this.coords, radius)
		}

		//=============================================================
		// String things

		toFixed(length) {

			return this.coords.map(s => s.toFixed(length)).join(",")
		}
	 
	}

	// Add several vectors
	Vector.average = function() {
		let vectors = Array.from(arguments)


		// If there are *no* vectors to average?
		// Return [0,0]
		if (vectors.length)
			return new Vector(0, 0)


		// Is this an array of arrays, or an array of numbers?
		// console.log(vectors)
		// console.log(vectors[0][0])
		if (vectors.length === 1 && !isNaN(vectors.coords[0][0][0])) {
			// console.log("Array of vectors")
			vectors = vectors.coords[0]
		}



		let v = Vector.empty(vectors[0].coords.length)
		
		return v.add(...vectors).div(vectors.length)
	}

	Vector.getDistance = function(v0, v1) {
		v0 = v0.coords || v0
		v1 = v1.coords || v1

		let dimension = v0.length
		let sum = 0
		for (var i = 0; i < dimension; i++) {
			sum += (v1[i] - v0[i])**2
		}
		return Math.sqrt(sum)
	}

	// Add several vectors
	Vector.getNormal = function(v0) {
		v0 = v0.coords || v0
		
		let v = new Vector(v0[1], -v[0])
		v.normalize()
		return v
	}


	// Get a vector that is v1 - v0 (useful for spring forces)
	Vector.getDifference = function(v0, v1) {
		return Vector.addMultiples(v0, -1, v1, 1)
	}

	// Add several vectors
	Vector.add = function() {
		return Vector.empty(arguments[0].length).add(...arguments)
	}

	// Add several vectors each multiplied by a scalar
	Vector.addMultiples = function() {
		return Vector.empty(arguments[0].length).addMultiples(...arguments)
	}

	// Add several vectors each multiplied by a scalar
	Vector.addPolar = function(v, r, theta) {
		return new Vector(v[0] + r*Math.cos(theta), v[1] + r*Math.sin(theta))
	}

	// Create a random polar coordinate
	Vector.randomPolar = function(r=1) {
		let theta = Math.PI*2*Math.random()
		return new Vector(r*Math.cos(theta), r*Math.sin(theta))
	}
	
	// Create a polar coordinate
	Vector.polar = function(r, theta) {
		return new Vector(r*Math.cos(theta), r*Math.sin(theta))
	}

	// Create an empty vector
	Vector.empty = function(dimension=3) {
		let v =  []
		for (var i = 0; i < dimension; i++) {
			v.push(0)
		}
		return new Vector(...v)
	}

	// Create a random vector [0-1]
	Vector.random = function() {
		let dimension = 2 || arguments.length
		

		let v =  []
		for (var i = 0; i < dimension; i++) {
			let range = arguments[i] || arguments[0] || [0,1]
			if (range !== undefined) {
				if (Array.isArray(range) && range.length == 2) {

				} else {
					throw(`unexpected range for random vector: ${range}`)
				}
			}

			v[i] = Math.random()*(range[1] - range[0]) + range[0]
		}

		return new Vector(...v)
	}

	Vector.drawLineBetween = function({p,v0,v1,multiple=1,offsetStart=0, offsetEnd=0}) {
		v0 = v0.coords || v0
		v1 = v1.coords || v1
		let dx = v1[0]-v0[0]
		let dy = v1[1]-v0[1]

		let m = Math.sqrt(dx**2 + dy**2)

	
		p.line(
			v0[0] + dx*offsetStart/m,
			v0[1] + dy*offsetStart/m,
			v1[0] - dx*offsetEnd/m,
			v1[1] - dy*offsetEnd/m,


		)
	}

	Vector.polarOffsetVertex = function(p, v, r, theta) {
		v = v.coords || v
		p.vertex(v[0] + r*Math.cos(theta), v[1] + r*Math.sin(theta))
	}

	Vector.polarVertex = function(p,  r, theta) {
		p.vertex(r*Math.cos(theta), r*Math.sin(theta))
	}

	Vector.polarCurveVertex = function(p,  r, theta) {
		p.curveVertex(r*Math.cos(theta), r*Math.sin(theta))
	}

	Vector.bezierVertex = function(p, cp0, cp1, v) {
		v = v.coords || v
		cp0 = cp0.coords || cp0
		cp1 = cp1.coords || cp1
		p.bezierVertex(...cp0, ...cp1, ...v)
	}


	return Vector

});