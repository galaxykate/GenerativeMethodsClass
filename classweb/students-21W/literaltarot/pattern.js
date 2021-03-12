
function randomPath(offset) {
	let w = cardSize
	let h = cardSize*cardAspect
	let count = Math.sin(offset*.3)*6 + 10
	let speed = Math.sin(offset)*3 + 5
	let path = `M ${w} ${-h/2}`


	for (var i = 0; i < count; i++) {
		let pct = i/(count - 1)
		let r = (w*1.3)*(noise.noise2D(pct*.8, .8*offset + 100))
		let theta = 18*noise.noise2D(pct*.10, .8*offset + 200)

		let y = pct*h - h*.5 
		let x = w*(.3 + .3*Math.sin(2*speed*pct))

		
		let y2 = y + r*Math.sin(theta)
		let x2 = x + r*Math.cos(theta)
		
		path += ` S ${x.toFixed(2)}  ${y.toFixed(2)}  ${x2.toFixed(2)}  ${y2.toFixed(2)}`
	}


	let hue = 360*noise.noise2D(offset*2, 10)
	let sat = noise.noise2D(10*offset, 40) + .2
	return `<path d="${path}" stroke="hsla(${hue},${sat*100}%,50%,${.5 + .2*Math.sin(offset*150)}" fill="none" />`
}

function randomSVG() {	
	let group = ""
	let offset = Math.random()*100
	for (var i = 0; i < 14; i++) {
		group += randomPath(i*.004 + offset)
	} 
	group = `<g>${group}</g> <g transform="scale(-1,1)">${group}</g>`

	let angle = 0
	if (Math.random() > .7)
		angle += 90

	if (Math.random() > .7)
		angle += Math.random()*90
	// console.log(angle)
	return `<svg height="${cardSize*cardAspect}" width="${cardSize}" ><g transform="translate(${cardSize/2}, ${cardSize*cardAspect/2})  rotate(${angle})">${group}</g></svg>`
}

