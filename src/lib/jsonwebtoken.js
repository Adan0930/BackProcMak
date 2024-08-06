
import jwt, { decode } from 'jsonwebtoken';
import { config } from "dotenv";
//import { token } from 'morgan';
config();

// Create Token

export const createJWT = (user)=>{
    const secret = process.env.SECRET_JWT;

    const payload = {
        id: user.id,
        userName: user.userName,
        email: user.email,
    };

    const token =jwt.sign(payload,secret,{expiresIn:'1h'});

    return token;
};

// VERIFY TOKEN ROUTE


export const verifyToken = (req,res,next)=>{
    
}

jwt.verify(token,process.env.SECRET_JWT,(err,decoded)=>{
    if(err){
        console.error('El token es invalido',err)
    }else{
        console.log('Token valido',decoded)
    }
});







