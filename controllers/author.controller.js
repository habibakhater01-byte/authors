import {
  getAllAuthors as getAllAuthorsModel,
  getAuthorById as getAuthorByIdModel,
  createAuthor as createAuthorModel,
  updateAuthor as updateAuthorModel,
  deleteAuthor as deleteAuthorModel,
} from "../models/author.model.js";


export const getAllAuthors = (req, res) => {
  const { search } = req.query;
  const authors = getAllAuthorsModel();

  if (search) {
    const filtered = authors.filter((author) =>
      author.name.toLowerCase().startsWith(search.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(authors);
};


export const getAuthorById = (req, res) => {
  const author = getAuthorByIdModel(req.params.id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json(author);
};


export const createAuthor = (req, res) => {
  const newAuthor = createAuthorModel(req.body);
  res.status(201).json(newAuthor);
};


export const updateAuthor = (req, res) => {
  const updated = updateAuthorModel(req.params.id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json(updated);
};


export const deleteAuthor = (req, res) => {
  const deleted = deleteAuthorModel(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.status(204).send();
};