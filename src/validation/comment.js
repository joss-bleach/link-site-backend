import Validator from 'validator';

import isEmpty from './is-empty';

const validateCommentInput = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Please enter a comment.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateCommentInput;
