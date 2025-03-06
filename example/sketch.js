let shapes = [];
let infoText = "";

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);

  // Create an interactive circle
  circle = interactiveCircle(150, 150, 100, "myCircle")
    .setColor(color(220, 220, 255))
    .setHoverColor(color(180, 180, 255))
    .setClickColor(color(100, 100, 255))
    .setHoverCallback((isHovering, shape) => {
      if (isHovering) infoText = "Hovering over Circle";
      else if (infoText === "Hovering over Circle") infoText = "";
    })
    .setClickCallback((shape) => {
      shape.toggleIsActive();
      infoText = shape.isActive ? "Circle is active" : "Circle is inactive";
    });

  // Create an interactive ellipse
  ellipse = interactiveEllipse(400, 150, 160, 80, "myEllipse")
    .setColor(color(255, 220, 220))
    .setHoverColor(color(255, 180, 180))
    .setClickColor(color(255, 100, 100))
    .setHoverCallback((isHovering, shape) => {
      if (isHovering) infoText = "Hovering over Ellipse";
      else if (infoText === "Hovering over Ellipse") infoText = "";
    })
    .setClickCallback((shape) => {
      shape.toggleIsActive();
      infoText = shape.isActive ? "Ellipse is active" : "Ellipse is inactive";
    });

  // Create an interactive rectangle
  rect = interactiveRect(600, 100, 120, 100, "myRect")
    .setColor(color(220, 255, 220))
    .setHoverColor(color(180, 255, 180))
    .setClickColor(color(100, 255, 100))
    .setHoverCallback((isHovering, shape) => {
      if (isHovering) infoText = "Hovering over Rectangle";
      else if (infoText === "Hovering over Rectangle") infoText = "";
    })
    .setClickCallback((shape) => {
      shape.toggleIsActive();
      infoText = shape.isActive ? "Rectangle is active" : "Rectangle is inactive";
    });

  // Create an interactive polygon (hexagon)
  let vertices = [];
  let centerX = 300;
  let centerY = 350;
  let radius = 80;

  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI / 6) * i - PI / 6;
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    vertices.push(createVector(x, y));
  }

  polygon = interactivePolygon(vertices, "myHexagon")
    .setColor(color(255, 240, 200))
    .setHoverColor(color(255, 220, 150))
    .setClickColor(color(255, 180, 100))
    .setHoverCallback((isHovering, shape) => {
      if (isHovering) infoText = "Hovering over Hexagon";
      else if (infoText === "Hovering over Hexagon") infoText = "";
    })
    .setClickCallback((shape) => {
      shape.toggleIsActive();
      infoText = shape.isActive ? "Hexagon is active" : "Hexagon is inactive";
    });

  // Create an interactive star polygon
  let starVertices = [];
  centerX = 600;
  centerY = 350;
  let outerRadius = 80;
  let innerRadius = 40;

  for (let i = 0; i < 10; i++) {
    let angle = (TWO_PI / 10) * i - PI / 2;
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    starVertices.push(createVector(x, y));
  }

  star = interactivePolygon(starVertices, "myStar")
    .setColor(color(255, 220, 255))
    .setHoverColor(color(255, 180, 255))
    .setClickColor(color(255, 100, 255))
    .setHoverCallback((isHovering, shape) => {
      if (isHovering) infoText = "Hovering over Star";
      else if (infoText === "Hovering over Star") infoText = "";
    })
    .setClickCallback((shape) => {
      shape.toggleIsActive();
      infoText = shape.isActive ? "Star is active" : "Star is inactive";
    });

  // Add all shapes to the array
  shapes = [circle, ellipse, rect, polygon, star];
}

function draw() {
  background(240);

  // Update and draw all shapes
  for (let shape of shapes) {
    shape.update().draw();
  }

  // Draw labels
  fill(0);
  noStroke();

  text("Circle", 150, 220);
  text("Ellipse", 400, 220);
  text("Rectangle", 600, 220);
  text("Hexagon", 300, 450);
  text("Star", 600, 450);

  // Draw info text
  if (infoText) {
    fill(0, 102, 153);
    textSize(16);
    text(infoText, width / 2, 30);
    textSize(12);
  }

  // Draw instructions
  fill(100);
  text("Click on shapes to toggle active state (red outline)", width / 2, height - 20);
}
