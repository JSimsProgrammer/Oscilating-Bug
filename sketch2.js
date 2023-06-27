
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLineLen(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
}

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
  constructor(segments, segmentSize, angleX, aVelocityX, amplitudeX, angleY, aVelocityY, amplitudeY, xOffset, xSpeed, yOffset, ySpeed){
    this.segments = segments;
    this.segmentSize = segmentSize;

    this.angleX = angleX;
    this.aVelocityX = aVelocityX;
    this.amplitudeX = amplitudeX;

    this.angleY = angleY;
    this.aVelocityY = aVelocityY;
    this.amplitudeY = amplitudeY;

    this.location = new PVector(xOffset, yOffset)
    this.velocity = new PVector(xSpeed, ySpeed)
    this.acceleration = new PVector(0,0);
    
  } 

  display(){
    let angle = atan2(this.velocity.y, this.velocity.x)
    ellipseMode(CENTER);
    stroke(0);
    fill(175);
    push()
    translate(this.location.x, this.location.y);
    rotate(angle)
    for (let pos = -200; pos <= 0; pos += 15) {
      let x = this.amplitudeX * cos(this.angleX + pos / 25);
      let y = this.amplitudeY * sin(this.angleY + pos / 150);
      
      strokeWeight(1);
      ellipse(pos, y - 15, 30, 30);
      strokeWeight(3);
      line(pos, y, pos + x, y + 30);
      line(pos, y - 30, pos + x, y - 60);
      
      this.angleY += this.aVelocityY;
      console.log(y - this.location.y)

    }
    pop()

    //ellipse(this.location.x, this.location.y, 50, 50)

  }

  update(){
    this.velocity.add(this.acceleration)
    this.velocity.limit(5);
    this.location.add(this.velocity)

    this.angleX += this.aVelocityX;
  }

  reset() {
    //If this is too far outside the canvas
    if(this.location.x > width + 300 || this.location.x < -300|| this.location.y > height + 300 || this.location.y < -300) {
      //Reset X to be a random value.
      this.location.x =  getRandomInt(-50, width + 50);
        //If X is inside the canvas, Reset Y to be above or below. 
        if(this.location.x < width && this.location.x > 0) {
          let randInt = getRandomInt(1, 100);
          if(randInt % 2  == 0) {
            this.location.y = -50;
          } else {
            this.location.y = height + 50;
          }
        //Else, Y can be reset anywhere in defined boundaries
        } else {
          this.location.y =  getRandomInt(-50, height + 50);
        }
      //If X is on the left side of the canvas, make X speed positive. 
      if(this.location.x < width/2) {
        this.velocity.x = getRandomInt(1, 5);
      //Else, make x speed negative.  
      } else {
        this.velocity.x = getRandomInt(-5, -1);
      }
      //If Y is on the top of the cavas, make Yspeed positive. 
      if(this.location.y < height/2){
        this.velocity.y = getRandomInt(1, 5);
        //Else, make Y speed negative. Use a range for thse values.
      } else {
        this.velocity.y = getRandomInt(-5, -1);
      }
    }
  }
}

function setup() {
  createCanvas(1200, 1200);
  background(255);
}

//Instantiation
let crawler = new Crawler(0, 0, 0, 0.1, 15, 0, .001, 150, 0, 1, 0, -1);

function draw() {
  background(255);
  
  crawler.display();
  crawler.update();
  crawler.reset();
  


}

/*
 TODO LIST:
 1. Convert to a class. - DONE
 2. Make it wander horizontally. - Done
 3. Make it able to wander in different and even diagonal directions. - DONE
 4. Reset it once it gets too far away and come back in a differnt spot, approaching at a different angle.
 5. Make a cluster of these things all working independently. This may need to happen after reading Chapter 4 of Nature of code.
 6. Make the cluster be all different shapes and sizes.
 7. This is the big step: I want it to stop go between very slowly and quickly oscilating. When it is moving slowly, it keeps a slow pace.
    When it moves quickly though, it will zoom forward in a direction for a second. I want this to happen on random time intervals as well. 
    I have some ideas on how to make this happen.
*/