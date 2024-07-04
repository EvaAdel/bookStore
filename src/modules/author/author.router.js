import { Router} from "express";
import * as authorController from "./author.controller.js";
import { errorHandling } from "../../middlewares/error-handling-middleware.js";


const authorRouter = Router();

authorRouter.post("/create", errorHandling(authorController.createAuthors));
authorRouter.get("/getAuthor/:id", errorHandling(authorController.getAuthor));
authorRouter.get("/getAllAuthors", errorHandling(authorController.getAllAuthors));
authorRouter.patch("/update/:id", errorHandling(authorController.updateAuthor));
authorRouter.delete("/delete/:id", errorHandling(authorController.deleteAuthor));


export default authorRouter;