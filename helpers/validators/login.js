const validate = require('validate.js');

export const constraints = {
  email: {
    presence: true,
    email: true,
    format: {
      pattern: '[^<>{}()]+',
      message: 'Sorry, invalid Characters',
    },
  },
  password: {
    presence: true,
    format: {
      pattern: '[^<>{}()]+',
      message: 'Sorry, invalid Characters',
    },
  },
};
