// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Min и max не должны быть меньше 0, min должен быть меньше max');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomInt(5, 17);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomFloat = (min, max, decimals) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Min и max не должны быть меньше 0, min должен быть меньше max');
  }

  return (Number((Math.random() * (max - min) + min).toFixed(decimals)));
}
getRandomFloat(2, 3, 5);
