import './scss/main.scss';
import config from './config.json';
import { randomPosition } from './functions';

const createCanvas = () => {
  const canvas = document.querySelector('#canvas');
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  const background = canvas.getContext('2d');

  const gradient = background.createLinearGradient(
    document.documentElement.clientWidth / 2,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth / 2,
    0,
  );
  gradient.addColorStop(0, '#15286C');
  gradient.addColorStop(1, '#000316');

  background.fillStyle = gradient;
  background.fillRect(
    0,
    0,
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  );
};

createCanvas();

function resizeCanvas() {
  createCanvas();
}

window.addEventListener('resize', resizeCanvas);

const star = canvas.getContext('2d');
star.strokeStyle = '#red';
star.stroke();
const starsArr = [];
let isFirst = true;

const createDots = (amount = 10, obj = randomPosition()) => {
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
  star.beginPath();
  star.arc(obj.width, obj.height, config.starRadius, 0, Math.PI * 2);
  star.fillStyle = color;
  star.fill();

  obj.isUsed = false;
  starsArr.push(obj);

  createDots(--amount);
};

createDots(config.star_amount);

const createCoordinateArr = starsArr => {
  const newArr = [...starsArr];
  const shortestWayArr = [newArr[0]];
  console.log(newArr);

  const newCoordinate = now => {
    if (now === undefined) return false;
    now.isUsed = true;
    let some = Math.sqrt(
      Math.pow(document.documentElement.clientWidth, 2) +
        Math.pow(document.documentElement.clientHeight, 2),
    );
    let obj = {};

    for (let i = 0; i < starsArr.length - 1; i++) {
      const hypotenuse = Math.sqrt(
        Math.pow(now.width - newArr[i].width, 2) + Math.pow(now.height - newArr[i].height, 2),
      );
      if (hypotenuse < some && !newArr[i].isUsed && i != starsArr.length - 1) {
        some = hypotenuse;
        obj = newArr[i];
      }
    }
    if (obj.width != undefined) shortestWayArr.push(obj);
    newCoordinate(newArr[newArr.indexOf(obj)]);
  };
  newCoordinate(newArr[0]);

  shortestWayArr.push(newArr[newArr.length - 1]);

  createLines(shortestWayArr);
};

const createLines = shortestWayArr => {
  const lines = canvas.getContext('2d');
  lines.setLineDash([7, 7]);
  lines.lineJoin = 'round';
  lines.strokeStyle = config.dotted_line;
  lines.beginPath();
  lines.moveTo(shortestWayArr[0].width, shortestWayArr[0].height);
  for (let i = 0; i < shortestWayArr.length - 1; i++) {
    lines.lineTo(shortestWayArr[i + 1].width, shortestWayArr[i + 1].height);
    lines.stroke();
  }
};
createCoordinateArr(starsArr);
