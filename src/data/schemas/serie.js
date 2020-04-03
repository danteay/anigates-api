import Joi from '@hapi/joi';
import typeList from './../catalogs/types';
import categoryList from './../catalogs/categories';

const name = Joi.string().label('Name');
const url = Joi.string().uri({scheme: [/https?/]}).label('URL');
const image = Joi.string().uri({scheme: [/https?/]}).label('Image');
const episodes = Joi.number().greater(0).integer().label('Episodes');
const duration = Joi.number().greater(0).integer().label('duration');
const score = Joi.number().greater(0).less(11).integer().label('Score');
const type = Joi.string().valid(...typeList);

const categories = Joi.array().items(...categoryList.map((value, index) => {
  return Joi.string().valid(value);
}));

export const createSerieScheme = Joi.object({
  name: name.required(),
  url,
  image,
  episodes: episodes.required(),
  duration: duration.required(),
  score: score.required(),
  type: type.required(),
  categories: categories.required(),
});