class Particle {
  constructor(x, y, radius, color, direction, parentRadius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.direction = direction;
    this.alpha = 1;
    this.multiplier = Math.random() * (parentRadius / 10 + 1) + 2;

    this.draw = this.draw.bind(this);
    this.animate = this.animate.bind(this);
  }

  draw(context) {
    context.save();
    context.globalAlpha = this.alpha;

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.fillStyle = this.color;
    context.closePath();
    context.fill();

    context.restore();
  }

  animate(context) {
    const { dx, dy } = this.direction;

    this.x += dx * this.multiplier;
    this.y += dy * this.multiplier;

    this.frames += 1;
    this.multiplier *= 0.99;
    this.alpha -= 0.01;

    this.draw(context);
  }

  maxFramesReached() {
    return this.alpha <= 0.01;
  }
}

export default Particle;
