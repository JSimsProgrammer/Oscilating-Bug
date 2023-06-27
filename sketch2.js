let screenWidth = window.innerWidth
let screenHeight = window.innerHeight
let topSpeed = 4
let maxLength = 400
let maxSize = 75
let numberOfBugs = 20


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandColorInt() {
  return Math.floor(Math.random() * 256);
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
  constructor(angleX, aVelocityX, amplitudeX, angleY, aVelocityY, amplitudeY){
    this.length = getRandomInt(10, maxLength);
    this.size = getRandomInt(10, maxSize);
    this.distance = this.size/2;

    this.angleX = angleX;
    this.aVelocityX = aVelocityX;
    this.amplitudeX = amplitudeX;

    this.angleY = angleY;
    this.aVelocityY = aVelocityY;
    this.amplitudeY = amplitudeY;

    this.location = new PVector(0, 0)
    this.velocity = new PVector(0, 0)
    this.acceleration = new PVector(0,0);

    this.bodyColor = [getRandColorInt(), getRandColorInt(), getRandColorInt()]

    this.location.x =  getRandomInt(-50, screenWidth + 50);
    //If X is inside the canvas, Reset Y to be above or below. 
    if(this.location.x < screenWidth && this.location.x > 0) {
        let randInt = getRandomInt(1, 100);
        if(randInt % 2  == 0) {
          this.location.y = -50;
        } else {
          this.location.y = screenHeight + 50;
        }
      //Else, Y can be reset anywhere in defined boundaries
      } else {
        this.location.y =  getRandomInt(-50, screenHeight + 50);
      }
    //If X is on the left side of the canvas, make X speed positive. 
    if(this.location.x < screenWidth/2) {
      this.velocity.x = getRandomInt(1, topSpeed);
    //Else, make x speed negative.  
    } else {
      this.velocity.x = getRandomInt(-topSpeed, -1);
    }
    //If Y is on the top of the cavas, make Yspeed positive. 
    if(this.location.y < screenHeight/2){
      this.velocity.y = getRandomInt(1, topSpeed);
      //Else, make Y speed negative. Use a range for thse values.
    } else {
      this.velocity.y = getRandomInt(-topSpeed, -1);
    }  
  } 

  display(){
    let angle = atan2(this.velocity.y, this.velocity.x)
    ellipseMode(CENTER);
    stroke(255);
    console.log(this.bodyColor)
    fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
    push()
    translate(this.location.x, this.location.y);
    rotate(angle)
    for (let pos = -this.length - 10; pos <= -10; pos += this.distance) {
      let x = this.amplitudeX * cos(this.angleX + pos / 25);
      let y = this.amplitudeY * sin(this.angleY + pos / 150);
      
      strokeWeight(1);
      //fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
      fill(this.location.y % 255, this.location.x % 255, Math.abs(this.location.x - this.location.y) % 255);
      stroke(0);
      ellipse(pos, y - (this.size/2), this.size, this.size);
      strokeWeight(3);
      stroke(this.location.x % 255, this.location.y % 255, (this.location.x + this.location.y) % 255);
      line(pos, y, pos + x, y + this.size);
      line(pos, y - this.size, pos + x, y - (this.size*2));
      
      this.angleY += this.aVelocityY;
    }
    pop()

    //ellipse(this.location.x, this.location.y, 50, 50)

  }

  update(){
    this.velocity.add(this.acceleration)
    this.velocity.limit(topSpeed);
    this.location.add(this.velocity)

    this.angleX += this.aVelocityX;
  }

  reset() {
    //If this is too far outside the canvas
    if(this.location.x > width + this.length || this.location.x < -this.length|| this.location.y > height + this.length || this.location.y < -this.length) {
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
        this.velocity.x = getRandomInt(1, topSpeed);
      //Else, make x speed negative.  
      } else {
        this.velocity.x = getRandomInt(-topSpeed, -1);
      }
      //If Y is on the top of the cavas, make Yspeed positive. 
      if(this.location.y < height/2){
        this.velocity.y = getRandomInt(1, topSpeed);
        //Else, make Y speed negative. Use a range for thse values.
      } else {
        this.velocity.y = getRandomInt(-topSpeed, -1);
      }

      this.bodyColor = [getRandColorInt(), getRandColorInt(), getRandColorInt()]
      this.length = getRandomInt(10, maxLength);
      this.size = getRandomInt(10, maxSize);
      this.distance = this.size/2;
    }
  }
}

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(0);
}

let crawlerList = []

//Instantiation
for(let i = 0; i < numberOfBugs; i++) {
  let crawler = new Crawler(0, 0.1, 15, 0, .001, 150);
  crawlerList.push(crawler);

}

function draw() {
  background(0);
  
  for(let i = 0; i < crawlerList.length; i++) {
    crawlerList[i].display();
    crawlerList[i].update();
    crawlerList[i].reset();
  }
  console.log(getRandomInt(1, 10000))



}

function windowResized() {
  screenWidth = window.innerWidth
  screenHeight = window.innerHeight
  resizeCanvas(screenWidth, screenHeight);
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