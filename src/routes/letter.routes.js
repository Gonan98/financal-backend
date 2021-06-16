import { Router } from "express";
import { addLetter, getLettersByPortfolioId } from "../controllers/letter.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.get('/portfolio/:portfolioId', verifyToken, getLettersByPortfolioId);
router.post('/', verifyToken, addLetter);

export default router;