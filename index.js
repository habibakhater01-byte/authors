import express from "express";
import authorRoutes from "./routes/author.route.js";

const app = express();

app.use(express.json());
app.use("/authors", authorRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});