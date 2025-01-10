import { Router } from "express";
import {signUpCompany} from "../controllers/auth/regComp.controllers.js";
import { signUpUser } from "../controllers/auth/regUser.controllers.js";
import { signIn } from "../controllers/auth/auth.controller.js";
import { verifyToken } from "../lib/jsonwebtoken.js";
import { addClient } from "../controllers/Clients/add-client.js";
const router = Router();
// SignUp
router.post('/register/company', signUpCompany);
router.post('/register/user', signUpUser);
// SignIn
router.post('/login', signIn);
router.get('/profile', verifyToken,(req,res)=>{
    res.json({message:'Acceso perimitido'})
})

//Clients

router.post('/register/clients',addClient);


export default router; 