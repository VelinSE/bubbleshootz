import haveCollided from './src/services/collisionDetector.js';
import modelFactory from './src/services/modelFactory.js';
import scoreCounter from './src/services/scoreCounter.js';

const main = () => {
  const canvas = document.querySelector('#main');
  const context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };

  const PLAYER_RADIUS = 15;
  const MODEL_COLORS = {
    Player: '#fff',
    Projectile: '#ffa500',
    Enemy: () => `hsl(${Math.random() * 360}, 50%, 50%)`,
  };

  const ModelFactory = modelFactory(canvas);
  const ScoreCounter = scoreCounter();
  const player = ModelFactory.createPlayer(canvasCenter, PLAYER_RADIUS, MODEL_COLORS.Player);
  let projectiles = [];
  let enemies = [];
  let particles = [];
  let lastTimeEnemyAdded;
  // let frameStamp;
  let animationId;

  const drawModels = () => {
    player.draw(context);

    projectiles.slice().forEach((p, index) => {
      if (p.isWithinBounds(canvas.width, canvas.height)) {
        p.animate(context);
      } else {
        projectiles.splice(index, 1);
      }
    });

    particles.slice().forEach((pt, index) => {
      if (pt.maxFramesReached()) {
        particles.splice(index, 1);
      } else {
        pt.animate(context);
      }
    });

    enemies.forEach((e) => e.animate(context));
  };

  const killEnemy = (enemy, enemyIndex) => {
    const nParticles = Math.random() * (50 - 20 + 1) + 10;
    for (let i = 0; i < nParticles; i += 1) {
      particles.push(
        ModelFactory.createParticle(
          PLAYER_RADIUS / 6,
          enemy.color,
          { x: enemy.x, y: enemy.y },
          enemy.initialRadius,
        ),
      );
    }
    enemies.splice(enemyIndex, 1);
    ScoreCounter.updateScore(10);
  };

  const collisionDetection = () => enemies.slice().some((e, eIndex) => {
    if (haveCollided(e, player)) {
      return true;
    }

    projectiles.slice().forEach((p, pIndex) => {
      if (haveCollided(p, e)) {
        projectiles.splice(pIndex, 1);

        if (e.onHit(p.radius * 2) <= 7) {
          killEnemy(e, eIndex);
        }
      }
    });

    return false;
  });

  const enemyGenerator = (timestamp) => {
    if (timestamp - lastTimeEnemyAdded > 1000 || lastTimeEnemyAdded === undefined) {
      const randomRadius = Math.random() * (PLAYER_RADIUS + 1) + PLAYER_RADIUS;

      enemies.push(ModelFactory.createEnemy(
        randomRadius,
        MODEL_COLORS.Enemy(),
      ));
      lastTimeEnemyAdded = timestamp;
    }
  };

  const shootProjectile = (event) => {
    const projectile = ModelFactory.createProjectile(
      { x: event.clientX, y: event.clientY },
      PLAYER_RADIUS / 3,
      MODEL_COLORS.Projectile,
    );

    projectiles.push(projectile);
  };

  const attachGameControls = () => {
    window.addEventListener('click', shootProjectile);
  };

  const detachGameControls = () => {
    window.removeEventListener('click', shootProjectile);
  };

  const startGame = () => {
    projectiles = [];
    enemies = [];
    particles = [];

    ScoreCounter.updateScore(0);
  };

  const endGame = () => {
    ScoreCounter.showModal();
    cancelAnimationFrame(animationId);
    detachGameControls();
  };

  const engine = (timestamp) => {
    animationId = requestAnimationFrame(engine);

    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (collisionDetection()) {
      endGame();
    }

    drawModels();
    enemyGenerator(timestamp);
  };

  const startButton = document.querySelector('#start_button');

  startButton.addEventListener('click', (event) => {
    event.stopPropagation();

    ScoreCounter.hideModal();
    startGame();
    attachGameControls();

    animationId = requestAnimationFrame(engine);
  });
};

main();
