// const Default = {
//   HOUSING_TYPE: 'flat',
//   HOUSING_PRICE: 'middle',
// };


const getAdvertRank = (advert) => {
  const housingType=document.querySelector('#housing-type');
  let rank = 0;
  if (advert.offer.type ===housingType.value) {
    rank += 2;
  }
  return rank;
};


const compareAdverts = (advertA, advertB) => {
  const rankA = getAdvertRank(advertA);
  const rankB = getAdvertRank(advertB);
  return rankB - rankA;
};


const setHousingType=(cb)=>{
  const housingType=document.querySelector('#housing-type');
  housingType.addEventListener('change', cb);

};


export {compareAdverts, setHousingType};
