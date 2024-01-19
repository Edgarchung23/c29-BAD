import { Router} from "express";
import { BookService } from "../services/book.service";
import { BookController } from "../controllers/book.controller";
import { knex } from "../server";



export const chapterRoute = Router();

const bookService = new BookService(knex);
export const bookController = new BookController(bookService);

chapterRoute.get("/books",bookController.getAllBook);

