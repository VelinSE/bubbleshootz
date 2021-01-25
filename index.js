import Player from './src/player.js';
import Projectile from './src/projectile.js'

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2, canvas.height / 2, 30, 'blue');
player.draw(context);

addEventListener('click', (event) => {
  const { clientY, clientX } = event;
  const slope = Math.atan2(clientY - player.y, clientX - player.x);

  const velocity = {
    x: Math.cos(slope),
    y: Math.sin(slope),
  }

  const projectile = new Projectile(player.x, player.y, 5, 'red', velocity);
  projectile.animate(context);
});

