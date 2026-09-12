import {
  getAllAuthors as getAllAuthorsModel,
  getAuthorById as getAuthorByIdModel,
  createAuthor as createAuthorModel,
  updateAuthor as updateAuthorModel,
  deleteAuthor as deleteAuthorModel,
} from "../models/author.model.js";

export const getAllAuthors = (req, res, next) => {
  try {
    const { search } = req.query;
    const authors = getAllAuthorsModel();

    if (search) {
      const filtered = authors.filter((author) =>
        author.name.toLowerCase().startsWith(search.toLowerCase())
      );
      return res.json(filtered);
    }

    res.json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = (req, res, next) => {
  try {
    const author = getAuthorByIdModel(req.params.id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    next(error);
  }
};

export const createAuthor = (req, res, next) => {
  try {
    const newAuthor = createAuthorModel(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = (req, res, next) => {
  try {
    const updated = updateAuthorModel(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = (req, res, next) => {
  try {
    const deleted = deleteAuthorModel(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};