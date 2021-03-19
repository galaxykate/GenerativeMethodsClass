// Define UMD module for both AMD and browser.
((root, factory) => {
	// Detects AMD/RequireJS"s define function.
	if (typeof define === "function" && define.amd) {
		// Is AMD/RequireJS. Call factory with AMD/RequireJS"s define function.
		define("vector", [], factory);
	} else {
		// Is Browser. Directly call factory.
		// Imported dependencies are global variables(properties of window object).
		// Exported module is also a global variable(property of window object)
		root.vector = factory();
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

	return {

		// Create an all-zero vector
		createEmpty(count) {
			let a = []
			for (var i = 0; i < count; i++) {
				a[i] = 0
 			}
 			return a
		},

		// Create a random vector
		createRandom(count, min=0, max=1) {
			let a = []
			for (var i = 0; i < count; i++) {
				a = Math.random()*(max - min) + min
			}
			return a
		},

		// Several useful kinds of vector math

		// Add up all the arguments (vector-wise)
		getAdd() {
			let dimension = getDimension.apply(null, arguments);
			let v = this.createEmpty(dimension)
			for (var i = 0; i < dimension; i++) {
				for (var j = 0; j < arguments.length; j++) {
					v[i] += arguments[j][i]
				}
			}
			return v
		},

		// Add up all the arguments (vector-wise)
		add() {
			let dimension = getDimension.apply(null, arguments);
			for (var i = 0; i < dimension; i++) {
				for (var j = 1; j < arguments.length; j++) {
					arguments[0][i] += arguments[j][i]
				}
			}
			return arguments[0]
		},

		// Normalize this vector
		normalize(v) {
			let m = this.magnitude(v)
			for (var i = 0; i < v.length; i++) {
				v[i] /= m
			}
			return v
		},


		// multiply this vector
		mult(v, m) {
			for (var i = 0; i < v.length; i++) {
				v[i] *= m
			}
			return v
		},

			// multiply this vector
		getMult(v1, m) {
			let v = v1.slice()
			for (var i = 0; i < v.length; i++) {
				v[i] *= m
			}
			return v
		},



		// Subtract two vectors and return a new vector
		getSub(v1, v0) {
			let dimension = getDimension.apply(null, arguments);
			let v = this.createEmpty(dimension)
			for (var i = 0; i < dimension; i++) {
				v[i] = v1[i] - v0[i]
			}
			return v
		},


		// Subtract two vectors, in place
		sub(v1, v0) {
			let dimension = getDimension.apply(null, arguments);
			let v = this.createEmpty(dimension)
			for (var i = 0; i < dimension; i++) {
				v1[i] -= v0[i]
			}
			return v1
		},

		// Add in place
		getAddPolar(v1, r, theta) {
			let v = v1.slice(0)

			v[0] += r*Math.cos(theta)
			v[1] += r*Math.sin(theta)
			return v
		},

		// Create a new
		addPolar(v, r, theta) {
			v[0] += r*Math.cos(theta)
			v[1] += r*Math.sin(theta)
			return v
		},

		// Get the magnitude
		magnitude(v) {
			let sum = 0
			for (var i = 0; i < v.length; i++) {
				sum += v[i]*v[i]
			}
			return Math.sqrt(sum)
		},



		lerp(v0, v1, pct) {
			let dimension = getDimension.apply(null, [v0,v1]);
			let v = this.createEmpty(dimension)
			for (var i = 0; i < dimension; i++) {
				v[i] = (pct)*v1[i] + (1 - pct)*v0[i]
			}
			return v
		},

	};
});
