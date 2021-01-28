const haveCollided = (collider, collidee) => {
  const distance = Math.hypot(collider.x - collidee.x, collider.y - collidee.y);
  if (distance - collider.radius - collidee.radius < 1) {
    return true;
  }

  return false;
};

export default haveCollided;
