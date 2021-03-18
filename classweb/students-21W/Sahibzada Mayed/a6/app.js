let paused = false
document.addEventListener('keyup', function(e){
	if(e.keyCode == 32){
		paused = !paused
	}
	if(e.keyCode == 78){
		sim.step()
	}
});  




let noise = new p5().noise
console.log(noise)
let sim = new Simulation()

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			<simulation mode="broken"/>
			<p>
			This simulation is meant to resemble the motion of particles in a liquid. The particles are spaced apart, but not too much. Particles are moving according to some set of rules (hydrogen bonds between water molecules hold them together). Due to the attractive nature of hydrogen bonding and surface cohesion, some water molecules are seen to form small clusters. You should observe that the motion of particles is somewhat haphazard but still not completely "random" as you'd have in a gas instead.
			</p>
			
			<simulation mode="correct"/>
			<p>
			This simulation is meant to show how the motion of particles in a liquid changes when the intermolecular forces and strength of hydrogen bonding between molecules increases. The particles are observed to form larger clusters and attract each other more frequently. The motion should still be somewhat haphazard but not completely random.
			</p>
			
			<simulation mode="continuous"/>
			<p>
			Didn't you just love chemistry in high school or college (or in your dreams if you never took it)? Well, this last simulation is meant to represent how a liquid can be converted to solid state by changing the force and strength of intermolecular bonds between molecules. So, you can adjust the "bonding strength" on a scale of 1-10 to view how motion slows down, particles clump togehter and eventually fill up the entire lattice.
			</p>
		</div>`,
		
	}) 
})
