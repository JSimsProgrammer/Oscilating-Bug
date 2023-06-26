

class Crawler {
  constructor(segments, segmentSize, angleX, aVelocityX, amplitudeX, angleY, aVelocityY, amplitudeY, xOffset, xSpeed, xOffset, ySpeed){
    this.segments = segments;
    this.segmentSize = segmentSize;

    this.angleX = angleX;
    this.aVelocityX = aVelocityX;
    this.amplitudeX = amplitudeX;

    this.angleY = angleY;
    this.aVelocityY = aVelocityY;
    this.amplitudeY = amplitudeY;

    let xOffset = xOffset;
    let yOffset = yOffset;
    let xSpeed = xSpeed;
    let ySpeed = ySpeed;
  } 

  display(){

  }
}

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

/*
 TODO LIST:
 1. Convert to a class. - IN PROGRESS
 2. Make it wander horizontally.
 3. Make it able to wander in different and even diagonal directions. 
 4. Reset it once it gets too far away.
 5. This is the big step: I want it to stop go between very slowly and quickly oscilating. When it is moving slowly, it keeps a slow pace.
    When it moves quickly though, it will zoom forward in a direction for a second. I want this to happen on random time intervals as well. 
    I have some ideas on how to make this happen.
 6. Make a cluster of these things all working independently. This may need to happen after reading Chapter 4 of Nature of code.
*/