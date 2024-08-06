import { Router } from "express";
import {signUpCompany,signUpUser} from "../controllers/auth/registration.Controllers.js";

const router = Router();
//signup
//router.post('/signup',signUp);
router.post('/register/company', signUpCompany);
router.post('/register/user',signUpUser);
//signin
//router.post('/login',signIn);


export default router; 