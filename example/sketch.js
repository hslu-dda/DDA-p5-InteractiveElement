let e;
let promptText = "";

function setup() {
  createCanvas(400, 400);
  // Create a triangle
  let vertices = [createVector(0, 0), createVector(50, 100), createVector(-50, 100), createVector(-50, 50)];

  e = new InteractivePolygon(vertices, 0);
  e.data = { form: "Polygon" };

  e.setHoverCallback((isHovering, instance) => {
    console.log(`Polygon ${instance.id} is ${isHovering ? "being hovered" : "not being hovered"}`);
  });

  e.setClickCallback((instance) => {
    console.log(`Polygon ${instance.id} was clicked!`);
    promptText = instance.data.form;

    e.toggleIsActive();
  });

  vertices = [createVector(0, 0), createVector(50, 100), createVector(-50, 100)];
  d = new CustomPolygon(vertices, 1);
  d.data = { form: "Triangle" };

  d.setClickCallback((instance) => {
    console.log(`Polygon ${instance.id} was clicked! ${JSON.stringify(instance.data)}`);
    d.toggleIsActive();
    promptText = instance.data.form;
  });
}

function draw() {
  background(220);
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.02);
  e.update();
  e.draw();
  pop();

  push();
  translate(width / 2, height / 2);
  d.update();
  d.draw();
  pop();

  text(promptText, 20, 20);
}

class CustomPolygon extends p5.prototype.InteractivePolygon {
  constructor(vertices, id) {
    super(vertices, id);
    this.color = color(random(255), random(255), random(255));
  }

  draw() {
    push(); // Save the current drawing state

    stroke(0);
    strokeWeight(2);
    if (this.hover) {
      fill(255, 0, 0);
    } else {
      fill(this.color);
    }
    this.isActive ? strokeWeight(5) : strokeWeight(1);
    beginShape();
    for (let vert of this.vertices) {
      vertex(vert.x, vert.y);
    }
    endShape(CLOSE);

    // Add a label
    noStroke();
    fill(255, 0, 0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.id, this.vertices[0].x, this.vertices[0].y);

    pop(); // Restore the previous drawing state
  }
}
