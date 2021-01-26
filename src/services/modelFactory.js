import Enemy from '../models/enemy.js';
import Player from '../models/player.js';
import Projectile from '../models/projectile.js'


const modelFactory = (canvas) => {
  const canvasInstance = canvas;
  const canvasCenter = { x: canvasInstance.width / 2, y: canvasInstance.height / 2 };

  const generateRandomCoords = () => {
    const side = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    let pos = 0;
  
    if(side % 2 === 0) {
      pos = Math.floor(Math.random() * (canvasInstance.width - 0 + 1) + 0);
    } else {
      pos = Math.floor(Math.random() * (canvasInstance.height - 0 + 1) + 0);
    }
  
    switch(side) {
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
  }
  
  const getDirectionFromPoints = (fromPoint, toPoint) => {
    const slope = Math.atan2(fromPoint.y - toPoint.y, fromPoint.x - toPoint.x);
  
    return {
      dx: Math.cos(slope),
      dy: Math.sin(slope),
    }
  }
  
  const createPlayer = (position, radius, color) => {
    return new Player(position.x, position.y, radius, color);
  }
  
  const createEnemy = (radius, color, enemyTarget=canvasCenter) => {
    const randomPosition = generateRandomCoords();
    const direction = getDirectionFromPoints(enemyTarget, randomPosition);
  
    return new Enemy(randomPosition.x, randomPosition.y, radius, color, direction);
  }
  
  const createProjectile = (target, radius, color, startingPosition=canvasCenter) => {
    const direction = getDirectionFromPoints(target, startingPosition);
  
    return new Projectile(startingPosition.x, startingPosition.y, radius, color, direction);
  }

  return {
    createPlayer: createPlayer,
    createProjectile: createProjectile,
    createEnemy: createEnemy,
  }
}



export default modelFactory;