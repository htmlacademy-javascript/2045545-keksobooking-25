const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');


const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
};

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
};


const createErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  });
  errorMessage.addEventListener('click', closeErrorMessage);
};

const createSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  });
  successMessage.addEventListener('click', closeSuccessMessage);
};


export {
  createErrorMessage,
  createSuccessMessage
};
