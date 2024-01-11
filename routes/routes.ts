import { Router } from "express";
import { bookRoute } from "./bookRoutes";

export const router = Router();

router.use("/book", bookRoute);