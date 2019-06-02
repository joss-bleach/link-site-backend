import Validator from 'validator';

import isEmpty from './is-empty';

const validateRegistrationInput = data => {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.username, { min: 5, max: 30 })) {
    errors.name = 'Username must be between 5 and 30 characters long.';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Please enter a username.';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please enter a password.';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters long.';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Please confirm your password.';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Your passwords do not match.';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegistrationInput;
