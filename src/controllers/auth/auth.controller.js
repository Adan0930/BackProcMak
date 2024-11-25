import {matchPassword} from '../../lib/bcrypt.js'
import {createJWT} from "../../lib/jsonwebtoken.js";
import {pool} from '../../../database.js';


// Init session JWT 
export const  signIn = async(req,res)=>{
    const{EmailCompany,Password} =req.body;
    
    try{
        // search user Database
        const query = 'SELECT * FROM UsersCompany WHERE EmailCompany = ?';
        const [rows] = await pool.query(query,[EmailCompany]);
        
        if(rows.length > 0){
            const user = rows[0];
            const comparePassword = await matchPassword(Password, user.Password)
            if(comparePassword ){
                const token = createJWT(user);
                return res.json({token});
            }else{
                res.status(500).json({message:'Error Compare Password'})
            }
        
        }else{
            res.status(404).json({message:'Usuario no encontrado'});
        }
    }
    catch(err){
        res.status(401).json({message:err})
    }
    
};

