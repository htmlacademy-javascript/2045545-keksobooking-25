const SIMILAR_ADVERTS_COUNT = 10;
const OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const MIN_GUESTS_QTY = 1;
const MAX_GUESTS_QTY = 15;
const MIN_LAT = 0;
const MAX_LAT = 90;
const MIN_LNG = 0;
const MAX_LNG = 180;
const DECIMAL_PRECISION = 5;
const MIN_ROOMS_QTY = 1;
const MAX_ROOMS_QTY = 6;
const LOREM = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ipsum odit corrupti dolores fuga. Earum repellendus ducimus quaerat doloribus ut reiciendis placeat quos, saepe enim ipsa quis, recusandae officiis nihil.';
const includedFeatureIndex = [];

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


const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, (elements.length - 1))];
};

const getIncludedFeaturesIndex = () => {

  includedFeatureIndex.length = getRandomPositiveInteger(1, (FEATURES.length - 1));
  for (let i = 0; i < includedFeatureIndex.length; i++) {

    const n = getRandomPositiveInteger(0, (FEATURES.length - 1));
    if (!includedFeatureIndex.includes(n)) {
      includedFeatureIndex[i] = n;

    } else {
      i--;
    }
  }

  return includedFeatureIndex;
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

const fillIncludedFeaturesArray = () => {

  getIncludedFeaturesIndex().sort(sortArrayToIncrease);
  const featuresIncludedArray = [];
  for (let i = 0; i < includedFeatureIndex.length; i++) {
    featuresIncludedArray.push(FEATURES[includedFeatureIndex[i]]);
  }
  return featuresIncludedArray;

};

const repeatStr = (str, n) => {
  let newStr = '';
  while (n-- > 0) {
    newStr += str;
  }
  return newStr;
};


const createAdvert = () => {
  const latitude = getRandomPositiveFloat(MIN_LAT, MAX_LAT, DECIMAL_PRECISION);
  const longitude = getRandomPositiveFloat(MIN_LNG, MAX_LNG, DECIMAL_PRECISION);
  const rooms = getRandomPositiveInteger(MIN_ROOMS_QTY, MAX_ROOMS_QTY);
  const type = getRandomArrayElement(OFFERS_TYPES);
  return {
    author: {
      avatar: createAvatarFullPath(),
    },

    offer: {
      title: `${rooms}-rooms ${type}`,
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: type,
      rooms: rooms,
      guests: getRandomPositiveInteger(MIN_GUESTS_QTY, MAX_GUESTS_QTY),
      checkin: getRandomArrayElement(CHECKINS_CHECKOUTS),
      checkout: getRandomArrayElement(CHECKINS_CHECKOUTS),
      features: fillIncludedFeaturesArray(),
      description: repeatStr(LOREM, getRandomPositiveInteger(0, 10)),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },

  };

};

const similarAdverts = Array.from({
  length: SIMILAR_ADVERTS_COUNT
}, createAdvert);
