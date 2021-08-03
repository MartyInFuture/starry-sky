import './scss/main.scss';
import config from './config.json';

const canvas = document.querySelector('#canvas');
canvas.style.backgroundColor = '#111f28';

function randomPosition() {
  const position = {
    width: 0,
    height: 0,
  };
  position.width = parseInt(
    Math.random() * (document.documentElement.clientWidth - config.starRadius) + config.starRadius,
  );
  position.height = parseInt(
    Math.random() * (document.documentElement.clientHeight - config.starRadius) + config.starRadius,
  );
  return position;
}

function resizeCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}
resizeCanvas();

window.addEventListener('resize', resizeCanvas);
const circle = canvas.getContext('2d');
let isFirst = true;
const starsArr = [];
function createDots(amount = 10, obj = randomPosition()) {
  let color = config.starColor;
  if (isFirst) {
    obj.first = true;
    starsArr.push(obj);
    color = config.firstStarColor;
    isFirst = false;
  }
  if (amount === 1) {
    obj.last = true;
    starsArr.push(obj);
    color = config.lastStarColor;
  }
  if (amount === 0) return false;
  console.log(obj);
  circle.beginPath();
  circle.arc(obj.width, obj.height, 3, 0, Math.PI * 2);
  circle.fillStyle = color;
  circle.fill();

  createDots(--amount);
}

createDots();
console.log(starsArr);
