import { Router } from "express";
import { getAllCosts } from "../controllers/cost.controller";

const router = Router();

router.get('/', getAllCosts);

export default router;