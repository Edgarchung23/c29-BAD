import { Router, Request, Response } from "express";
import { BookService } from "../services/BookService";
import { BookController } from "../controllers/BookController";
import { knex } from "../server";



export const bookRoute = Router();

console.log("knex: ", knex)
const bookService = new BookService(knex);
export const bookController = new BookController(bookService);

bookRoute.get("/content", bookController.getContent);

bookRoute.get("/reader", bookController.getReader);

