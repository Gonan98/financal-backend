import { Router } from "express";
import { createDetail, getDetailsByPortfolioId } from "../controllers/portfolio-detail.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post('/', verifyToken, createDetail);
router.get('/portfolio/:portfolioId', verifyToken, getDetailsByPortfolioId);

export default router;