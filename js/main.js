// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);

}

getRandomInt(5, 17);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomFloat(min, max, decimals) {
  return ((Math.random() * (max - min) + min).toFixed(decimals));
}

getRandomFloat(2, 3, 5);
