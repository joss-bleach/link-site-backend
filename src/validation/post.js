import Validator from 'validator';

import isEmpty from './is-empty';

const validatePostInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.url = !isEmpty(data.url) ? data.url : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Please enter a title.';
  }
  if (Validator.isEmpty(data.url)) {
    errors.url = 'Please enter a URL.';
  }
  if (!Validator.isURL(data.url)) {
    errors.url = 'Please enter a valid URL.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validatePostInput;
