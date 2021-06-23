import { Router } from "express";
import { createPortfolio, deletePortfolio, getPortfolioByCustomerId, getPortfolioById } from "../controllers/portfolio.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post('/', verifyToken, createPortfolio);
router.get('/:id', verifyToken, getPortfolioById);
router.get('/customer/:customerId', verifyToken, getPortfolioByCustomerId);
router.delete('/:id/customer/:customerId', verifyToken, deletePortfolio);

export default router;