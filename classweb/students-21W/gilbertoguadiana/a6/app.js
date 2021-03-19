
let paused = false
document.addEventListener('keyup', function(e){
	if(e.keyCode == 32){
		paused = !paused
	}
	if(e.keyCode == 78){
		sim.step()
	}
});


// let simplex = new SimplexNoise()
// function noise() {
// 	if (arguments.length === 1)
// 		return simplex.noise2D(arguments[0])
// 	if (arguments.length === 2)
// 		return simplex.noise2D(arguments[0], arguments[1])
// 	if (arguments.length === 3)
// 		return simplex.noise3D(arguments[0], arguments[1], arguments[2])

// }


let noise = new p5().noise
console.log(noise)
let sim = new Simulation()

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			<p>
				The goal of this webpage is to showcase a thought experiment on chasing money or community as long-term sustainable strategies through the use of simulations. In this simple model of the world, there are ambitious people, ecstatic people, and money objects.
			</p>

			<h2>
				Chasing Money Simulation
			</h2>

			<simulation mode="chasingMoney"/>

			<p>
				This simulation models people chasing money. In this simulation, ambitious people are in search of money objects. If ambitious people arrive at money objects, they become ecstatic. Once ecstatic, some revert to being ambitious again. Others lose all interest and disappear off the grid or simply move around. In this simulation, we see that people that become ecstatic due to money experience the emotion briefly. It quickly goes away after a quick moment.
			</p>

			<h2>
				Chasing Community Simulation
			</h2>

			<simulation mode="chasingCommunity"/>

			<p>
				This simulation models people chasing community. In this simulation, ambitious people are in search of community. If ambitious people find each other, they are more likely stick around or become ecstatic. If ecstatic people find each other, they are more likely to remain ecstatic. In this model, we see that the ecstatic individuals remain ecstatic in the long-term. This suggests that becoming fulfilled due to social communities is a viable long-term strategy.
			</p>

			<h2>
				Chasing Money and Community Simulation
			</h2>

			<simulation mode="chasingMoneyAndCommunity"/>

			<p>
				This simulation models chasing money and community. In this simulation, the ambitious people are in search of community and money. The rules of this simulation are a combination of the previous two. We see that individuals that remain ecstatic are more likely to occur away from money objects although stable social communities do sometimes emerge around money objects. In this case, we can consider chasing money to be either an obstacle to long-term sustainable fulfillment or simply be neutral.
			</p>


		</div>`,

	})
})
