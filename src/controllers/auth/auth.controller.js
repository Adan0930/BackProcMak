import passport from "passport";
import {matchPassword} from '../../lib/bcrypt.js'
import {createJWT} from "../../lib/jsonwebtoken.js";
import {pool} from '../../../database.js';



// Init session JWT 
export const  signIn = async(req,res)=>{
    const{email,password} =req.body;
    
    try{
        // search user Database
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.query(query,[email]);
        
        if(rows.length > 0){
            
            const user = rows[0];
            const comparePassword = await matchPassword(password, user.password)
            if(comparePassword){
                const token = createJWT(user);
                console.log(user);
                return res.json({token});
            }else{
                res.status(401).json({message:'err compare password'})
            }
        
        }else{
            res.status(401).json({message:'Credeciales invalidas'});
        }
        
    }
    catch(err){
        res.status(err)
    }

};

