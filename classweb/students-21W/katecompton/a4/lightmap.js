function RGBToHSL(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h*360, s*100, l*100 ];
}


let lightmapScale = 4

class Lightmap {


	constructor({drawChannels, fadeSpeed=10}) {
		console.log("Create a new lightmap")
		this.map = new p5(
			function(p) {
				



				p.setup = () => {
					console.log("create lightmap")
					// Basic setup tasks
					p.createCanvas(simulationWidth/lightmapScale, simulationHeight/lightmapScale);
					p.colorMode(p.RGBA, 255);
					p.background(0, 0, 0)

					
					// console.log(lightSpots)
				}

				// Draw all the boids light
				p.draw = () => {
					
					if (fadeSpeed !== 0)
						p.background(0, 0, 0, 100/fadeSpeed)

					p.push()	
					p.scale(1/lightmapScale)
					
					// Call a function to draw into the channels
					drawChannels.call(this)
					p.pop()

					p.filter(p.BLUR,2)


					// Load the pixels so that the bugs can sample them
					p.loadPixels()
					
				}

			}, document.getElementById("lightmap"))

	}

	debugDraw(p) {
		let tileSize = 10
		let tileW = p.width/tileSize
		let tileH = p.height/tileSize

		for (var i = 0; i < tileW; i++) {
			for (var j = 0; j < tileH; j++) {
				let x = i*tileSize
				let y = j*tileSize
				
				let c = lightmap.sampleHSL(x, y)
				p.noStroke()
				p.fill(...c, .2)
				
				p.rect(x - tileSize/2, y - tileSize/2, tileSize, tileSize)
			}
		}


	}

	drawBlurryLight({pt, channels, intensity=1, size=1}) {
		this.map.noStroke()


		let count = 10
		for (var i = 0; i < count; i++) {
			let pct = i/count
			let r = (2 + i**2.2)*size

			// Fill may need adjusting depending on 
			// how often/solidly we're erasing the buffer
			this.map.fill(...channels, intensity*100*(1 - .9*Math.pow(pct, .03)))
			this.map.circle(...pt, r)
		}
	}

	sample(x, y) {

		let c = this.map.get(x/lightmapScale, y/lightmapScale)
		return c

	}

	sampleHSL(x, y) {

		let c = this.map.get(x/lightmapScale, y/lightmapScale)
		let hsl = RGBToHSL(...c)
		return hsl

	}
}