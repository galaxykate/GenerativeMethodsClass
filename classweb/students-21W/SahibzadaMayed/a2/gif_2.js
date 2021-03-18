let r = 5
let a = 5
let c = 5
let angle = 5
let art


function setup() {
  createCanvas(600, 600, WEBGL);
  art = createGraphics(400, 400)
}

 
function draw() {
  background(0);
  push()
  
let from = color(10, 30, Math.floor((Math.random())*255));
let to = color(Math.floor((Math.random())*255), 30, 50);
let b = Math.floor(Math.random());
l1 = lerpColor(from,to, Math.random());
l2 = lerpColor(to,from, Math.random());

  
// Trig functions
  let x = r + c * cos(a)
  let y = r + c * sin(a)
  let z = r + c * tan(a)

  let m = r+ c*sin(a)
  
  if (mouseIsPressed) {
  art.fill(l1, l2, l1)
  art.line(x + 200, y + 200, z+200, z+200)
  art.circle(x + 200, y + 200)
  c += 0.1
  a += 0.25
  pop()
  push()
  texture(art)
  rotateX(angle)
  rotateY(angle)
  rotateZ((Math.random())/ 100)
  sphere(25)
  box(37)
  sphere(50)
  box(62+m)
  sphere(75)
  box(87+m)
  sphere(100)
  box(112)
  sphere(125+m)
  box(137)
  box(150)
  box(175)
  box(200)
  box(225)
  box(250)
  angle += 0.005
  pop()
  }
  
  
  else {
  art.fill(l1, l2, b)
  art.triangle (x + 200, y + 200, z+200, z+200)
  art.circle(x + 200, y + 200)
  art.ellipse(x + 20, y + 20,5,5)
  c += 0.1
  a += 0.1
  push()
  texture(art)
  rotateX(angle)
  rotateY(angle)
  rotateZ((Math.random())/ 100)
  box(12)
  sphere(25)
  box(37)
  sphere(50)
  box(62)
  sphere (75)
  box(87)
  sphere(100)
  box(112)
  sphere(125)
  box(137)
  sphere(150)
  box(175)
  sphere(200)
  box(225)
  sphere(250)
  box(275)
  angle -= 0.03
  pop()
  }

}
