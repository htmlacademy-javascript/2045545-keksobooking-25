const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');


const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.removeEventListener('click', closeErrorMessage);
  errorMessage.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onEscClose);
  errorMessage.remove();
};

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  successMessage.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onEscClose);
  successMessage.remove();
};

function onEscClose(evt) {
  const errorMessage = document.querySelector('.error');
  const successMessage = document.querySelector('.success');
  if (evt.key === 'Escape') {
    if (document.body.contains(errorMessage)) {
      closeErrorMessage();
    }
    if (document.body.contains(successMessage)) {
      closeSuccessMessage();
    }
  }
}


const createErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  errorMessage.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEscClose);
};


const createSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  document.addEventListener('keydown', onEscClose);
  successMessage.addEventListener('click', closeSuccessMessage);
};


export {
  createErrorMessage,
  createSuccessMessage
};
