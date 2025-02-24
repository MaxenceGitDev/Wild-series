//Import access to data
import categoryRepository from "./categoryRepository";

// Some data to make the trick

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

//Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const categoriesFromDB = await categoryRepository.read(1);

    res.json(categoriesFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.read(categoryId);

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const category = {
      id: Number(req.params.id),
      name: req.body.name,
    };
    const affectedRows = await categoryRepository.update(category);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = {
      name: req.body.name,
    };

    const insertId = await categoryRepository.create(newCategory);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);

    await categoryRepository.delete(categoryId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Export them to import them somewhere else

export default { browse, read, add, edit, destroy };
