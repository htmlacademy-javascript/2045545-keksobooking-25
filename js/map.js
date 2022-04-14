import {
  activateForm
} from './form.js';

import {
  renderAdvert
} from './popup.js';

const DEFAULT_LATITUDE =35.68173;
const DEFAULT_LONGITUDE =139.75393;
const MAP_SCALE =10;
const MAIN_PIN_SIZE= 52;
const COMMON_PIN_SIZE =40;


const form = document.querySelector('.ad-form');
const addressField = form.querySelector('#address');


const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE/2, MAIN_PIN_SIZE],
});

const mainPinMarker = L.marker({
  lat: DEFAULT_LATITUDE,
  lng: DEFAULT_LONGITUDE,
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
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  });
  map.setView({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  }, 10);
});


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [COMMON_PIN_SIZE, COMMON_PIN_SIZE],
  iconAnchor: [COMMON_PIN_SIZE/2, COMMON_PIN_SIZE],
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
    .bindPopup(renderAdvert(advert));

};

const clearMap =()=>{
  markerGroup.clearLayers();
};


export {
  createMarker, clearMap
};
