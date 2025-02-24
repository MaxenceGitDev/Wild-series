import type { RequestHandler } from "express";
import Joi from "joi";

const programSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.min": "le nom d'utilisateur doit contenir minimum 3 caractères",
    "any.required": "titre requis",
  }),
  synopsis: Joi.string().min(25).messages({
    "string.min": "Le synopsis doit contenir au moins 25 caractères",
  }),
  poster: Joi.string().uri().messages({
    "string.uri": "Le poster doit être une URL valide",
  }),
  country: Joi.string().min(4).required().messages({
    "string.min": "Le pays doit contenir au moins 4 caractères",
    "any.required": "Le pays est requis",
  }),
  year: Joi.string().max(4).required(),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = programSchema.validate(req.body);

  if (error == null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

export default { validate };
