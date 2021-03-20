// Mask for female characters in traditional Chinese opera
class DaoMaDan {
	constructor() {
		// // make tassels (It works, but looks a little weird)
		// this.tasselParticles = new SpringGraph()
		// face.sideOrder.forEach(side => {
				
		// 	let root = side.faceRings[0][7]
		// 	for (var i = 0; i < 4; i++) {
		// 		let tassel = this.tasselParticles.addParticle()
		// 		this.tasselParticles.addEdge(tassel,root)
		// 	}	
		// })
	}

	draw(p, t) {
		// p.background("#4c956c")
		// p.background("#355621")
		p.background("#205c48")

		face.sideOrder.forEach((side, index) => {

			// draw the outline of the face
			p.noStroke()
			p.fill("#efd7d7")
			let outlinePoints = side.faceRings[0].concat(face.centerLine.slice().reverse())
			drawContour(p, outlinePoints)


			// draw the eye shadows
			// outer shadow
			let eyeShadowLight = side.eyeRings[2].slice(0,5).concat(side.eyeRings[1][6])
			eyeShadowLight = eyeShadowLight.concat(side.eyeRings[0].slice(7,10))
			eyeShadowLight = eyeShadowLight.concat(side.eyeRings[1][12])
			eyeShadowLight = eyeShadowLight.concat(side.eyeRings[0][14])
			eyeShadowLight = eyeShadowLight.concat(side.eyeRings[1].slice(15))
			p.fill("#e8b4b9")
			p.noStroke()
			drawContour(p, eyeShadowLight)
			
			// inner shadow
			let eyeShadow = side.eyeRings[2].slice(0,5).concat(side.eyeRings[1][6])
			eyeShadow = eyeShadow.concat(side.eyeRings[0][7])
			eyeShadow = eyeShadow.concat(side.eyeRings[2].slice(9,12))
			eyeShadow = eyeShadow.concat(side.eyeRings[1].slice(14))
			p.fill("#e98482")
			p.noStroke()
			drawContour(p, eyeShadow)


			// draw the eye ring
			p.fill("white")
			p.stroke(0)
			p.strokeWeight(2)
			drawContour(p, side.eyeRings[4])

			// draw the pupil
			p.fill(0)
			side.eye.draw(p, 4.5)

			// draw the eyeliner
			let upperEyeRing = side.eyeRings[4].slice(0,9)
			let upperEyelinerCorner = side.eyeRings[3][7]
			let upperEyelinerTurn = side.eyeRings[4][3]
			let upperEyeliner = [...upperEyeRing, upperEyelinerCorner, upperEyelinerTurn]
			p.stroke(0)
			p.strokeWeight(3)
			p.fill(0)
			drawContour(p, upperEyeliner)


			// draw the eye brow
			p.noFill()
			p.stroke(0)
			p.strokeWeight(3)
			let eyebrow = side.eyeRings[2].slice(2,5).concat(side.eyeRings[1][6])
			eyebrow = eyebrow.concat(side.eyeRings[0][7])
			drawContour(p, eyebrow)


			// draw the side hair
			let sideHairOuter = side.faceRings[0].slice(6, 13)
			let sideHairInner = side.faceRings[1].slice(6, 15)
			let sideHair = [...sideHairOuter, ...sideHairInner.reverse()]
			p.stroke(0)
			p.fill(0)
			drawContour(p, sideHair)


			// draw the red pom-poms
			let sphereAngleOffset = SLIDER.PompomsAngle * (Math.PI/12)

			// outer layer
			let sphereRoots2 = side.faceRings[0].slice(0, 8).filter((sphereRoot2, index) => {
				return index % 2 === 0
			})
			for (let sphereRoot2 of sphereRoots2) {
				let sphereAngle2 = face.noseTip.angleTo(sphereRoot2)
				let sphereStringLen2 = 60
				let sphereRadius2 = 20
				let spherePosX2 = sphereRoot2.coords[0] - sphereStringLen2*Math.cos(sphereAngle2+sphereAngleOffset*(0.5-index))
				let spherePosY2 = sphereRoot2.coords[1] - sphereStringLen2*Math.sin(sphereAngle2+sphereAngleOffset*(0.5-index))

				p.fill("#a1040b")
				p.stroke("#d88995")
				p.strokeWeight(1)
				p.circle(spherePosX2, spherePosY2, sphereRadius2)
				p.stroke("#a1040b")
				p.strokeWeight(2)
				p.line(...sphereRoot2.coords, spherePosX2, spherePosY2)
			}

			// inner layer
			let sphereRoots1 = side.faceRings[0].slice(0, 6).filter((sphereRoot1, index) => {
				return index % 2 === 1
			})
			for (let sphereRoot1 of sphereRoots1) {
				let sphereAngle1 = face.noseTip.angleTo(sphereRoot1)
				let sphereStringLen1 = 40
				let sphereRadius1 = 20
				let spherePosX1 = sphereRoot1.coords[0] - sphereStringLen1*Math.cos(sphereAngle1+sphereAngleOffset*(0.5-index))
				let spherePosY1 = sphereRoot1.coords[1] - sphereStringLen1*Math.sin(sphereAngle1+sphereAngleOffset*(0.5-index))

				p.fill("#a1040b")
				p.stroke("#d88995")
				p.strokeWeight(1)
				p.circle(spherePosX1, spherePosY1, sphereRadius1)
				p.stroke("#a1040b")
				p.strokeWeight(2)
				p.line(...sphereRoot1.coords, spherePosX1, spherePosY1)
			}
			

			// draw perls
			let perlStringLenOffset = SLIDER.PerlsLength * 8

			for (let i = 0; i < 7; i++) {
				let perlRoot = side.faceRings[0][i]
				let perlAngle = face.noseTip.angleTo(perlRoot)
				let perlStringLen = 30 + perlStringLenOffset
				let perlRadius = 5
				for (let j = 0; j < 2; j++) {
					let perlPosX = perlRoot.coords[0] - perlStringLen*Math.cos(perlAngle-Math.PI/12+j*(Math.PI/6))
					let perlPosY = perlRoot.coords[1] - perlStringLen*Math.sin(perlAngle-Math.PI/12+j*(Math.PI/6))

					p.fill("#e7e6e5")
					p.noStroke()
					p.circle(perlPosX, perlPosY, perlRadius)
					p.stroke("#e7e6e5")
					p.strokeWeight(1)
					p.line(...perlRoot.coords, perlPosX, perlPosY)
				}
			}

			// // Draw tassels (It works, but looks a little weird)
			// this.tasselParticles.edges.forEach((e, i) => {
			// 	p.strokeWeight(3)
			// 	p.stroke("#32afdb")
			// 	p.noFill()
			// 	let p0 = e.start.coords
			// 	let p1 = e.end.coords
			// 	let yDiff = p1[1] - p0[1]
			// 	let cp0 = [p0[0] + i*10-15, p0[1] + yDiff*(i*0.05+0.3)]
			// 	let cp1 = [p0[0] - i*10+15, p0[1] + yDiff*(-i*0.05+0.8)]
			// 	p.bezier(...p0, ...cp0, ...cp1, ...p1)
			// })


			// draw the hair curls on the forehead
			let hairCurls = side.faceRings[0].slice(0, 8).filter((hairCurl, index) => {
				return index % 2 === 0
			})
			hairCurls.forEach((hairCurl) => {
				p.fill(0)
				p.stroke(0)
				p.strokeWeight(2)
				p.circle(...hairCurl.coords, 25)
			})

			// draw the decorations on the hair curls
			let circleSize = SLIDER.CircleSize * 4
			hairCurls.forEach((hairCurl) => {
				p.fill("#32afdb")
				p.circle(...hairCurl.coords, 16+circleSize)
				p.fill("white")
				p.circle(...hairCurl.coords, 11+circleSize)
				p.fill("#a1040b")
				p.circle(...hairCurl.coords, 8+circleSize)
			})



		})

		// draw the mouth
		p.fill("#a10f0f")
		p.stroke("#8b0709")
		drawContour(p, face.mouth[2].concat(face.mouth[2][0]))
		p.fill(0)
		drawContour(p, face.mouth[4])

		// draw the nose in some way?
		

		//hands

		hand.forEach(eachHand => {
			for (let finger of eachHand.fingers) {
				p.stroke("#efd7d7")
				p.strokeWeight(8)
				p.noFill()
				drawContour(p, finger);

				// draw red nails
				let fingerTip = finger[3]
				let finger2 = finger[2]

				let nailLength = 20
				let nailAngle = finger2.angleTo(fingerTip)
				let nailTipX = fingerTip.coords[0]-nailLength*Math.cos(nailAngle)
				let nailTipY =  fingerTip.coords[1]-nailLength*Math.sin(nailAngle)

				p.stroke("#8b0709")
				p.strokeWeight(6)
				p.noFill()
				p.line(...fingerTip.coords, nailTipX, nailTipY)
			}
		})


		
	}

	update(t, dt, frameCount) {
		// this.tasselParticles.update(t,dt)
	}
}
masks.daoMaDan = DaoMaDan