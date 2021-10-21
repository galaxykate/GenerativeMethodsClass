const scale = 5
//lightmap - acts as source for seeker and bludger which are braitenberg vehicles
class Lightmap {
  
  constructor({drawMap, element}){
    this.map = new p5(
      function(p){
        p.setup = () => {
					p.createCanvas(width/scale, height/scale);
        }

        p.draw = () => {
          p.background("black")
          p.push()	
					
          p.scale(1/scale)
					//call draw function
          drawMap.call(this)
					
          p.pop()

        }
      }, element)      
  }

  //write to channel i.e. draw a particular color to lightmap
  drawScope(color, point){
    this.map.noStroke()

    const count = 10
		for (var i = 0; i < count; i++) {
			const pct = i/count
			const r = (8 + i*20)

			this.map.fill([...color, 1*255*(1 - .9*Math.pow(pct, .03))])
			this.map.circle(...point, r)
		}
  }

  //fetch channel values at a particular point in the lightmap
  sample(x, y) {
		const c = this.map.get(x/scale, y/scale)
		return c
	}
}