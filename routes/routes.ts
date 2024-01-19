import { Router } from "express";
import { authRoute } from "./auth-route";
import { chapterRoute } from "./chapter-route";

export const router = Router();

router.use("/chapter", chapterRoute);
router.use("/auth", authRoute)
// router.use("/user", userRoute)
