let angleX = 0;
let aVelocityX = 0.1;
let amplitudeX = 15;

let angleY = 0;
let aVelocityY = 0.001;
let amplitudeY = 150;

let xOffset = 0;
let yOffset = 0;
let xSpeed = -2;
let ySpeed = 0.2;

function setup() {
  createCanvas(1200, 1200);
  background(255);
}

function draw() {
  background(255);
  
  // Update the translation offsets
  xOffset += xSpeed;
  yOffset += ySpeed;
  
  angleX += aVelocityX;
  
  ellipseMode(CENTER);
  stroke(0);
  fill(175);
  translate(xOffset, height / 2 + yOffset);
  for (let pos = 200; pos <= width - 200; pos += 15) {
    let x = amplitudeX * cos(angleX + pos / 25);
    let y = amplitudeY * sin(angleY + pos / 150);
    
    strokeWeight(1);
    ellipse(pos, y - 15, 30, 30);
    strokeWeight(3);
    line(pos, y, pos + x, y + 30);
    line(pos, y - 30, pos + x, y - 60);
    
    angleY += aVelocityY;
  }
}
