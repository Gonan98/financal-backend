import { Router } from "express";
import { getProfile, signIn, signUp } from "../controllers/auth.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', verifyToken, getProfile);

export default router;