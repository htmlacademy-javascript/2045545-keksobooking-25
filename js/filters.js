const checkByType =(adverts)=> {
  const housingType=document.querySelector('#housing-type');
  const advertsCopy=adverts.slice();
  if (housingType.value !=='any') {
    const advertsCopyFiltered= advertsCopy.filter((advert) =>(advert.offer.type===housingType.value ));
    return advertsCopyFiltered;
  }
  else {
    return advertsCopy;
  }
};

const checkPriceLevel =(advert, chosenLevel)=> {
  let level ='any';
  if  (advert.offer.price > 0 && advert.offer.price <10000  ){
    level ='low';
  }
  else if (advert.offer.price > 10000 && advert.offer.price < 50000){
    level ='middle';
  }
  else if (advert.offer.price >= 50000 ) {
    level ='high';
  }
  return level===chosenLevel;
};

const checkByPrice =(adverts)=>{
  const housingPrice=document.querySelector('#housing-price');
  const advertsCopy=adverts.slice();
  if (housingPrice.value !=='any') {
    const chosenLevel=housingPrice.value;
    const advertsCopyFiltered= advertsCopy.filter((advert)=>checkPriceLevel(advert, chosenLevel));

    return advertsCopyFiltered;

  }
  else {
    return advertsCopy;
  }
};


const checkByRooms =(adverts)=> {
  const housingRooms=document.querySelector('#housing-rooms');
  const advertsCopy=adverts.slice();
  if (housingRooms.value !=='any') {
    const advertsCopyFiltered= advertsCopy.filter((advert) =>(advert.offer.rooms.toString()===housingRooms.value ));
    return advertsCopyFiltered;
  }
  else {
    return advertsCopy;
  }
};


const checkByGuests =(adverts)=> {
  const housingGuests=document.querySelector('#housing-guests');
  const advertsCopy=adverts.slice();
  if (housingGuests.value !=='any') {
    const advertsCopyFiltered= advertsCopy.filter((advert) =>(advert.offer.guests.toString()===housingGuests.value ));
    return advertsCopyFiltered;
  }
  else {
    return advertsCopy;
  }
};

const checkingFeature =(advert, feature)=>{
  if (advert.offer.features) {
    return advert.offer.features.includes(feature);
  }
  return false;
};


const checkByWifi=(adverts)=> {
  const wifi=document.querySelector('input[id=filter-wifi]');
  const advertsCopy=adverts.slice();
  if (wifi.checked) {
    const advertsCopyFiltered= advertsCopy.filter((advert) =>checkingFeature(advert, 'wifi'));
    return advertsCopyFiltered;
  }
  else {
    return advertsCopy;
  }
};


const checkByDishwasher=(adverts)=> {
  const dishwasher=document.querySelector('input[id=filter-dishwasher]');
  const advertsCopy=adverts.slice();
  if (dishwasher.checked) {
    const advertsCopyFiltered= advertsCopy.filter((advert) =>checkingFeature(advert, 'dishwasher'));
    return advertsCopyFiltered;
  }
  else {
    return advertsCopy;
  }
};


const checkByFeature =(adverts, feature)=>{
  const filter=document.querySelector(`input[id=filter-${feature}`);
  const advertsCopy=adverts.slice();
  if (filter.checked) {
    const advertsCopyFiltered= advertsCopy.filter((advert) =>checkingFeature(advert, feature));
    return advertsCopyFiltered;
  }
  else {
    return advertsCopy;
  }

};


const compareAdverts = (advertA, advertB) => {
  let rankA=0;
  let rankB=0;
  if (advertA.offer.features && advertB.offer.features) {
    rankA = advertA.offer.features.length;
    rankB = advertB.offer.features.length;
  }
  else if (!advertA.offer.features){
    rankA =0;
  }
  else  if (!advertB.offer.features) {
    rankB =0;
  }
  return rankB - rankA;
};

const setFilter =(cb) => {
  const filterForm=document.querySelector('.map__filters');
  filterForm.addEventListener('change', cb);
};


export {setFilter, checkByType, checkByPrice, checkByRooms, checkByGuests, checkByWifi, checkByDishwasher, checkByFeature, compareAdverts};
