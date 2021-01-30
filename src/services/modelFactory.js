import Enemy from '../models/enemy.js';
import Particle from '../models/particle.js';
import Player from '../models/player.js';
import Projectile from '../models/projectile.js';

const modelFactory = (canvas) => {
  const canvasInstance = canvas;
  const canvasCenter = { x: canvasInstance.width / 2, y: canvasInstance.height / 2 };

  const generateRandomStartingCoords = () => {
    const side = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    let pos = 0;

    if (side % 2 === 0) {
      pos = Math.floor(Math.random() * (canvasInstance.width - 0 + 1) + 0);
    } else {
      pos = Math.floor(Math.random() * (canvasInstance.height - 0 + 1) + 0);
    }

    switch (side) {
      case 0:
        return { x: pos, y: 0 };
      case 1:
        return { x: canvasInstance.width, y: pos };
      case 2:
        return { x: pos, y: canvasInstance.height };
      case 3:
        return { x: 0, y: pos };
      default:
        return { x: 0, y: 0 };
    }
  };

  const getDirectionFromPoints = (fromPoint, toPoint) => {
    const slope = Math.atan2(fromPoint.y - toPoint.y, fromPoint.x - toPoint.x);

    return {
      dx: Math.cos(slope),
      dy: Math.sin(slope),
    };
  };

  const getRandomDirection = () => {
    const slope = Math.random() * (Math.PI + Math.PI + 1) - Math.PI;

    return {
      dx: Math.cos(slope),
      dy: Math.sin(slope),
    };
  };

  // eslint-disable-next-line max-len
  const createPlayer = (position, radius, color) => new Player(position.x, position.y, radius, color);

  const createEnemy = (radius, color, enemyTarget = canvasCenter) => {
    const randomPosition = generateRandomStartingCoords();
    const direction = getDirectionFromPoints(enemyTarget, randomPosition);

    return new Enemy(randomPosition.x, randomPosition.y, radius, color, direction);
  };

  const createProjectile = (target, radius, color, startingPosition = canvasCenter) => {
    const direction = getDirectionFromPoints(target, startingPosition);

    return new Projectile(startingPosition.x, startingPosition.y, radius, color, direction);
  };

  const createParticle = (radius, color, startingPosition, enemyRadius) => {
    const randomDirection = getRandomDirection();
    const randomRadius = Math.random() * (radius - 0.2 + 1) + 0.2;

    return new Particle(
      startingPosition.x,
      startingPosition.y,
      randomRadius,
      color,
      randomDirection,
      enemyRadius,
    );
  };

  return {
    createPlayer,
    createProjectile,
    createEnemy,
    createParticle,
  };
};

export default modelFactory;
