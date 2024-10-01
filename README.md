# Interactive Polygon Library for p5.js

This library extends p5.js to create interactive polygon elements with hover and click functionality.

## Dependencies

- p5.js
- p5easing library

## Installation

1. Include the p5.js library in your project.
2. Include the p5easing library. You can download it from [GitHub](https://github.com/hslu-dda/p5easing).
   - Download the `p5.easing.js` file from the repository.
   - Include it in your project directory.
   - Add it to your HTML file:
     ```html
     <script src="path/to/p5.js"></script>
     <script src="path/to/p5.easing.js"></script>
     ```
3. Include the `dda-interactiveElement.js` file in your p5.js project.
4. Make sure to load these libraries in the correct order: p5.js, then p5easing, then dda-interactiveElement.js, and finally your main sketch file.

## Creating an Interactive Polygon

```javascript
let polygon;

function setup() {
  createCanvas(400, 400);

  // Define vertices for your polygon
  let vertices = [createVector(50, 50), createVector(150, 50), createVector(100, 150)];

  // Create a new InteractivePolygon
  polygon = new InteractivePolygon(vertices, "myPolygon");
}

function draw() {
  background(220);

  // Update and draw the polygon
  polygon.update();
  polygon.draw();
}
```

## Setting Callbacks

```javascript
// Set hover callback
polygon.setHoverCallback((isHovering, polygon) => {
  console.log(isHovering ? "Hovering!" : "Not hovering");
});

// Set click callback
polygon.setClickCallback((polygon) => {
  console.log("Clicked!");
  polygon.toggleIsActive();
});
```

## Customization

- Change colors: `polygon.color`, `polygon.hoverColor`, `polygon.clickColor`, `polygon.activeColor`
- Adjust blend duration: `polygon.blendDuration`

## Extending the InteractivePolygon Class

You can create custom polygon classes by extending `InteractivePolygon`. Here's an example:

```javascript
class CustomPolygon extends p5.prototype.InteractivePolygon {
  constructor(vertices, id) {
    super(vertices, id);
    this.color = color(random(255), random(255), random(255));
  }

  draw() {
    push();
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
    pop();
  }
}

// Usage
let customPolygon;

function setup() {
  createCanvas(400, 400);
  let vertices = [createVector(0, 0), createVector(50, 100), createVector(-50, 100)];
  customPolygon = new CustomPolygon(vertices, "customPoly");
}

function draw() {
  background(220);
  customPolygon.update();
  customPolygon.draw();
}
```

## Features

- Smooth color transitions on hover and click
- Active state toggling
- Works with transformed canvases
- Extensible for custom behavior
- Utilizes p5.easing for smoother animations (optional)

## Notes

- The library automatically handles canvas transformations and pixel density.
- Make sure to call `update()` before `draw()` in your main draw loop.
- When extending the class, you can override methods like `draw()` for custom rendering.
- You can add custom properties and methods to your extended classes.
