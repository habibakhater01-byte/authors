import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().positive("Age must be a positive number"),
});
export const updateAuthorSchema = z.object({
  name: z.string().min(1).optional(),
  age: z.number().int().positive().optional(),
});

export const searchQuerySchema = z.object({
  search: z.string().min(1).optional(),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "id must be a number"),
});