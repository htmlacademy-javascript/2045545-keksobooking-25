import {
  createAdverts
} from './data.js';
import {
  adjustWordForRooms,
  adjustWordForGuests,
} from './dictionary.js';


const cardList = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const cardsElements = createAdverts();

const cardsElementsFragment = document.createDocumentFragment();

cardsElements.forEach(({
  author,
  offer
}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offer.type;

  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${adjustWordForRooms(offer.rooms)} для ${offer.guests} ${adjustWordForGuests(offer.guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = offer.features;
  if (offer.description !== '') {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }
  const photos = offer.photos;
  const advertPhotos = cardElement.querySelector('.popup__photo');
  const advertPhotoList = cardElement.querySelector('.popup__photos');
  cardElement.querySelector('.popup__photo').remove();
  for (const photo of photos) {
    const advertPhoto = advertPhotos.cloneNode(false);
    advertPhoto.src = photo;
    advertPhotoList.appendChild(advertPhoto);
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardsElementsFragment.appendChild(cardElement);
});

const firstAdvertOnly = cardsElementsFragment.querySelector('.popup');
cardList.appendChild(firstAdvertOnly);
