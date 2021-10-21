// Handsfree code
// Do various kinds of tracking

const faceIndexes = {
	fingers:  [[1, 2, 3, 4], [5, 6, 7, 8],[9,10,11,12],[13, 14, 15, 16], [17, 18 , 19, 20]],
	centerLine: [10, 151, 9, 8, 168, 6, 197, 195, 5, 4, 1, 19, 94, 2, 164, 0, 11, 12, 13, 14, 15, 16, 17, 18, 200, 199, 175, 152],
	mouth: [
		[287, 436, 426, 327, 326,   2,  97,  98, 206, 216,  57,  43, 106, 182,  83,  18, 313, 406, 335, 273],
		[291, 410, 322, 391, 393, 164, 167, 165,  92, 186,  61, 146,  91, 181,  84,  17, 314, 405, 321, 375],
		[306, 409, 270, 269, 267,   0,  37,  39,  40, 185,  76,  77,  90, 180,  85,  16, 315, 404, 320, 307],
		[292, 408, 304, 303, 302,  11,  72,  73,  74, 184,  62,  96,  89, 179,  86,  15, 316, 403, 319, 325],
		[308, 407, 310, 311, 312,  13,  82,  81,  80, 183,  78,  95,  88, 178,  87,  14, 317, 402, 318, 324],
	],
		
	sides:[

	// RIGHT
	{
		faceRings: [
			[ 10, 109,  67, 103,  54,  21, 162, 127, 234,  93, 132,  58, 172, 136, 150, 149, 176, 148, 152],
			[151, 108,  69, 104,  68,  71, 139,  34, 227, 137, 177, 215, 138, 135, 169, 170, 140, 171, 175],
			[  9, 107,  66,  105,  63,  70, 156, 143, 116, 123, 147, 213, 192, 214, 210, 211,  32, 208, 199]
		],
		eyeRings: [
			[122, 168, 107,  66, 105,  63,  70, 156, 143, 116, 123,  50, 101, 100,  47, 114, 188],
			[245, 193,  55,  65,  52,  53,  46, 124,  35, 111, 117, 118, 119, 120, 121, 128],
			[244, 189, 221, 222, 223, 224, 225, 113, 226,  31, 228, 229, 230, 231, 232, 233],
			[243, 190,  56,  28,  27,  29,  30, 247, 130,  25, 110,  24,  23,  22,  26, 112],
			[133, 173, 157, 158, 159, 160, 161, 246,  33,   7, 163, 144, 145, 153, 154, 155],
		],

	}, 
	// LEFT
	{
		faceRings: [
			[ 10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152],
			[151, 337, 299, 333, 298, 301, 368, 264, 447, 366, 401, 435, 367, 364, 394, 395, 369, 396, 175], 
			[  9, 336, 296, 334, 293, 300, 383, 372, 345, 352, 376, 433, 416, 434, 430, 431, 262, 428, 199]],
		eyeRings: [
			[351, 168, 336, 296, 334, 293, 300, 383, 372, 345, 352, 280, 330, 329, 277, 343, 412],
			[465, 417, 285, 295, 282, 283, 276, 353, 265, 340, 346, 347, 348, 349, 350, 357],
			[464, 413, 441, 442, 443, 444, 445, 342, 446, 261, 448, 449, 450, 451, 452, 453],
			[463, 414, 286, 258, 257, 259, 260, 467, 359, 255, 339, 254, 253, 252, 256, 341], 
			[362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382],
		]
	}]

	// [10 109 87 103]
}

//--------------------
// Build the face
const face = {
	points: [],
	sides: [],
	scale: 1,
	size: 100,
	center: new Vector(0,0),
	direction: new Vector(0,0)
}

const hand = []

// Create all the vertices
const faceCount = 468
for (var i = 0; i < faceCount; i++) {
	let v = new Vector(0, 0)
	v.visible = true
	v.index = i
	face.points[i] = v
}

// Make eye contours
for (var i = 0; i < 2; i++) {

	// Make hands
	hand[i] = {
		index: (2*(i - .5)),
		pinch: 0,
		pointDir: [new Vector(),new Vector(), new Vector(), new Vector(), new Vector()],
		handDir: new Vector(),
		points: [],
		fingers: [],
	}

	
	for (var j = 0; j < 22; j++) {
		let v = new Vector(0, 0)
		v.visible = true
		v.index = j
		hand[i].points[j] = v
	}

	hand[i].wrist = hand[i].points[0]
	hand[i].center = hand[i].points[21]
	hand[i].fingers = faceIndexes.fingers.map(finger => finger.map(index =>  hand[i].points[index]))


	// Make face sides
	face.sides[i] = {
		blink: .3,
		index: (2*(i - .5)),
		eye: new Vector(Math.random(), Math.random()),
		eyeRings: faceIndexes.sides[i].eyeRings.map(ring => ring.map(index => {
			return face.points[index]
		})),
		faceRings: faceIndexes.sides[i].faceRings.map(ring => ring.map(index => {
			return face.points[index]
		})),
		noseToEar: new Vector(),
		ear: faceIndexes.sides[i].faceRings[0].slice(7, 10).map(index => face.points[index])
		
	}
	
}

face.sideOrder = [face.sides[0], face.sides[1]]

// Create mouth lines
face.mouth = faceIndexes.mouth.map(mouthLine => mouthLine.map(index => face.points[index]))
face.centerLine = faceIndexes.centerLine.map(index => face.points[index])
face.noseTip = face.points[4]
face.chin = face.points[152]
face.forehead = face.points[10]

//--------------------------------
// Updating

// Do meta calculations
function calculateMetaTrackingData() {
	for (var i = 0; i < 2; i++) {
		let side = face.sides[i]
		side.eye.setToAverage(side.eyeRings[4])

		side.noseToEar.setToDifference(side.ear[2], face.noseTip)
		side.blink = 10*Vector.getDistance(side.eyeRings[4][4],side.eyeRings[4][8])/face.size


		// Hand calculations
		let h = hand[i]
		h.handDir.setToDifference(h.center,h.wrist)
		for (var j = 0; j < 5; j++) {
			h.pointDir[j].setToDifference(h.fingers[j][3],h.fingers[j][1])
		}
	
		
	}
	
	face.center.setToAverage([face.sides[0].eye, face.sides[1].eye])
	face.direction.setToAddMultiples(face.sides[0].noseToEar, 1, face.sides[1].noseToEar, 1)
	// console.log(face.center)
	if (face.direction.coords[0] < 0) {

		face.sideOrder = [face.sides[0], face.sides[1]]
	} else {
		face.sideOrder = [face.sides[1], face.sides[0]]
	}
	face.width = Vector.getDistance(face.sides[0].ear[2], face.sides[1].ear[2])
	face.length = Vector.getDistance(face.chin, face.forehead)
	face.size = Math.max(face.width*1.5, face.length)
	face.scale = face.size/250
	
} 

function initTestData() {
	let frame = 30
	setInterval(() => {
		if (!app.paused) {
			frame++
			// console.log(frame)
			let faceData = testFaceData[frame%testFaceData.length]
			face.points.forEach((pt,i) => pt.copy(faceData[i]))
			
			let handData = testHandData[frame%testHandData.length]
			hand.forEach((h,index) => {
				h.points.forEach((pt,i) => pt.copy(handData[index][i]))
			})

			calculateMetaTrackingData()
		}
	}, 50) 
	
}

function initHandsFree() {
	console.log("Init handsfree")
	let updateCount = 0
	// From the handsfree demos (mostly)
	handsfree = new Handsfree({
		showDebug: true,
		hands: true
	})

	handsfree.update({facemesh: true})

	// Let's create a plugin called "logger" to console.log the data
	handsfree.use('logger', (data) => {
		updateCount++
		// I like to always bail if there's no data,
		// which might happen if you swap out hands for the face later on
		if (!data.hands) return

		// Log the data  
		// Vue.set(app.tracking, "hands", data.hands.multiHandLandmarks)
		if (updateCount % 30 == 0) {
			console.log(data.hands.multiHandLandmarks)
		}

		console.log("track #", updateCount)

		
		// Only set position if visible
		// Also smooth with the previous point
		// pt.setToLerp((meshPt.x,meshPt.y), pt, app.smooth)
		function setPoint(pt, meshPt) {
		
			
			let x = (.5 - meshPt.x)*canvasW
			let y = (meshPt.y - .5)*canvasH
			pt.setTo(x, y)
			if (pt.index ===47)
				console.log(pt.toFixed())
			pt.visible = meshPt.visible
		}

		// Set the points to the current mesh
		if (data.facemesh &&  data.facemesh.multiFaceLandmarks &&  data.facemesh.multiFaceLandmarks.length > 0) {
			let faceMesh = data.facemesh.multiFaceLandmarks[0]
			console.log("update face")
			// Copy over all of the face data
			for (var i = 0; i < faceMesh.length; i++) {
				setPoint(face.points[i], faceMesh[i])
			}
		}

		hand[0].visible = false
		hand[1].visible = false
		if (data.hands.multiHandLandmarks && data.hands.multiHandLandmarks.length > 0) {
			console.log("-- hands -- ")
			for (var i = 0; i < hand[0].points.length; i++) {

				setPoint(hand[0].points[i], data.hands.multiHandLandmarks[0][i])
				hand[0].visible = true
				if (data.hands.multiHandLandmarks[1]) {
					hand[1].visible = true
					setPoint(hand[1].points[i], data.hands.multiHandLandmarks[1][i])
				}
				
			}
		} else {
			console.log("-- no hands -- ")
		}
		calculateMetaTrackingData()



		// console.log( app.tracking.face[300])
		// Vue.set(app.tracking, "face", )
		// Vue.set(app.tracking, "image", data.facemesh.image)
		// console.log(app.tracking)

		// app.image.src = data.facemesh.image.toDataURL();


		// Do something if we are pinching with left [0] pinky [3]
		// if (data.hands.pinchState[0][3] === 'held') {
		//   console.log('pinching with left pinky')
		// }
	})


	// Start webcam and tracking (personally, I always like to ask first)
	handsfree.start()

}