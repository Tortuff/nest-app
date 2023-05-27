import * as Joi from 'joi';

export const CreateCatSchema = Object.freeze(
  Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
  }),
);

export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}
