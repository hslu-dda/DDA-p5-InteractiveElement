# Interactive Shapes Library for p5.js

This library extends p5.js to create interactive shape elements with hover and click functionality. It supports circles, ellipses, rectangles, and arbitrary polygons.

## Dependencies

- p5.js

## Installation

1. Include the p5.js library in your project.
2. Include the `dda-interactiveElement.js` file in your p5.js project.
3. Make sure to load these libraries in the correct order: p5.js first, then dda-interactiveElement.js, and finally your main sketch file.

```html
<script src="path/to/p5.js"></script>
<script src="path/to/dda-interactiveElement.js"></script>
<script src="path/to/sketch.js"></script>
```

## Available Shape Types

The library provides several factory functions to create different interactive shapes:

- `interactiveCircle(x, y, diameter, id)` - Creates a circle
- `interactiveEllipse(x, y, width, height, id)` - Creates an ellipse
- `interactiveRect(x, y, width, height, id)` - Creates a rectangle
- `interactivePolygon(vertices, id)` - Creates a polygon with arbitrary vertices

## Basic Usage

```javascript
let circle;

function setup() {
  createCanvas(400, 400);

  // Create an interactive circle
  circle = interactiveCircle(200, 200, 100, "myCircle")
    .setColor(color(220, 220, 255))
    .setHoverColor(color(180, 180, 255))
    .setClickColor(color(100, 100, 255))
    .setHoverCallback((isHovering, shape) => {
      console.log(isHovering ? "Hovering over circle" : "Not hovering");
    })
    .setClickCallback((shape) => {
      shape.toggleIsActive();
      console.log(shape.getIsActive() ? "Circle is active" : "Circle is inactive");
    });
}

function draw() {
  background(220);

  // Update and draw the circle
  circle.update().draw();
}
```

## Setting Callbacks

All shapes support hover and click callbacks:

```javascript
// Set hover callback
shape.setHoverCallback((isHovering, shape) => {
  console.log(isHovering ? "Hovering!" : "Not hovering");
});

// Set click callback
shape.setClickCallback((shape) => {
  console.log("Clicked!");
  shape.toggleIsActive();
});
```

## Color Customization

You can customize the appearance of your shapes:

```javascript
shape.setColor(color(255, 255, 255)); // Default color
shape.setHoverColor(color(0, 200, 0)); // Color when hovering
shape.setClickColor(color(100, 100, 255)); // Color when clicked
shape.setActiveColor(color(100, 200, 100)); // Color when active
```

## Creating a Polygon

```javascript
// Create a hexagon
let vertices = [];
let centerX = 200;
let centerY = 200;
let radius = 80;

for (let i = 0; i < 6; i++) {
  let angle = (TWO_PI / 6) * i;
  let x = centerX + radius * cos(angle);
  let y = centerY + radius * sin(angle);
  vertices.push(createVector(x, y));
}

let hexagon = interactivePolygon(vertices, "myHexagon")
  .setColor(color(255, 240, 200))
  .setHoverCallback((isHovering, shape) => {
    console.log(isHovering ? "Hovering over hexagon" : "Not hovering");
  });
```

## Working with Multiple Shapes

You can manage multiple shapes using an array:

```javascript
let shapes = [];

function setup() {
  createCanvas(400, 400);

  // Create various shapes
  let circle = interactiveCircle(100, 100, 50, "circle1");
  let rect = interactiveRect(200, 200, 80, 60, "rect1");

  // Add shapes to array
  shapes = [circle, rect];
}

function draw() {
  background(220);

  // Update and draw all shapes
  for (let shape of shapes) {
    shape.update().draw();
  }
}
```

## Working with Transformations

The library automatically handles p5.js transformations like `translate()`, `rotate()`, and `scale()`:

```javascript
let button;

function setup() {
  createCanvas(400, 400);
  button = interactiveRect(0, 0, 80, 30, "transformButton")
    .setClickCallback(() => console.log("Clicked transformed button!"));
}

function draw() {
  background(220);
  
  // Button works correctly even with transforms
  push();
  translate(200, 200);
  rotate(frameCount * 0.01);
  scale(1.5);
  
  button.update().draw();
  pop();
}
```

## Interactive State

All shapes have an active state that can be toggled:

```javascript
// Set active state
shape.setIsActive(true);

// Toggle active state
shape.toggleIsActive();

// Check active state
if (shape.getIsActive()) {
  // Do something with active shapes
}
```

## Features

- **High Performance**: Optimized for many interactive elements with smart culling and caching
- **Transform Aware**: Automatically detects and handles canvas transformations (`push()`, `translate()`, `rotate()`, `scale()`)
- **Smooth Animations**: Built-in color transitions on hover and click
- **Active State Management**: Visual feedback with toggle functionality
- **Method Chaining**: Fluent API for concise code
- **Multiple Shape Support**: Circles, ellipses, rectangles, and custom polygons
- **Automatic Hit Detection**: Efficient mouse interaction handling

## Performance Notes

The library includes several optimizations:

- **Smart Culling**: Shapes outside the mouse range skip expensive hit detection
- **Cached Calculations**: Mouse position and color calculations are cached to avoid redundant work
- **Transform Detection**: Automatically switches between fast and accurate modes based on active transformations
- **Efficient Updates**: Only recalculates when needed, not every frame

For best performance:
- Create shapes once in `setup()`, not repeatedly in `draw()`
- If you manually change shape positions, call `shape.invalidateBounds()` to update hit detection

## Extending with Custom Classes

You can create custom shape classes by extending the base classes. Here's an example of creating a custom polygon class:

```javascript
// Extend the InteractivePolygon class to create a custom polygon
class CustomPolygon extends p5.prototype.InteractivePolygon {
  constructor(p5Instance, vertices, id) {
    super(p5Instance, vertices, id);

    // Custom default properties
    this.color = color(255, 215, 0); // Gold
    this.hoverColor = color(255, 165, 0); // Orange
    this.clickColor = color(255, 69, 0); // Red-Orange
    this.activeColor = color(218, 165, 32); // Golden Rod

    // Custom blend duration for smoother/faster transitions
    this.blendDuration = 5;
  }

  // Override the drawShape method for custom rendering
  drawShape() {
    // Custom drawing code
    this._p5.push();

    // Draw the basic polygon shape
    this._p5.beginShape();
    for (let vert of this.vertices) {
      this._p5.vertex(vert.x, vert.y);
    }
    this._p5.endShape(this._p5.CLOSE);

    // Draw a custom center point
    this._p5.noStroke();
    this._p5.fill(0);
    let centerX = 0,
      centerY = 0;
    for (let vert of this.vertices) {
      centerX += vert.x;
      centerY += vert.y;
    }
    centerX /= this.vertices.length;
    centerY /= this.vertices.length;
    this._p5.ellipse(centerX, centerY, 10);

    this._p5.pop();
  }

  // Add custom methods
  pulse() {
    // Custom animation or behavior
    this.toggleIsActive();
    setTimeout(() => this.toggleIsActive(), 500);
  }
}

// Usage example
function setup() {
  createCanvas(400, 400);

  // Create vertices for a triangle
  let vertices = [createVector(200, 100), createVector(300, 300), createVector(100, 300)];

  // Create a custom polygon instance
  customTriangle = new CustomPolygon(this, vertices, "customTri");

  // Set custom click behavior
  customTriangle.setClickCallback((shape) => {
    shape.pulse();
    console.log("Custom click action!");
  });
}

function draw() {
  background(220);
  customTriangle.update().draw();
}
```

By extending the base classes, you can:

1. Create shapes with custom default properties
2. Implement custom rendering logic
3. Add new methods and behaviors
4. Override existing methods to change functionality
5. Create specialized interactive elements for specific use cases

## Notes

- The library automatically handles canvas transformations and pixel density.
- Make sure to call `update()` before `draw()` in your draw loop.
- Shapes use their own color system with blending between states.
- All shape constructors return instances that can be chained with setter methods.
- Active shapes are displayed with a red stroke by default.
- When extending classes, remember to pass the p5 instance to the parent constructor.
- Use `getIsActive()` instead of directly accessing the `isActive` property for better encapsulation.
- If you manually change shape positions or sizes, call `invalidateBounds()` to ensure proper hit detection.