import { Router } from "express";
import { createPortfolio, deletePortfolio, getPortfolioByCustomerId, getPortfolioBydId } from "../controllers/portfolio.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post('/', verifyToken, createPortfolio);
router.get('/:id', verifyToken, getPortfolioBydId);
router.get('/customer/:customerId', verifyToken, getPortfolioByCustomerId);
router.delete('/:id', verifyToken, deletePortfolio);

export default router;