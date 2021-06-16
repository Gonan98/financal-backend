import { Router } from "express";
import { addCustomer, getAllCustomer, getCustomerById, updateCustomer } from "../controllers/customer.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.get('/', verifyToken, getAllCustomer);
router.get('/:id', verifyToken, getCustomerById);
router.post('/', verifyToken, addCustomer);
router.put('/:id', verifyToken, updateCustomer);

export default router;