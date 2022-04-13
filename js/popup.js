import {
  adjustWordForRooms,
  adjustWordForGuests,
  getRussianTypeWord
} from './dictionary.js';
import { clearMap} from './map.js';
import {completelyFilter, compareAdverts} from './filters.js';

const MAX_ADVERTS_QUANTITY = 10;

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderAdvert = ({
  author,
  offer
}) => {
  const advertElement = advertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = getRussianTypeWord(offer.type);

  advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${adjustWordForRooms(offer.rooms)} для ${offer.guests} ${adjustWordForGuests(offer.guests)}`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;


  const featuresContainer = advertElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  if (offer.features) {
    const advertFeatures = offer.features.slice();
    featuresList.forEach((featuresListItem) => {
      const isNecessary = advertFeatures.some(
        (advertFeature) => featuresListItem.classList.contains(`popup__feature--${advertFeature}`),
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
    if (!featuresContainer.children.length) {
      featuresContainer.remove();
    }
  } else {
    featuresContainer.remove();
  }


  if (offer.description !== '') {
    advertElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    advertElement.querySelector('.popup__description').classList.add('hidden');
  }


  const advertPhotos = advertElement.querySelector('.popup__photo');
  const advertPhotoList = advertElement.querySelector('.popup__photos');
  if (offer.photos) {
    const photos = offer.photos;
    advertElement.querySelector('.popup__photo').remove();
    for (const photo of photos) {
      const advertPhoto = advertPhotos.cloneNode(false);
      advertPhoto.src = photo;
      advertPhotoList.appendChild(advertPhoto);
    }
  } else {
    advertPhotos.remove();
  }

  advertElement.querySelector('.popup__avatar').src = author.avatar;

  return advertElement;
};


const renderFilteredAdverts =(adverts,  cb)=>{
  clearMap();
  const filteredAdverts = completelyFilter(adverts);
  const sortedAdverts=filteredAdverts.sort(compareAdverts);
  const maxQtyAdverts = sortedAdverts.slice(0, MAX_ADVERTS_QUANTITY);
  maxQtyAdverts.forEach((advert) => {
    cb(advert);
  });
};

export {
  renderAdvert,
  renderFilteredAdverts
};
