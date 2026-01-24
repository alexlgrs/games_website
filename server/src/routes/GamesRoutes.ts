import { Router } from "express";
import { verifyWord } from "../controllers/WordleController";

const router = Router();

router.post("/wordle", verifyWord);

export default router;
