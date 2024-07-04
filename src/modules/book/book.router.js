import { Router} from "express";
import * as bookController from "./book.controller.js";
import { errorHandling } from "../../middlewares/error-handling-middleware.js";


const bookRouter = Router();

bookRouter.post("/create",errorHandling(bookController.createBooks));
bookRouter.get("/getBook/:id", errorHandling(bookController.getBook));
bookRouter.get("/getAllBooks", errorHandling(bookController.getAllBooks));
bookRouter.patch("/update/:id", errorHandling(bookController.updateBook));
bookRouter.delete("/delete/:id", errorHandling(bookController.deleteBook));

 


export default bookRouter;  