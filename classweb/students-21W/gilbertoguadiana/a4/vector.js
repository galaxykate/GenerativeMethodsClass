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

	class Vector extends Array {
		constructor() {

			super(...arguments);
			for (var i = 0; i < arguments.length; i++) {
				if (isNaN(arguments[i]))
					throw(`NaN argument for Vector constructor: ${arguments[i]}(${typeof arguments[i]})`)
			}
		}

		// Check if this vector is broken in some way
		isValid() {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === undefined || this[i] === null|| isNaN(this[i]))
					return false
			}
			return true
		}

		checkIfValid() {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === undefined || this[i] === null|| isNaN(this[i]))
					throw(`Invalid vector: ${this}`)
			}
		}

		print() {
			console.log("(" + this.map(s => s.toFixed(2)).join(",") + ")")
		}


		//=============================================================
		// set

		copy(v) {
			for (var i = 0; i < v.length; i++) {
				this[i] = v[i]
			}
			this.checkIfValid()
			return this
		}


		setToDifference(v1, v0) {
			

			for (var i = 0; i < v1.length; i++) {
				this[i] = v1[i] - v0[i] 
			}
			this.checkIfValid()
			return this
		}

		setToMultiple(v, m) {
			

			for (var i = 0; i < v.length; i++) {
				this[i] = v[i]*m			}
			this.checkIfValid()
			return this
		}



		setToPolar(r, theta) {
			this[0] = r*Math.cos(theta)
			this[1] = r*Math.sin(theta)

			this.checkIfValid()
			return this
		}


		setToPolarOffset(v, r, theta) {
			this[0] = v[0] + r*Math.cos(theta)
			this[1] = v[1] + r*Math.sin(theta)
			for (var i = 2; i < v.length; i++) {
				this[i] = v[i]
			}
			this.checkIfValid()
			return this
		}

		//=============================================================
		// Multiplications
		mult(m) {
			if (isNaN(m))
				throw(`Invalid NaN multiplier ${m}`)

			for (var i = 0; i < this.length; i++) {
				this[i] *= m
			}
			this.checkIfValid()
			return this
		}

		div(m) {
			if (isNaN(m))
				throw(`Invalid NaN multiplier ${m}`)
			if (m === 0) {
				return 
			}

			for (var i = 0; i < this.length; i++) {
				this[i] /= m
			}
			this.checkIfValid()
			return this
		}
		
		//=============================================================
		// Additions

		addPolar(r, theta) {
			if (r == undefined || isNaN(r))
				throw(`Undefined radius for polar coordinate r:${r} theta:${theta}`)
			if (theta == undefined || isNaN(theta))
				throw(`Undefined theta for polar coordinate r:${r} theta:${theta}`)

			this[0] += r*Math.cos(theta)
			this[1] += r*Math.sin(theta)
			
			this.checkIfValid()
			return this
		}
		
		add() {

			for (var i = 0; i < this.length; i++) {
				for (var j = 0; j < arguments.length; j++) {
					if (isNaN(arguments[j][i])) {
						throw(`NaN element in added vector ${arguments[j]}: ${arguments[j][i]}(${typeof arguments[j][i]})`)
					}
					this[i] += arguments[j][i]
				}
			}
			
			this.checkIfValid()
			return this
		}


		addMultiples() {

			let count = arguments.length/2
			for (var i = 0; i < this.length; i++) {
				for (var j = 0; j < count; j++) {

					const v = arguments[j*2]

					// Ignore vectors that too short
					//   assume they are 0 in this dimension
					if (v.length > i) {
						const m = arguments[j*2 + 1]
						if (isNaN(m)) {
							throw(`addMultiples: NaN scalar multiple ${m}`)
						}
						if (isNaN(v[i])) {
							console.log(v, v[i])
							throw(`addMultiples: NaN element of vector ${v}`)
						}
						this[i] += v[i] * m
					}
				}
			}
			
			this.checkIfValid()
			return this
		}

		//=============================================================
		// Magnitude operations

		get magnitude() {
			let sum = 0
			for (var i = 0; i < this.length; i++) {
				sum += this[i]**2
			}
			
			return Math.sqrt(sum)
		}

		get angle() {
			return Math.atan2(this[1], this[0])
		}


		normalize() {
			let m = this.magnitude
			if (m  > 0) {
				for (var i = 0; i < this.length; i++) {
					this[i] /= m
				}
				
				this.checkIfValid()
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
		drawLine({p, 
				center=[0,0,0], 
				multiple=1,
				offsetStart=0, 
				offsetEnd=0}) {

			let m = this.magnitude
			let v = [this[0]/m,this[1]/m]
			p.line(
				center[0] + v*offsetStart[0],
				center[1] + v*offsetStart[1],
				center[0] + this[0] - v*offsetEnd[0],
				center[1] + this[1] - v*offsetEnd[1],


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
				p.translate(...center)

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


		//=============================================================
		// String things

		toFixed(length) {
			return this.map(s => s.toFixed(length)).join(",")
		}
	 
	}

	// Add several vectors
	Vector.average = function() {
		let vectors = Array.from(arguments)


		// If there are *no* vectors to average?
		// Return [0,0]
		if (vectors.length == 0 || vectors[0].length == 0)
			return new Vector(0, 0)


		// Is this an array of arrays, or an array of numbers?
		// console.log(vectors)
		// console.log(vectors[0][0])
		if (vectors.length === 1 && !isNaN(vectors[0][0][0])) {
			// console.log("Array of vectors")
			vectors = vectors[0]
		}

		

		let v = Vector.empty(vectors[0].length)
		
		return v.add(...vectors).div(vectors.length)
	}

	Vector.getDistance = function(v0, v1) {
		let dimension = v0.length
		let sum = 0
		for (var i = 0; i < dimension; i++) {
			sum += (v1[i] - v0[i])**2
		}
		return Math.sqrt(sum)
	}

	// Add several vectors
	Vector.getNormal = function(v0) {
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



	return Vector

});