import { Router, Request, Response } from "express";
import { bookController } from "../server";

export const bookRoute = Router();

bookRoute.get("/content", bookController.getContent);