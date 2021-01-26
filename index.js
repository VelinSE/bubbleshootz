import Player from './src/player.js';
import Projectile from './src/projectile.js'

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2, canvas.height / 2, 30, '#00009e');
const projectiles = [];

addEventListener('click', (event) => {
  const { clientY, clientX } = event;
  const slope = Math.atan2(clientY - player.y, clientX - player.x);

  const velocity = {
    x: Math.cos(slope),
    y: Math.sin(slope),
  }

  const projectile = new Projectile(player.x, player.y, 5, '#ffa500', velocity);
  projectiles.push(projectile);
});

const engine = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  player.draw(context);

  projectiles.forEach(p => p.animate(context));

  requestAnimationFrame(engine);
}

requestAnimationFrame(engine);

