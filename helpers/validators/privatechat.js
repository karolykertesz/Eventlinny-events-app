const validate = require("validate.js");

export const constraints = {
  room: {
    presence: true,
    format: {
      pattern: "[^<>{}()]+",
      message: "Sorry, invalid Characters",
    },
  },
  password: {
    presence: true,
    length: { minimum: 5 },
    format: {
      pattern: "[^<>{}()]+",
      message: "Sorry, invalid Characters",
    },
  },
};
