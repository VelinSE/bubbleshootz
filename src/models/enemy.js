class Enemy {
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
    this.x += dx;
    this.y += dy;

    this.draw(context);
  }

  onHit(damage) {
    this.radius -= damage;

    return this.radius;
  }
}

export default Enemy;