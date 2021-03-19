
let symbols = "💰 🕴 🕺".split(" ") // creates array of symbols
let symbols1 = "🕴 🕺".split(" ") // creates array of symbols

let simCount = 0
class Simulation {
	// Some number of grids
	constructor(mode) {
		// Mode can control various factors about the simulation

		this.mode = mode
		this.idNumber = simCount++
		this.noiseSeed = this.idNumber
		this.stepCount = 0

		// Set my size
		this.w = 20
		this.h = 10


		this.isWrapped = true
		this.isPaused = true
		this.selectedCell = undefined

		this.noiseScale = .3

		this.gameOfLifeGrid = new Grid(this.w, this.h, this.isWrapped)

		// You can make additional grids, too
		// this.heightMap = new Grid(this.w, this.h, this.isWrapped)
		this.emojiGrid = new Grid(this.w, this.h, this.isWrapped)

		// Tuning values for the continuous simulation
		this.backgroundRadiation = 1
		this.lifeThreshold = 1

		this.randomize()

	}

	randomize() {
		console.log("set to a random layout")
		this.noiseSeed += 10

		// Setup the board
		if(this.mode=="chasingMoney" || this.mode=="chasingMoneyAndCommunity"){
			this.emojiGrid.setAll((x,y) => Math.random()>.9?getRandom(symbols):"")
		}

		if(this.mode=="chasingCommunity"){
			this.emojiGrid.setAll((x,y) => Math.random()>.9?getRandom(symbols1):"")
		}
	}

	step() {
		this.stepCount++

		// Make one step
		// Set all the next steps, then swap the buffers

		this.emojiGrid.setNext((x, y, currentValue) => {
			let neighbors = this.getNeighborPositions(x, y, true)

			// get count of ecstatic/ambitious neighbors and check if money object is neighbor
			let countEcstatic = 0;
			let countAmbitious = 0;
			let aroundMoney = 0;
			let grid = this.emojiGrid;
			let value = this.emojiGrid.get(x,y);

			neighbors.forEach(function (position)
				{ let value = grid.get(position[0],position[1]);
					if(value == "🕺"){
						countEcstatic = countEcstatic + 1;
					}
					if(value == "🕴"){
						countAmbitious = countAmbitious + 1;
					}
					if(value == "💰"){
						aroundMoney = 1;
					}
				});

			switch (this.mode) {
				case "chasingMoney": { // implement rules for chasingMoney
					let randval = Math.random(); // get random value from 0 to 1.
					if(value == "🕴"){ // check for ambitious person
						if(aroundMoney != 0){ // 25% become ecstatic people 🕺, 30% become empty squares □
							if(randval <= 0.25){
								return "🕺";
							}
							if(randval >= 0.70){
								return "";
							}
							else{ // do nothing
								return "🕴";
							}
						}
						else { // 30% become empty squares
							if(randval >= 0.70){
								return "";
							}
							else{ // do nothing
								return "🕴";
							}
						}
					}

					if(value == ""){ // check for empty square
						if(countEcstatic != 0){ // 50% chance of becoming an ecstatic person
							if(randval <= 0.50){
								return "";
							}
						}
						if(countAmbitious != 0){ // 25% chance of becoming an ambitious person
							if(randval >= 0.75){
								return "🕴";
							}
						}
						else{ // 15% chance of becoming an ambitious person 🕴, 5% chance of becoming an ecstatic person 🕺
							if(randval >= 0.85){
								return "🕴";
							}
							if(randval <= 0.05){
								return "🕺";
							}
							else{
								return ""; // do nothing
							}
						}
					}

					if(value == "🕺"){ // check for ecstatic person
						if(randval >= 0.9){ // 10% become ambitious people 🕴, 55% become empty squares □
							return "🕴";
						}
						if(randval <= 0.55){
							return "";
						}
						else{
							return "🕺"; // do nothing
						}

					}

					if(value == "💰"){ // check for money object. do nothing.
						return "💰";
					}
					return "";
				}


				case "chasingCommunity": {
					let randval = Math.random(); // get random value from 0 to 1.
					if(value == "🕴"){ // check for ambitious person
						if(countAmbitious != 0){ // If you are next to an ambitious person 🕴, 15% become empty squares □, 25% become ecstatic people 🕺
							if(randval >= 0.75){
								return "🕺";
							}
							if(randval <= 0.15){
								return "";
							}
							else{
								return "🕴"; // do nothing
							}
						}
						else{
							// 30% become empty squares
							if(randval >= 0.70){
								return "";
							}
							else{ // do nothing
								return "🕴";
							}
						}
						}


					if(value == ""){ // check for empty square
						if(countEcstatic != 0){ // 50% chance of becoming an ecstatic person
							if(randval <= 0.50){
								return "";
							}
						}
						if(countAmbitious != 0){ // 25% chance of becoming an ambitious person
							if(randval >= 0.75){
								return "🕴";
							}
						}
						else{ // 15% chance of becoming an ambitious person 🕴, 5% chance of becoming an ecstatic person 🕺
							if(randval >= 0.85){
								return "🕴";
							}
							if(randval <= 0.05){
								return "🕺";
							}
							else{
								return ""; // do nothing
							}
						}
					}

					if(value == "🕺"){ // check for ecstatic person
						if(countEcstatic != 0){ // 15% become empty squares □, 5% become ambitious people 🕴
							if(randval >= 0.95){
								return "🕴";
							}
							if(randval <= 0.15){
								return "";
							}
							else{
								return "🕺"; // do nothing
							}
						}
						else{
							if(randval >= 0.9){ // 10% become ambitious people 🕴, 55% become empty squares □
								return "🕴";
							}
							if(randval <= 0.55){
								return "";
							}
							else{
								return "🕺"; // do nothing
							}
						}
					}

					return "";
				}

				case "chasingMoneyAndCommunity": {
					let randval = Math.random(); // get random value from 0 to 1.
					if(value == "🕴"){ // check for ambitious person
						if(aroundMoney != 0){ // 25% become ecstatic people 🕺, 30% become empty squares □
							if(randval <= 0.25){
								return "🕺";
							}
							if(randval >= 0.70){
								return "";
							}
							else{ // do nothing
								return "🕴";
							}
						}
						if(countAmbitious != 0){ // If you are next to an ambitious person 🕴, 15% become empty squares □, 25% become ecstatic people 🕺
							if(randval >= 0.75){
								return "🕺";
							}
							if(randval <= 0.15){
								return "";
							}
							else{
								return "🕴"; // do nothing
							}
						}
						else{
							// 30% become empty squares
							if(randval >= 0.70){
								return "";
							}
							else{ // do nothing
								return "🕴";
							}
						}
						}


					if(value == ""){ // check for empty square
						if(countEcstatic != 0){ // 50% chance of becoming an ecstatic person
							if(randval <= 0.50){
								return "";
							}
						}
						if(countAmbitious != 0){ // 25% chance of becoming an ambitious person
							if(randval >= 0.75){
								return "🕴";
							}
						}
						else{ // 15% chance of becoming an ambitious person 🕴, 5% chance of becoming an ecstatic person 🕺
							if(randval >= 0.85){
								return "🕴";
							}
							if(randval <= 0.05){
								return "🕺";
							}
							else{
								return ""; // do nothing
							}
						}
					}

					if(value == "🕺"){ // check for ecstatic person
						if(countEcstatic != 0){ // 15% become empty squares □, 5% become ambitious people 🕴
							if(randval >= 0.95){
								return "🕴";
							}
							if(randval <= 0.15){
								return "";
							}
							else{
								return "🕺"; // do nothing
							}
						}
						else{
							if(randval >= 0.9){ // 10% become ambitious people 🕴, 55% become empty squares □
								return "🕴";
							}
							if(randval <= 0.55){
								return "";
							}
							else{
								return "🕺"; // do nothing
							}
						}
					}

					if(value == "💰"){ // check for money object. do nothing.
						return "💰";
					}

					return "";
				}


				default: {
					if (x == 0 && y == 0)
						console.warn("unknown mode:", this.mode)
					// Just copy the current values
					return 0;
				}

			}
		})

		// Swap the new value buffer into the current value buffer
		this.emojiGrid.swap()
	}



	//==============
	// Draw a cell.  Add emoji or color it


	drawCell(p, x, y, cellX, cellY, cellW, cellH) {


		if (this.selectedCell && this.selectedCell[0] === x && this.selectedCell[1] === y) {
			p.strokeWeight(2)
			p.stroke("red")
		}
		else  {
			p.strokeWeight(1)
			p.stroke(0, 0, 0, .2)
		}

		let val = this.gameOfLifeGrid.get(x, y)

		p.fill(0, 0, (1 - val)*100, 1)
		p.rect(cellX, cellY, cellW, cellH)


		let em = this.emojiGrid.get(x, y)
		p.textSize(24);
		p.text(em, cellX, cellY + 0.8*cellH)

	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		this.selectedCell = [x, y]
	}

	click(x, y) {
		this.gameOfLifeGrid.set(x, y, 1)
	}



	//=====================================================
	// Utility functions


	getNeighborPositions(x1, y1, wrap) {
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + this.w)%this.w
			x2 = (x2 + this.w)%this.w
			y0 = (y0 + this.h)%this.h
			y2 = (y2 + this.h)%this.h
		}

		return [[x0,y0],[x1,y0],[x2,y0],[x2,y1],[x2,y2],[x1,y2],[x0,y2],[x0,y1]]
	}


}
