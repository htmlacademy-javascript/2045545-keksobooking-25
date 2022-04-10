import {
  sendData
} from './api.js';
import {
  getRussianTypeWord
} from './dictionary.js';
import {
  closePopup,
} from './utils.js';
import {
  createErrorMessage,
  createSuccessMessage
} from './messages.js';


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

const onTypeChange = () => {
  const type = form.querySelector('[name="type"]');
  priceField.placeholder = minPrice[type.value];
  pristine.validate(priceField);
};

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


const getGuestNumberErrorMessage = () => `Для ${roomNumber.value} ${roomNumber.value==='1' ? 'комнаты': 'комнат'} количество гостей ${guestNumber.value} невозможно`;


const onRoomOrGuestChange = () => {
  getGuestNumberErrorMessage();
  pristine.validate(guestNumber);
  pristine.validate(roomNumber);
};

roomNumber.addEventListener('change', onRoomOrGuestChange);
roomNumber.addEventListener('focus', onRoomOrGuestChange);
guestNumber.addEventListener('change', onRoomOrGuestChange);
guestNumber.addEventListener('focus', onRoomOrGuestChange);


pristine.addValidator(roomNumber, validateGuestNumber, getGuestNumberErrorMessage);
pristine.addValidator(guestNumber, validateGuestNumber, getGuestNumberErrorMessage);


const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');

const validateTimeinTimeout = () => timein.value === timeout.value;
const onTimeinTimeoutChangeSynchronize = (evt) => {
  if (evt.target === timein) {
    timeout.value = timein.value;
  } else {
    timein.value = timeout.value;
  }
};

pristine.addValidator(timein, validateTimeinTimeout);
pristine.addValidator(timeout, validateTimeinTimeout);

timein.addEventListener('change', onTimeinTimeoutChangeSynchronize);
timeout.addEventListener('change', onTimeinTimeoutChangeSynchronize);

const submitButton = form.querySelector('.ad-form__submit');


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          createSuccessMessage();
          form.reset();
          closePopup();
        },
        () => {
          // showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          createErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {
  setUserFormSubmit
};
