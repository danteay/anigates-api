import Joi from '@hapi/joi';

const email = Joi.string().email().required().label('Email');
const name = Joi.string().alphanum().min(4).max(250).required().label('Name');
const password = Joi.string().alphanum().min(8).required().label('Password');

export const singUp = Joi.object({
  email,
  name,
  password,
});

export const singIn = Joi.object({
  email,
  password,
});
