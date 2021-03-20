// A cellular automata grid


function getRandom(arr) {
	return arr[Math.floor(Math.random()*arr.length)]
}


class Grid {
	constructor(w, h, isWrapped) {
		this.isWrapped = isWrapped
		this.w = w
		this.h = h
		this.grid = []
		this.next = []
		for (var i = 0; i < this.h; i++) {
			this.grid[i] = []
			this.next[i] = []
			for (var j = 0; j < this.w; j++) {
				this.grid[i][j] = [undefined, undefined, undefined]
				this.next[i][j] = [undefined, undefined, undefined]
			}
		}
		
	}

	setPurchase(x, y, val) {
		if (this.isWrapped) {
			y = (y + this.h)%this.h
			x = (x + this.w)%this.w
		}
	
		if (y < 0 || y >= this.h || x < 0 || x >= this.w)
			return undefined

		// only set the third element: the boolean for purchased or not
		this.grid[y][x][2] = val
	}

	get(x, y) {
		if (this.isWrapped) {
			y = (y + this.h)%this.h
			x = (x + this.w)%this.w
		}

		if (y < 0 || y >= this.h || x < 0 || x >= this.w)
			return undefined

		return this.grid[y][x]
	}

	// set all the "tendency of being influenced"
	setAllInfluenced(fxn) {
		for (var i = 0; i < this.h; i++) {
			for (var j = 0; j < this.w; j++) {
				this.grid[i][j][0] = fxn(j, i)
			}
		}
	}

	// set all the budgets
	setAllBudget(fxn) {
		for (var i = 0; i < this.h; i++) {
			for (var j = 0; j < this.w; j++) {
				this.grid[i][j][1] = fxn(j, i)
			}
		}
	}
	
	// set all the purchase value, then convert to a boolean based on a threshold
	setAllPurchase(fxn) {
		for (var i = 0; i < this.h; i++) {
			for (var j = 0; j < this.w; j++) {
				this.grid[i][j][2] = fxn(j, i)
			}
		}
	}

	// only the purchase boolean is updated
	setNextPurchase(fxn) {
		for (var i = 0; i < this.h; i++) {
			for (var j = 0; j < this.w; j++) {
				// Vue.set()
				this.next[i][j][2] = fxn(j, i, this.grid[i][j][2])
			}
		}
	}

	// only swap the purchase boolean
	swap() {
		for (var i = 0; i < this.h; i++) {
			for (var j = 0; j < this.w; j++) {
				let temp = this.next[i][j][2]
				this.next[i][j][2] = this.grid[i][j][2]
				this.grid[i][j][2] = temp
			}
		}
		// let temp = this.next
		// this.next = this.grid
		// this.grid = temp
	}
	

	debugPrintGrid() {
		for (var i = 0; i < this.h; i++) {
			console.log(this.grid[i].join("\t"))
		}
	}

	debugPrintNext() {
		for (var i = 0; i < this.h; i++) {
			console.log(this.grid[i].join("\t"))
		}
	}
}
