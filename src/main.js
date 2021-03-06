const loop = require('./loop')
const rand = require('./rand')
const key = require('./key')

const canvas = document.createElement('canvas')
canvas.width = 640
canvas.height = 480
canvas.style.backgroundColor = '#000'
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

// demo entity
const mob = {
  x: rand.int(canvas.width),
  y: rand.int(canvas.height),
  width: 25,
  height: 25,
  speed: 150,
  color: 'rgba(236, 94, 103, 1)'
}

var img = new Image();   // Create new img element
//img.addEventListener('load', function() {
  
//}, false);
img.src = '../img/avatar.jpg'; // Set source path

// game loop
loop.start(function (dt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // update mob
  if (key.isDown(key.A)) {
    mob.x = mob.x - (mob.speed * dt);
  }
  if (key.isDown(key.D)) {
    mob.x = mob.x + (mob.speed * dt);
  }
  if (key.isDown(key.W)) {
    mob.y = mob.y - (mob.speed * dt);
  }
  if (key.isDown(key.S)) {
    mob.y = mob.y + (mob.speed * dt);
  }

  // check bounds collisions
  if (mob.x < 0) {
    mob.x = canvas.width;
  } else if (mob.x > canvas.width) {
    mob.x = 0;
  }
  if (mob.y < 0) {
    mob.y = canvas.height;
  } else if (mob.y > canvas.height) {
    mob.y = 0;
  }

  // draw mob
  ctx.fillStyle = mob.color;
  ctx.fillRect(mob.x, mob.y, mob.width, mob.height);

  ctx.drawImage(img, mob.x, mob.y);

  console.log('game update fn %s', dt)
})
