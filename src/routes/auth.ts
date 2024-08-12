import express  from "express";
import { logIn } from '../controllers/auth/login'
import { signup } from "../controllers/auth/signup";

const router = express.Router()

router.post("/login",logIn)
router.post("/signup",signup)


export default router