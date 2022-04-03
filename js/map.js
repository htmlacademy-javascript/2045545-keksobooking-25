import {
  activateForm
} from './form.js';

import {
  renderPopup
} from './popup.js';


const form = document.querySelector('.ad-form');
const addressField = form.querySelector('#address');


const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.68173,
    lng: 139.75393,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: 35.681729,
  lng: 139.753927,
}, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);


mainPinMarker.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});


form.addEventListener('reset', () => {
  mainPinMarker.setLatLng({
    lat: 35.68173,
    lng: 139.75393,
  });
  map.setView({
    lat: 35.68173,
    lng: 139.75393,
  }, 10);
});


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const markerGroup = L.layerGroup().addTo(map);
const createMarker = (advert) => {
  const marker = L.marker({
    lat: advert.location.lat,
    lng: advert.location.lng,
  }, {
    icon,
  }, );

  marker
    .addTo(markerGroup)
    .bindPopup(renderPopup(advert));

};


export {
  createMarker
};
