
let emoji = "👟 👜".split(" ")

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
		this.w = 50
		this.h = 25


		this.isWrapped = true
		this.isPaused = true
		this.selectedCell = undefined

		// Big assumptions about people's behavior/wealth distribution
		this.influencedNoiseScale = 0.3
		this.budgetNoiseScale = 0.8
		this.purchaseNoiseScale = 0.8

		this.fashionSpreadGrid = new Grid(this.w, this.h, this.isWrapped)

		// default values for sliders
		this.price1 = 0.5
		this.price2 = 0.5
		this.quality = 0

		this.randomize()

	}

	randomize() {
		console.log("set to a random layout")
		this.noiseSeed += 10

		// Assumption: when the value on the noise map >= 0.7, the person "purchases" the item.
		this.fashionSpreadGrid.setAllPurchase((x,y) => {
			let purchased = noise(x*this.purchaseNoiseScale, y*this.purchaseNoiseScale + 100*this.noiseSeed)
			if (purchased >= 0.7) return 1
			else return 0
		})
		
		// generate a continuous noise map for the "tendency of being influenced" for each "person"
		this.fashionSpreadGrid.setAllInfluenced((x,y) => noise(x*this.influencedNoiseScale, y*this.influencedNoiseScale + 100*this.noiseSeed)**2)

		// generate a continuous noise map for the "budget" for each "person"
		// Assumption: when the value on the noise map >= 0.7 and the budget is higher than price (0.5 initially)
		// the person "purchases" the item.
		if ((this.mode === "with fixed budget") || (this.mode === "with advocacy/criticism")) {
			this.fashionSpreadGrid.setAllBudget((x,y) => noise(x*this.budgetNoiseScale, y*this.budgetNoiseScale + 100*this.noiseSeed))
			this.fashionSpreadGrid.setAllPurchase((x,y) => {
				let budget = this.fashionSpreadGrid.get(x,y)[1]
				let purchased = noise(x*this.purchaseNoiseScale, y*this.purchaseNoiseScale + 100*this.noiseSeed)
				if ((purchased >= 0.7) && budget >= 0.5) return 1
				else return 0
			})
		}
	}

	step() {
		this.stepCount++

		// Make one step
		// Set all the next steps, then swap the buffers
		
		this.fashionSpreadGrid.setNextPurchase((x, y, currentValue) => {
			let neighbors = this.getNeighborPositions(x, y, true)
			let totalCount = 0
			neighbors.forEach(neighbor => {
				let count = this.fashionSpreadGrid.get(...neighbor)[2];
				totalCount += count
			})

			// Assumption: we cannot sell the item once it's purchased
			if (currentValue === 1) return 1
			
			else if (currentValue === 0) {
				switch (this.mode) {
					
					// preliminary case assumption: a person is more likely to purchase an item 
					// if one or two friends purchased it
					// but if three or more friends have it, then the person would not purchase the item
					case "preliminary": {
						if (totalCount === 1) {
							if (Math.random() > 0.8) return 1
							else return 0
						}
						else if (totalCount === 2) {
							if (Math.random() > 0.6) return 1
							else return 0
						}
						else if (totalCount >= 3) return 0
						else return 0
					}

					// Assumption: everybody has a fixed "tendency of being influenced by friends"
					case "with fixed tendency": {
						let tendencyInfluenced = this.fashionSpreadGrid.get(x, y)[0];
						
						if (totalCount === 1) {
							if (tendencyInfluenced > 0.6) return 1
							else return 0
						}
						else if (totalCount === 2) {
							if (tendencyInfluenced*2 > 0.6) return 1
							else return 0
						}
						else if (totalCount >= 3) return 0
						else return 0
					}

					// Assumption: in addition, everybody has a fixed budget.
					// They would only buy an item if the price is lower than their budget.
					case "with fixed budget": {
						let tendencyInfluenced = this.fashionSpreadGrid.get(x, y)[0];
						let budget = this.fashionSpreadGrid.get(x, y)[1];
						let price1 = parseFloat(this.price1)
						//let price1 = document.getElementById('price1').value
						
						if (budget >= price1) {
							if (totalCount === 1) {
								if (tendencyInfluenced > 0.6) return 1
								else return 0
							}
							else if (totalCount === 2) {
								if (tendencyInfluenced*2 > 0.6) return 1
								else return 0
							}
							else if (totalCount >= 3) return 0
							else return 0
						}
						else return 0
					}

					// Assumption: in addition, an item with better quallity makes the owner advocate for it
					// and vice versa
					case "with advocacy/criticism": {
						let tendencyInfluenced = this.fashionSpreadGrid.get(x, y)[0];
						let budget = this.fashionSpreadGrid.get(x, y)[1];
						// let price2 = document.getElementById('price2').value
						// let quality = document.getElementById('quality').value
						let price2 = parseFloat(this.price2)
						let quality = parseFloat(this.quality)
						
						if (budget >= price2) {
							if (totalCount === 1) {
								if (tendencyInfluenced + quality > 0.6) return 1
								else return 0
							}
							else if (totalCount === 2) {
								if ((tendencyInfluenced + quality)*2 > 0.6) return 1
								else return 0
							}
							else if (totalCount >= 3) return 0
							else return 0
						}
						else return 0
					}

					default: {
						if (x == 0 && y == 0)
							console.warn("unknown mode:", this.mode)
						// Just copy the current values
						return currentValue
					}
				}
			}
		})	

		// Show the whole grid for debugging
		// this.fashionSpreadGrid.debugPrintGrid()
	
		// Swap the new value buffer into the current value buffer
		this.fashionSpreadGrid.swap()
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

		let tendencyInfluencedVal = this.fashionSpreadGrid.get(x, y)[0]
		let budgetVal = this.fashionSpreadGrid.get(x, y)[1]
		let purchaseVal = this.fashionSpreadGrid.get(x, y)[2]
		
		// let priceVal1 = document.getElementById('price1').value
		// let priceVal2 = document.getElementById('price2').value
		// let qualityVal = document.getElementById('quality').value
		let priceVal1 = parseFloat(this.price1)
		let priceVal2 = parseFloat(this.price2)
		let qualityVal = parseFloat(this.quality)

		if (this.mode === "preliminary") {
			p.fill(0, 0, 100, 1)
		}

		if (this.mode ==="with fixed tendency") {
			p.fill(0, 0, (1 - tendencyInfluencedVal)*100, 1)
		}
			
		if (this.mode === "with fixed budget") {
			
			// people who can afford the item are shown blue
			if (budgetVal >= priceVal1) {
				p.fill(240, 80, (1 - tendencyInfluencedVal)*100, 1)
			}
			// people who cannot afford the item are shown red
			else {
				p.fill(0, 80, (1 - tendencyInfluencedVal)*100, 1)
			}
		}
		
		if (this.mode === "with advocacy/criticism") {
			
			let finalInfluenceVal = Math.max(0, Math.min(1, (tendencyInfluencedVal + qualityVal)))
			if (budgetVal >= priceVal2) {
				p.fill(240, 80, (1 - finalInfluenceVal)*100, 1)
			}
			else {
				p.fill(0, 80, (1 - finalInfluenceVal)*100, 1)
			}
		}
		
		p.rect(cellX, cellY, cellW, cellH)
		
		// show the emoji if the person purchased the item
		if (purchaseVal === 1) p.text(emoji[1], cellX, cellY + cellH)

	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		this.selectedCell = [x, y]
	}

	click(x, y) {
		this.fashionSpreadGrid.setPurchase(x, y, 1)
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