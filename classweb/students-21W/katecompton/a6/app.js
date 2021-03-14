	
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
			

			<simulation mode="broken"/>

			<p>
			I started off trying to come up with the right numbers off the top of my head:
			<b>Live</b> with 2 or 3 neighbors, or <b>die</b> with anything else?  Sounds reasonable, right?
			It made for cool patterns that flowed continuously, but didn't feel right	
			</p>
			
			<simulation mode="correct"/>
			
			<p>This is the correct simulation. Cells die if they have <2 or >3 neighbors, but only come back to life if they have 3.  Its less interesting than I remembered, though.  Everything gets stable very quickly.  I guess "gliders" are the only interesting things about the traditional version?</p>

			<simulation mode="emoji"/>
			
			<p>Next I tried making a version with emoji, where the emoji would always be fixed at "live" to see if they would seed more interesting behavior.  I guess they do, a bit?</p>

			<simulation mode="continuous"/>
			
			<p>Finally, I made a continuous version, where values aren't clamped to 1 or 0.  You can also change the background radiation that spawns new life, or the life threshold that decides the chance that anything will live or die.</p>


		</div>`,
		
	}) 
})