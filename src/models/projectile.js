class Projectile {
  constructor(x, y, radius, color, direction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.direction = direction;

    this.draw = this.draw.bind(this);
    this.animate = this.animate.bind(this);
  }

  draw(context) {  
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }

  animate(context) {
    const { dx, dy } = this.direction;
    this.x += dx * 4;
    this.y += dy * 4;

    this.draw(context);
  }
  
  isWithinBounds(xBorder, yBorder) {
    return this.x - this.radius >= 0 && this.y - this.radius >= 0 && this.x - this.radius <= xBorder && this.y - this.radius <= yBorder;
  }
}

export default Projectile