
// PVector class
class PVector {
  constructor(x_, y_){
    this.x = x_;
    this.y = y_;
  }

  // Add a vector to the current vector
  add(v) {
    this.y = this.y + v.y;
    this.x = this.x + v.x;
  }

  // Subtract a vector from the current vector
  sub(v) {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
  }

  // Multiply the vector by a scalar
  multi(scalar){
    this.x = this.x*scalar
    this.y = this.y*scalar
  }

  // Divide the vector by a scalar
  div(scalar){
    this.x = this.x/scalar
    this.y = this.y/scalar
  }

  mag(){
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }

  normalize() {
    let m = this.mag();
    if (m != 0) {
      this.div(m);
    }
   }

   limit(max) {
    const magnitude = this.mag();
    if (magnitude > max) {
      this.div(magnitude); // Normalize the vector
      this.multi(max); // Scale the vector to the specified maximum value
    }
   }

  // Set a random positive x component of the vector
  randPosXVect(){
    this.x = Math.floor(random(1, maxSpeed))
  }

  // Set a random positive y component of the vector
  randPosYVect(){
    this.y = Math.floor(random(1, maxSpeed))
  }

  // Set a random negative x component of the vector
  randNegXVect(){
    this.x = Math.floor(random(-maxSpeed, -1))
  }

  // Set a random negative y component of the vector
  randNegYVect(){
    this.y = Math.floor(random(-maxSpeed, -1))
  }

  // Reset the vector's position if it goes beyond the canvas
  resetPosition() {
    if (this.x > sizeVar + 30) {
      this.x = sizeVar/2;
    }
    if (this.x < -30) {
      this.x = sizeVar/2;
    }
    if (this.y > sizeVar +30) {
      this.y = sizeVar/2;
    }
    if (this.y < -30) {
      this.y = sizeVar/2;
    }
  }

  //STATIC METHODS

  static add(v1, v2) {
    return new PVector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1, v2) {
    return new PVector(v1.x - v2.x, v1.y - v2.y);
  }

  static mag(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  static match(v1, v2){
    if(v1.x == v2.x && v1.y == v2.y){
      return true
    } else {
      return false
    }
  }

  static getVDistance(v1, v2){
    return Math.abs(Math.sqrt(((v2.x - v1.x) * (v2.x - v1.x)) + ((v2.y - v1.y) * (v2.y - v1.y))))
  }

}


class Crawler {
  constructor(segments, segmentSize, angleX, aVelocityX, amplitudeX, angleY, aVelocityY, amplitudeY, xOffset, xSpeed, yOffset, ySpeed, rotationAngle, angleSpeed){
    this.segments = segments;
    this.segmentSize = segmentSize;

    this.angleX = angleX;
    this.aVelocityX = aVelocityX;
    this.amplitudeX = amplitudeX;

    this.angleY = angleY;
    this.aVelocityY = aVelocityY;
    this.amplitudeY = amplitudeY;

    this.location = new Pv
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

    this.rotationAngle = rotationAngle;
    this.angleSpeed = angleSpeed; 
  } 

  display(){
    ellipseMode(CENTER);
    stroke(0);
    fill(175);
    push()
    translate(this.xOffset, height / 2 + this.yOffset);
    rotate(radians(this.rotationAngle))
    for (let pos = -200; pos <= width - width; pos += 15) {
      let x = this.amplitudeX * cos(this.angleX + pos / 25);
      let y = this.amplitudeY * sin(this.angleY + pos / 150);
      
      strokeWeight(1);
      ellipse(pos, y - 15, 30, 30);
      strokeWeight(3);
      line(pos, y, pos + x, y + 30);
      line(pos, y - 30, pos + x, y - 60);
      
      this.angleY += this.aVelocityY;
      this.rotationAngle += this. angleSpeed
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
let crawler = new Crawler(0, 0, 0, 0.1, 15, 0, .001, 150, 0, 1, 0, .2, 0, .003);

function draw() {
  background(255);
  
  crawler.display();
  crawler.update();
  


}

/*
 TODO LIST:
 1. Convert to a class. - DONE
 2. Make it wander horizontally. - Done
 3. Make it able to wander in different and even diagonal directions. 
 4. Reset it once it gets too far away.
 5. This is the big step: I want it to stop go between very slowly and quickly oscilating. When it is moving slowly, it keeps a slow pace.
    When it moves quickly though, it will zoom forward in a direction for a second. I want this to happen on random time intervals as well. 
    I have some ideas on how to make this happen.
 6. Make a cluster of these things all working independently. This may need to happen after reading Chapter 4 of Nature of code.
*/