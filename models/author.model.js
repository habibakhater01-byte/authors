let authors = [
  {
    id: 1,
    name: "Ahmed Khaled",
    age: 30,
  },
  {
    id: 2,
    name: "Ahmed Ali",
    age: 25,
  },
  {
    id: 3,
    name: "Mohamed Samy",
    age: 40,
  },
];
let nextId = 4;

export const getAllAuthors = () => {
  return authors;
};

export const getAuthorById = (id) => {
  return authors.find((author) => author.id === Number(id));
};

export const createAuthor = (data) => {
  const newAuthor = {
    id: nextId++,
    name: data.name,
    age: data.age,
  };
  authors.push(newAuthor);
  return newAuthor;
};

export const updateAuthor = (id, updates) => {
  const author = getAuthorById(id);
  if (!author) {
    return null;
  }
  if (updates.name !== undefined) {
    author.name = updates.name;
  }
  if (updates.age !== undefined) {
    author.age = updates.age;
  }
  return author;
};

export const deleteAuthor = (id) => {
  const index = authors.findIndex(
    (author) => author.id === Number(id)
  );
  if (index === -1) {
    return false;
  }
  authors.splice(index, 1);
  return true;
};