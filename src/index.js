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
    obj.position = 'first';
    color = config.firstStarColor;
    isFirst = false;
  }
  if (amount === 1) {
    obj.position = 'last';

    color = config.lastStarColor;
  }
  if (amount === 0) return false;
  // console.log(obj);
  circle.beginPath();
  circle.arc(obj.width, obj.height, 3, 0, Math.PI * 2);
  circle.fillStyle = color;
  circle.fill();

  obj.average = parseInt((obj.height + obj.width) / 2);
  obj.isUsed = false;
  starsArr.push(obj);

  createDots(--amount);
}

createDots();
const lines = canvas.getContext('2d');
lines.beginPath();
function createLines(starsArr) {
  const newArr = [...starsArr];
  const shortestWayArr = [newArr[0]];

  const newCoordinate = now => {
    if (now === undefined) return false;
    console.log(newArr.indexOf(now));
    now.isUsed = true;
    let some = 9999;
    let obj = {};
    for (let i = 0; i < starsArr.length - 1; i++) {
      if (
        Math.abs(now.average - newArr[i].average) < some &&
        !newArr[i].isUsed &&
        i != starsArr.length - 1
      ) {
        some = Math.abs(now.average - newArr[i].average);
        obj = newArr[i];
      }
    }
    console.log(some);
    if (obj.width != undefined) shortestWayArr.push(obj);
    newCoordinate(newArr[newArr.indexOf(obj)]);
  };
  newCoordinate(newArr[0]);
  shortestWayArr.push(newArr[newArr.length - 1]);
  for (let i = 0; i < shortestWayArr.length - 1; i++) {
    lines.moveTo(shortestWayArr[i].width, shortestWayArr[i].height);
    lines.lineTo(shortestWayArr[i + 1].width, shortestWayArr[i + 1].height);
    lines.stroke();
  }
  console.log(newArr);
  console.log(shortestWayArr);
}

createLines(starsArr);
