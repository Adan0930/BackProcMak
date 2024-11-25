import jwt, { decode } from 'jsonwebtoken';
import { config } from "dotenv";
config();



// Create Token
export const createJWT = (user)=>{
    const secret = process.env.SECRET_JWT;
    const payload = {
        NameUser: user.NameUser,
        EmailCompany: user.EmailCompany,
        Password: user.Password
    };
    const token = jwt.sign(payload,process.env.SECRET_JWT,{expiresIn:'1h'});
    return token;
};

// VERIFY TOKEN ROUTE
export const verifyToken = (req,res,next)=>{
    // console.log(req.headers);
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({message:'Token no proporcionado'});   
    }
    jwt.verify(token,process.env.SECRET_JWT,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Token no valido"})
        }
        req.user = decoded;
        next();
    });
};








