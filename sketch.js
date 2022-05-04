class Planet {
    constructor (mass, color, x_position, y_position, diameter, name) {
        this.isStar = false;
        this.mass = mass;
        this.color = color;
        this.x_position = x_position;
        this.y_position = y_position;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.diameter = diameter;
        this.towardsTheCentreVelocity = 0;
        this.orbit = [];
        this.name = name;
    }

    draw() {
        push();
        
        stroke(100);
        beginShape();
        noFill();
        for (let orbitPoint = 0; orbitPoint < this.orbit.length; orbitPoint++) {
            let orbitP = this.orbit[orbitPoint];
            vertex(orbitP.x * scale + windowWidth / 2, orbitP.y * scale + windowHeight / 2);
            this.orbit[orbitPoint].duration += 1;
            if (orbitP.duration > 500) {
                this.orbit.splice(orbitPoint, 1);
            }
        }
        endShape();
        noStroke();
        fill(...this.color);

        let xpos = this.x_position * scale + windowWidth / 2;
        let ypos = this.y_position * scale + windowHeight / 2;
        circle(xpos, ypos, this.diameter );
        text(this.name, xpos, ypos - this.diameter / 2 - 10);

        pop();
    }

    apply_attraction(other) {
        let distance_x = other.x_position - this.x_position;
        let distance_y = other.y_position - this.y_position;


        let distance = Math.sqrt( Math.pow( distance_x, 2 ) + Math.pow(distance_y, 2) );

        let force = ( GRAVITATIONAL_CONSTANT * this.mass * other.mass ) / Math.pow(distance, 2)

        let theta = Math.atan2(distance_y, distance_x);

        let xForce = Math.cos( theta ) * force;
        let yForce =  Math.sin( theta ) * force;

        return { xForce: xForce, yForce: yForce };
    }

    all_attraction(celestial_bodies) {
        let tXF = 0;
        let tYF = 0;
        for (let i = 0; i < celestial_bodies.length; i++) {
            let otherBody = celestial_bodies[i];
            if (otherBody === this) {
                continue;
            }

            let attraction = this.apply_attraction( otherBody );
            tXF += attraction.xForce ;
            tYF += attraction.yForce ;
        }

        this.xVelocity += tXF / this.mass * timeStep;
        this.yVelocity += tYF / this.mass * timeStep;

        this.x_position += this.xVelocity * timeStep;
        this.y_position += this.yVelocity * timeStep;

        let newOrbitPoint = { x: this.x_position, y: this.y_position, duration: 0};
        this.orbit.push(newOrbitPoint);
    }
}

// au stands for astronomiacal unit
let au = 149.6e6 * 1000;
// 50 pixels per au distance
let scale = 50 / au;
let defaultScale = 50 / au;
let GRAVITATIONAL_CONSTANT = 6.67e-11;
let timeStep = 86400;

let sun;
let mars;
let mercury;
let venus;
let jupiter;

let celestial_bodies;

function setup() {
    pixelDensity(2);
    createCanvas(windowWidth, windowHeight);
    celestial_bodies = getSolarCelestialBodies(scale, defaultScale);
}

let lastMousePosition = 0;
let lastMousePress = {x: 0, y: 0};
let translatePosition = {x: 0, y: 0};
let trackingMouse = false;


function draw() {
    textSize(10);
    translate(translatePosition.x, translatePosition.y);
    noStroke();
    background(0);

    for (let i = 0; i < celestial_bodies.length; i++) {
        let celestial_body = celestial_bodies[i];
        celestial_body.draw();
        celestial_body.all_attraction(celestial_bodies);
    }
  
}

function mouseWheel(event) {
    let scaleLarger = false;
    if (event.delta < 0) {
        scale = scale * 1.1;
        scaleLarger = true;
  
    } else {
        scale = scale * 0.9;
    }

    for (let i = 0; i < celestial_bodies.length; i++) {
        celestial_bodies[i].diameter = celestial_bodies[i].diameter *  ( scaleLarger ? 1.1: 0.9 );
    }
}


function mousePressed(event) {
    lastMousePosition = {x: mouseX, y: mouseY};

    if (trackingMouse) {
        mouseXField.value = ( - windowWidth / 2 + mouseX ) * (1/scale) / au;
        mouseYField.value = ( - windowHeight / 2 + mouseY) * (1/scale) / au ;
    }
}

function mouseDragged() {
    translatePosition = { x: mouseX - lastMousePosition.x, y: mouseY - lastMousePosition.y }
}

