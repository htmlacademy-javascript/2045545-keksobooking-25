const getRandomPositiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(digits);
};

let serialAvatarPicIndex = 1;
const createAvatarFullPath = () => {
  let avatarPicPath = 'img/avatars/user';
  if (serialAvatarPicIndex <= 9) {
    avatarPicPath += '/0';
  }
  const avatarFullPath = `${avatarPicPath}${serialAvatarPicIndex}.png`;
  serialAvatarPicIndex++;
  return avatarFullPath;
};


const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, (elements.length - 1))];

const getIncludedElementsIndexes = (arr) => {
  const includedElementsIndexes = [];
  includedElementsIndexes.length = getRandomPositiveInteger(1, arr.length);
  for (let i = 0; i < includedElementsIndexes.length; i++) {

    const n = getRandomPositiveInteger(0, (arr.length - 1));
    if (!includedElementsIndexes.includes(n)) {
      includedElementsIndexes[i] = n;

    } else {
      i--;
    }
  }
  return includedElementsIndexes;
};

const sortArrayToIncrease = (a, b) => {
  if (a > b) {
    return 1;
  } else if (b > a) {
    return -1;
  } else {
    return 0;
  }
};

const fillIncludedElementsArray = (arr) => {
  const sortedIncludedElementsIndexes = getIncludedElementsIndexes(arr).sort(sortArrayToIncrease);
  const elementsArray = [];
  for (let i = 0; i < sortedIncludedElementsIndexes.length; i++) {
    elementsArray.push(arr[sortedIncludedElementsIndexes[i]]);
  }

  return elementsArray;
};

const repeatStr = (str, n) => {
  let newStr = '';
  while (n-- > 0) {
    newStr += str;
  }
  return newStr;
};

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  createAvatarFullPath,
  getRandomArrayElement,
  fillIncludedElementsArray,
  repeatStr
};
