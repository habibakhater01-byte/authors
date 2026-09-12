import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createAuthorSchema,
  updateAuthorSchema,
  searchQuerySchema,
  idParamSchema,
} from "../schemas/author.schema.js";

const router = express.Router();

router.get("/", validate(searchQuerySchema, "query"), getAllAuthors);
router.get("/:id", validate(idParamSchema, "params"), getAuthorById);
router.post("/", validate(createAuthorSchema, "body"), createAuthor);
router.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateAuthorSchema, "body"),
  updateAuthor
);
router.delete("/:id", validate(idParamSchema, "params"), deleteAuthor);

export default router;