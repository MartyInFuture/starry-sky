import config from './config.json';

export function randomPosition() {
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
