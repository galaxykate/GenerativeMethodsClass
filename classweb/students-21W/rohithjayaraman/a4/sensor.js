//sensor for the braitenberg vehicle
class EyeSensor {
    constructor(position){
      //position of the eye
      this.position = position
    }

    //fetch each channel's value at a given point from lightmap and convert it to range 0-1
    sense(){
      const sample = lightmap.sample(...this.position)
      return [sample[0]/255, sample[1]/255, sample[2]/255]
    }

    //draw the eye
    draw(p, channels){
      p.stroke('white')
      p.fill("white")
      p.circle(...this.position, 8)
      
      /*
        get value of required channels only i.e. blue for bludger, 
        red and green for seeker
      */
      const val = new Vector(...this.sense())
      const requiredVal = [val[0]*channels[0], val[1]*channels[1], val[2]*channels[2]]
      const mag = new Vector(...requiredVal).magnitude
      
      //if magnitude is non zero then draw in the channel colour(s) otherwise leave the eyes white
      if(mag>0){
        p.fill(requiredVal)
      }
      else{
        p.fill("white")
      }
      
      p.circle(...this.position, 7*(val[0]+val[1]+val[2]))
    }
}
