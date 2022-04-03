const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formElements = form.querySelectorAll('.ad-form__element input,  .ad-form__element select, .ad-form__element textarea');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filters  select, .map__features');

const disableElements = (elements) => {
  for (const element of elements) {
    element.disabled = true;
  }
};

const enableElements = (elements) => {
  for (const element of elements) {
    element.disabled = false;
  }
};


const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  disableElements(formElements);
  disableElements(mapFiltersElements);
};


const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  enableElements(formElements);
  enableElements(mapFiltersElements);
};


export {
  deactivateForm,
  activateForm
};
