import Enemy from './src/enemy.js';
import Player from './src/player.js';
import Projectile from './src/projectile.js'

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2, canvas.height / 2, 30, '#00009e');
const projectiles = [];
const enemies = [];
let lastTimeEnemyAdded;

const generateRandomCoords = () => {
  const side = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  console.log(side);
  let pos = 0;

  if(side % 2 === 0) {
    pos = Math.floor(Math.random() * (canvas.width - 0 + 1) + 0);
  } else {
    pos = Math.floor(Math.random() * (canvas.height - 0 + 1) + 0);
  }

  switch(side) {
    case 0:
      return { x: pos, y: 0 };
    case 1:
      return { x: canvas.width, y: pos };
    case 2:
      return { x: pos, y: canvas.height };
    case 3:
      return { x: 0, y: pos };
    default:
      return { x: 0, y: 0 };
  }
}

const getDirectionFromPoints = (fromPoint, toPoint) => {
  const slope = Math.atan2(fromPoint.y - toPoint.y, fromPoint.x - toPoint.x);

  return {
    dx: Math.cos(slope),
    dy: Math.sin(slope),
  }
}

const generateEnemy = () => {
  const randomPosition = generateRandomCoords();
  const direction = getDirectionFromPoints(player,randomPosition);

  return new Enemy(randomPosition.x, randomPosition.y, 20, '#fff', direction);
}

addEventListener('click', (event) => {
  const direction = getDirectionFromPoints({ x: event.clientX, y: event.clientY }, player);

  const projectile = new Projectile(player.x, player.y, 5, '#ffa500', direction);
  projectiles.push(projectile);
});

const engine = (timestamp) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  player.draw(context);

  projectiles.forEach(p => p.animate(context));
  enemies.forEach(e => e.animate(context));

  if(timestamp - lastTimeEnemyAdded > 1000 || lastTimeEnemyAdded === undefined)
  {
    enemies.push(generateEnemy());
    lastTimeEnemyAdded = timestamp;
  }

  requestAnimationFrame(engine);
}

requestAnimationFrame(engine);

