import { Router } from "express";
import { bookRoute } from "./bookRoutes";
import { authRouter } from "./authRoute";

export const router = Router();

router.use("/book", bookRoute);
router.use("/chapter", bookRoute);
router.use("/auth", authRouter)
