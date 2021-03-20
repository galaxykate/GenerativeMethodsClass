let paused = false

let noise = new p5().noise
// console.log(noise)

let sim = new Simulation()

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
        el : "#app",
        template: `<div id="app">
		
		<p>This project is trying to describe a simplified framework of how our shopping decisions are
		influenced by people around us (before the Internet era?), based on my naive understanding of 
		marketing.</p>
		<p>Many assumptions are made.</p>
		<p></p>
		
		<simulation mode="preliminary"/>
		<p>In this preliminary experiment, for each step, a person has 20% probability of purchasing the
		item if one friend has it. If two friends own the item, that probability is increased to 40%.
		However, it's FASHION world: if three or more friends have the item, the person would not buy
		it.</p>
		<p>However, this model is far from being reasonable even on an oversimplified basis. Because
		this kind of "step" is repeated many times, the item always ends up having a huge market share.</p>
		<p></p>
		<p></p>

        <simulation mode="with fixed tendency"/>
		<p>In this model, I assume that every person has a fixed "tendency of being influenced by their
		friends". The value is set continuously using a noise map and visualized in grayscale on the grid. 
		The darker the cell, the more likely the person will be influenced by their friends on fashion 
		shopping.</p>
		<p>Currently, if (tendency * the number of friends owning the item) >= 0.6, the person will purchase
		the item. Again, if three or more friends own the item, the person would not buy it. We can see how
		people that are more easily influenced will more likely purchase an item following their friends.</p>
		<p></p>
		<p></p>

        <simulation mode="with fixed budget"/>
		<p>In this simulation, I added another factor: budget vs price. I assume that every person has a fixed 
		budget and would only buy an item if the price does not exceed the budget. Blue cells are people who
		can afford the item and red cells represent those who cannot. The grayscale/darkness still represents 
		the tendency of being influenced. The price can be adjusted using the slider.</p>
		<p></p>
		<p></p>

		<simulation mode="with advocacy/criticism"/>
		<p>One thing I learned from a marketing professor: the best marketing strategy is to let the customers 
		advocate for you. For an item of high quality, customers would advocate for it to their friends, increasing
		the probability of purchasing. In this grid, the grayscale/darkness reflects both the tendency of being
		influenced and how much friends' advocacy adds to it/criticism subtracts from it. Adjust the slider to see
		how improving the quality helps with the market share.</p>
        </div>`
		
	}) 
})