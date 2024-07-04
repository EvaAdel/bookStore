import express from "express";
import {connection_db} from "./DB/connection.js";
import authorRouter from "./src/modules/author/author.router.js";
import bookRouter from './src/modules/book/book.router.js';
import { errorHandlerResponse } from "./src/middlewares/error-handling-middleware.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use(errorHandlerResponse)
connection_db();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  



