const adjustWordForRooms = (quantity) => {
  let wordForRooms = 'комнат';
  if (quantity === 1) {
    wordForRooms += 'а';
  } else if (quantity > 1 && quantity < 5) {
    wordForRooms += 'ы';
  }
  return wordForRooms;
};

const adjustWordForGuests = (quantity) => {
  let wordForGuests = 'гостей';
  if (quantity === 1) {
    wordForGuests = 'гостя';
  }
  return wordForGuests;
};

const getRussianTypeWord = (word) => {
  let result;
  switch (word) {
    case 'flat':
      result = 'Квартира';
      break;
    case 'bungalow':
      result = 'Бунгало';
      break;
    case 'house':
      result = 'Дом';
      break;
    case 'palace':
      result = 'Дворец';
      break;
    case 'hotel':
      result = 'Отель';
      break;
  }
  return result;
};

const getRussianWordEnding = (word) => {
  let result = '';
  switch (word) {
    case 'flat':
      result = 'ая';
      break;
    case 'bungalow':
      result = 'ое';
      break;
    case 'house':
    case 'palace':
    case 'hotel':
      result = 'ый';
      break;
  }
  return result;
};

export {
  adjustWordForRooms,
  adjustWordForGuests,
  getRussianTypeWord,
  getRussianWordEnding
};
