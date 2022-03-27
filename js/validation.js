import {
  getRussianTypeWord
} from './dictionary.js';

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle);


const priceField = form.querySelector('#price');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const validatePrice = () => {
  const type = form.querySelector('[name="type"]');
  const price = form.querySelector('#price');
  return price.value >= minPrice[type.value];
};

const getPriceErrorMessage = () => {
  const type = form.querySelector('[name="type"]');
  return `Не менее ${minPrice[type.value]} р/ночь при типе жилья "${getRussianTypeWord(type.value).toLowerCase()}"`;
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

function onTypeChange() {
  const type = form.querySelector('[name="type"]');
  priceField.placeholder = minPrice[type.value];
  pristine.validate(priceField);
}

form.querySelector('[name="type"]').addEventListener('change', onTypeChange);


const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');
const guestNumberOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const validateGuestNumber = () => guestNumberOptions[roomNumber.value].includes(guestNumber.value);


function getGuestNumberErrorMessage() {
  return `
  Для
    ${roomNumber.value} ${roomNumber.value==='1' ? 'комнаты': 'комнат'}
    количество гостей ${guestNumber.value}
    невозможно
  `;
}

function onRoomOrGuestChange() {
  getGuestNumberErrorMessage();
  pristine.validate(guestNumber);
  pristine.validate(roomNumber);
}

form.querySelector('#room_number').addEventListener('change', onRoomOrGuestChange);
form.querySelector('#room_number').addEventListener('focus', onRoomOrGuestChange);
form.querySelector('#capacity').addEventListener('change', onRoomOrGuestChange);
form.querySelector('#room_number').addEventListener('focus', onRoomOrGuestChange);


pristine.addValidator(roomNumber, validateGuestNumber, getGuestNumberErrorMessage);
pristine.addValidator(guestNumber, validateGuestNumber, getGuestNumberErrorMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
