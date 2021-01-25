class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;

    this.draw = this.draw.bind(this);
    this.animate = this.animate.bind(this);
  }

  draw(context) {  
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.fllStyle = this.color;
    context.closePath();
    context.fill();
  }

  animate(context) {
    const { x, y } = this.velocity;
    this.x += x;
    this.y += y;

    this.draw(context);
    requestAnimationFrame(() => this.animate(context));
  }
}

export default Projectile