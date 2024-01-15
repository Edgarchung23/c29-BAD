import { Router } from "express";
import { bookRoute } from "./bookRoutes";
import { authRouter } from "../router/authRouter";
import { adminRouter } from "../router/is_adminRouter";

export const router = Router();

router.use("/book", bookRoute);
router.use("/chapter", bookRoute);
router.use("/auth", authRouter)
router.use("/admin", adminRouter);
