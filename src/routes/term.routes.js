import { Router } from "express";
import { getAllTerms } from "../controllers/term.controller";

const router = Router();

router.get('/', getAllTerms);

export default router;