import {matchPassword} from '../../lib/bcrypt.js'
import {createJWT} from "../../lib/jsonwebtoken.js";
import {pool} from '../../../database.js';


// Init session JWT 
export const  signIn = async(req,res)=>{
    const{EmailCompany,NameUser,Password} =req.body;
    
    try{
        // search user Database
        const querylogin = 'SELECT NameUser, Password, EmailCompany FROM UsersCompany INNER JOIN Companys ON UsersCompany.CompanyID = Companys.CompanyID  WHERE NameUser = ?  AND EmailCompany = ?';
        
        const [rows] = await pool.query(querylogin,[NameUser,EmailCompany]);
        console.log(NameUser,Password,EmailCompany)

        console.log(rows[0]);
        
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

