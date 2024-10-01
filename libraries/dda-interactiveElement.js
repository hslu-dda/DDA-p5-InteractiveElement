p5.prototype.getAbsoluteCoordinates = function (x, y) {
  let pos = createVector(x, y);
  return screenPosition(pos);
};

p5.prototype.screenPosition = function (point) {
  let m = drawingContext.getTransform();
  let tx = m.a * point.x + m.c * point.y + m.e;
  let ty = m.b * point.x + m.d * point.y + m.f;
  return createVector(tx / pixelDensity(), ty / pixelDensity());
};

p5.prototype.isPointInPolygon = function (point, polygon) {
  let x = point.x,
    y = point.y;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i].x,
      yi = polygon[i].y;
    let xj = polygon[j].x,
      yj = polygon[j].y;

    let intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

p5.prototype.InteractivePolygon = class {
  constructor(vertices, id) {
    this.vertices = vertices;
    this.id = id;
    this.hover = false;
    this.width = width;
    this.height = height;

    this.color = color(255);
    this.clickColor = color(100, 100, 255);
    this.activeColor = color(100, 200, 100);
    this.hoverColor = color(0, 200, 0);

    this.blendDuration = 10; // Duration of blend in frames
    this.hoverBlendAmount = 0; // Blend amount for hover (0 to 1)
    this.clickBlendAmount = 0; // Blend amount for click (0 to 1)

    this.onHover = null;
    this.onClick = null;
    this.isActive = false;
  }
  update() {
    let wasHovering = this.hover;
    let screenVertices = this.vertices.map((v) => getAbsoluteCoordinates(v.x, v.y));
    let mousePos = createVector(mouseX, mouseY);
    this.hover = isPointInPolygon(mousePos, screenVertices);

    if (this.hover !== wasHovering && this.onHover) {
      this.onHover(this.hover, this);
    }

    if (this.hover && mouseIsPressed && !this.clicked) {
      this.clicked = true;
      if (this.onClick) {
        this.onClick(this);
      }
    } else if (!mouseIsPressed) {
      this.clicked = false;
    }

    // Update hover blend amount
    if (this.hover && this.hoverBlendAmount < 1) {
      this.hoverBlendAmount = min(this.hoverBlendAmount + 1 / this.blendDuration, 1);
    } else if (!this.hover && this.hoverBlendAmount > 0) {
      this.hoverBlendAmount = max(this.hoverBlendAmount - 1 / this.blendDuration, 0);
    }

    // Update click blend amount
    if (this.clicked && this.clickBlendAmount < 1) {
      this.clickBlendAmount = min(this.clickBlendAmount + 1 / this.blendDuration, 1);
    } else if (!this.clicked && this.clickBlendAmount > 0) {
      this.clickBlendAmount = max(this.clickBlendAmount - 1 / this.blendDuration, 0);
    }
  }

  draw() {
    // Start with either the normal color or active color
    let baseColor = this.isActive ? this.activeColor : this.color;

    // Blend with hover color
    let hoverColor = lerpColor(baseColor, this.hoverColor, this.hoverBlendAmount);

    // Blend with click color
    let finalColor = lerpColor(hoverColor, this.clickColor, this.clickBlendAmount);

    fill(finalColor);
    this.isActive ? stroke(255, 0, 0) : stroke(0);
    beginShape();
    for (let vert of this.vertices) {
      vertex(vert.x, vert.y);
    }
    endShape(CLOSE);
  }

  setHoverCallback(callback) {
    this.onHover = callback;
  }

  setClickCallback(callback) {
    this.onClick = callback;
  }

  setIsActive(isActive) {
    this.isActive = isActive;
  }
  toggleIsActive() {
    this.isActive = !this.isActive;
  }
};
