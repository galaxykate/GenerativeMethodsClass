let myP5 = undefined
let mode = "thread"
let mousePositions = []

function clearCanvas() {
	myP5.background("black")
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("Drawing!")

	let element = document.getElementById("main")
	myP5 = new p5(
		function(p) {

			p.setup = () => {

				console.log("Do setup", p)
				p.createCanvas(300, 300);
				p.colorMode(p.HSL);
				p.background("black")
			}

			p.mouseDragged = () => {
				let t = p.millis()*.001
				mousePositions.push([p.mouseX, p.mouseY])

				switch(mode) {
					
					case "thread":
						
						// The current vector
						let p0 = [p.mouseX, p.mouseY]

						let hairCycle = t*1
							
						for (var i = 0; i < 10; i++) {
							let hairLength = 10 + 30*Math.random()
							let cp0 = vector.getAddPolar(p0, hairLength, 20*p.noise(hairCycle))
							let cp1 = vector.getAddPolar(cp0, hairLength, 20*p.noise(hairCycle + 10))
							let p1 = vector.getAddPolar(cp1, hairLength, 20*p.noise(hairCycle + 20))
						

							 p.noStroke()
							
							 p.fill(50+Math.random()*150, 50+Math.random()*150, 30+Math.random()*150)
							 p.circle(...cp0, 1.5)
							 p.circle(...cp1, 1.5)
							 p.circle(...p0, 1.5)
							 p.circle(...p1, 1.5)

							p.noFill()
							p.strokeWeight(Math.random()*0.15)
							p.stroke((t*30)%360, 100, 20+Math.random()*40, Math.random()*.4 + .3)
							p.bezier(...p1, ...cp1, ...cp0, ...p0)
						}
						break;

				
					default: 
						console.warn("UNKNOWN TOOL:" + mode)
				}
				
			}

			p.draw = () => {
				let t = p.millis()*.001		
					
			}
		}, 

		// A place to put the canvas
		element);
})
