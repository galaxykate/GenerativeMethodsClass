//get random value in an array
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
				this.grid[i][j] = undefined
				this.next[i][j] = undefined
			}
		}
		
	}

	//set value of a particular cell
  set(x, y, val) {
		if (this.isWrapped) {
			y = (y + this.h)%this.h
			x = (x + this.w)%this.w
		}
	
		if (y < 0 || y >= this.h || x < 0 || x >= this.w)
			return undefined

		this.grid[y][x] = val
	}

  //get value of a particular cell
	get(x, y) {
		if (this.isWrapped) {
			y = (y + this.h)%this.h
			x = (x + this.w)%this.w
		}

		if (y < 0 || y >= this.h || x < 0 || x >= this.w)
			return undefined

		return this.grid[y][x]
	}

	//set all cells given function that sets them (based on conditions)
  setAll(fxn) {
		for (var i = 0; i < this.h; i++) {
			for (var j = 0; j < this.w; j++) {
				this.grid[i][j] = fxn(j, i)
			}
		}
	}

  //set all cells (in backup grid) given function that sets them (based on conditions)
	setNext(fxn) {
		for (var i = 0; i < this.h; i++) {
			for (var j = 0; j < this.w; j++) {
				// Vue.set()
				this.next[i][j] = fxn(j, i, this.grid[i][j])
			}
		}
	}

	//swap main and backup grid
  swap() {
		let temp = this.next
		this.next = this.grid
		this.grid = temp
	}

}
