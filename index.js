import modelFactory from './src/services/modelFactory.js';

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };

const PLAYER_RADIUS = 30;
const MODEL_COLORS = {
  Player: '#00009e',
  Projectile: '#ffa500',
  Enemy: '#fff',
}

const ModelFactory = modelFactory(canvas);
const player = ModelFactory.createPlayer(canvasCenter, PLAYER_RADIUS, MODEL_COLORS.Player);
const projectiles = [];
const enemies = [];
let lastTimeEnemyAdded;

addEventListener('click', (event) => {

  const projectile = ModelFactory.createProjectile(
    { x: event.clientX, y: event.clientY }, 
    PLAYER_RADIUS / 5, 
    MODEL_COLORS.Projectile,
  );

  projectiles.push(projectile);
});

const engine = (timestamp) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  player.draw(context);

  projectiles.forEach(p => p.animate(context));
  enemies.forEach(e => e.animate(context));

  if(timestamp - lastTimeEnemyAdded > 1000 || lastTimeEnemyAdded === undefined)
  {
    enemies.push(ModelFactory.createEnemy(PLAYER_RADIUS / 1.5, MODEL_COLORS.Enemy));
    lastTimeEnemyAdded = timestamp;
  }

  requestAnimationFrame(engine);
}

requestAnimationFrame(engine);

