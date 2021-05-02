const validate = require('validate.js');

export const constraints = {
  firstname: {
    presence: true,
    format: {
      pattern: /^[a-zA-Zs\s]*$/,
      message: 'Sorry, invalid Characters',
    },
    length: { minimum: 2 },
  },
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
