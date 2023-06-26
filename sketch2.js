

class Crawler {
  constructor(segments, segmentSize, angleX, aVelocityX, amplitudeX, angleY, aVelocityY, amplitudeY, xOffset, xSpeed, yOffset, ySpeed){
    this.segments = segments;
    this.segmentSize = segmentSize;

    this.angleX = angleX;
    this.aVelocityX = aVelocityX;
    this.amplitudeX = amplitudeX;

    this.angleY = angleY;
    this.aVelocityY = aVelocityY;
    this.amplitudeY = amplitudeY;

    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  } 

  display(){
    ellipseMode(CENTER);
    stroke(0);
    fill(175);
    push()
    translate(this.xOffset, height / 2 + this.yOffset);
    for (let pos = 200; pos <= width - 200; pos += 15) {
      let x = this.amplitudeX * cos(this.angleX + pos / 25);
      let y = this.amplitudeY * sin(this.angleY + pos / 150);
      
      strokeWeight(1);
      ellipse(pos, y - 15, 30, 30);
      strokeWeight(3);
      line(pos, y, pos + x, y + 30);
      line(pos, y - 30, pos + x, y - 60);
      
      this.angleY += this.aVelocityY;
    }
    pop()
  }

  update(){
    this.xOffset += this.xSpeed;
    this.yOffset += this.ySpeed;
    
    this.angleX += this.aVelocityX;
  }
}

function setup() {
  createCanvas(1200, 1200);
  background(255);
}

//Instantiation
let crawler = new Crawler(0, 0, 0, 0.1, 15, 0, .001, 150, 0, 1, 0, .2);

function draw() {
  background(255);
  
  crawler.display();
  crawler.update();
  


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