import haveCollided from './src/services/collisionDetector.js';
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
let frameStamp;
let animationId;

addEventListener('click', (event) => {

  const projectile = ModelFactory.createProjectile(
    { x: event.clientX, y: event.clientY }, 
    PLAYER_RADIUS / 5, 
    MODEL_COLORS.Projectile,
  );

  projectiles.push(projectile);
});

const drawModels = () => {
  player.draw(context);

  projectiles.slice().forEach((p, index) => {
    if(p.isWithinBounds(canvas.width, canvas.height)) {
      p.animate(context);
    } else {
      projectiles.splice(index, 1);
    }
  });

  console.log(projectiles.length);

  enemies.forEach(e => e.animate(context));
}

const collisionDetection = () => {
  return enemies.slice().some((e, eIndex) => {
    if(haveCollided(e, player)) {
      return true;
    }

    projectiles.slice().forEach((p, pIndex) => {
      if(haveCollided(p, e)) {
        projectiles.splice(pIndex, 1);
        enemies.splice(eIndex, 1);
      }
    });

    return false;
  });
}

const engine = (timestamp) => {
  animationId = requestAnimationFrame(engine);

  context.clearRect(0, 0, canvas.width, canvas.height);
  
  if(collisionDetection()) {
    cancelAnimationFrame(animationId);
  }

  drawModels();

  if(timestamp - lastTimeEnemyAdded > 1000 || lastTimeEnemyAdded === undefined)
  {
    enemies.push(ModelFactory.createEnemy(PLAYER_RADIUS / 1.5, MODEL_COLORS.Enemy));
    lastTimeEnemyAdded = timestamp;
  }
}

animationId = requestAnimationFrame(engine);

