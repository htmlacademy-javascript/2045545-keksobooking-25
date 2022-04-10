const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const form = document.querySelector('.ad-form');
const type = form.querySelector('[name="type"]');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => value
  }

});


sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

type.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceField.placeholder);
  priceField.value = '';
});
