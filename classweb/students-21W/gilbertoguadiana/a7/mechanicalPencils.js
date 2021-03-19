// Class for defining mechanical pencils based on chosen parameters

class MechanicalPencil {
	// Create a parametrized mechanical pencil probability space.
	constructor(aof) {

		this.aof = aof
		this.center = new Vector()
		this.bodyColor = 0
		this.bodyWidth = 0
		this.pocketClipLength = 0
		this.gripLength = 0
		this.eraserLength = 0
		this.rotation = 0
		this.paused = false

	}


	update(t, dt) {
		// Update this with the current value of the AOF and any other parameters, like time
		this.bodyColor = this.aof.get("bodyColor")
		this.bodyWidth = this.aof.get("bodyWidth")
		this.pocketClipLength = this.aof.get("pocketClipLength")
		this.gripLength = this.aof.get("gripLength")
		this.eraserLength = this.aof.get("eraserLength")
		this.rotation = Math.sin(t)

	}

	pause(){
		this.paused = !this.paused;
	}

	draw(p) {
		let scale = 1;

		let bodyWidth = (this.bodyWidth * 30 + 20)*scale;
		// bodyWidth = 50
		let bodyColor = this.bodyColor*360;
		let bodyLength = 165*scale;

		let gripLength = (this.gripLength*50)*scale;
		let pocketClipLength = (this.pocketClipLength*80+40)*scale
		let eraserLength = (this.eraserLength*30)*scale

		p.push()
		if(!this.paused){p.rotate(this.rotation);}
		p.translate(-150,-50)
		p.noStroke();
		// pencil
		p.fill(bodyColor, 100, 70);

		// pencil point
		p.triangle(0,0,50,bodyWidth/2,50,-bodyWidth/2);
		p.translate(50,-bodyWidth/2)

		// body of pencil
		p.rect(0,0, bodyLength, bodyWidth);
		p.fill(60);
		// pencil grip
		p.rect(25,0, gripLength, bodyWidth);
		p.translate(bodyLength,0);

		p.fill(10);
		p.push();
		// clicking pusher
		p.translate(0,bodyWidth*0.1)
		p.rect(0,0,bodyWidth*0.3,bodyWidth*0.8);
		p.pop();

		p.translate(bodyWidth*0.3,0);

		p.push();
		p.translate(0,bodyWidth);
		p.fill(10);
		p.rect(0,0, 30, 10);
		p.translate(30,5);
		// pocketclip
		p.rect(0,0, -pocketClipLength, 10);
		p.pop();

		p.rect(0,0, 30, bodyWidth);
		p.translate(30,0)
		p.fill(80)
		// eraser
		p.rect(0,0, eraserLength, bodyWidth,20);
		p.rect(0,0, eraserLength*0.5, bodyWidth);
		p.pop()
	}
}


// Static properties for this class
MechanicalPencil.landmarks = {
	"Crayon": [0, 1, 0.63, 0, 0],
	"Basic": [0.79, 0.14, 0.51, 1, 0.55],
	"Broken": [0.58,0.29,0.00,0.00,0.21],
	"Worn Out": [0.93,0.96,0.02,0.58,0.31],
	"Artsy": [0.09,0.33,0.10,0.17,1.00]
}
MechanicalPencil.labels = ["bodyColor", "bodyWidth", "pocketClipLength", "gripLength", "eraserLength"]
