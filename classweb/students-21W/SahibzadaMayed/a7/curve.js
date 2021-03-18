class Curve {
	// A curve made out of points and control points


}


class CurveControl extends Vector {
	constructor(pt, r, theta) {
		super(0,0)
		this.pt = pt
		this.r = r 
		this.theta = theta
		this.setToPolarOffset(pt, r, theta)
	}

	set(r, theta) {
		this.r = r
		this.theta = theta
		this.setToPolarOffset(this.pt, r, theta)
	}

	draw(p) {
		p.noStroke()
		p.fill(320, 100, 60)
		super.draw(p)

		p.stroke(0)
		p.line(...this.pt.coords, ...this.coords)
	} 
}