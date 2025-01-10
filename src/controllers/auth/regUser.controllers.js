import {pool} from '../../../database.js';
import  {encryptPassword}  from '../../lib/bcrypt.js';


//REGISTER USERS COMPANYS

export const signUpUser = async(req,res) =>{
    const {emailCompany, NameUser, Password,Password2} = req.body;
    if(Password !== Password2){
        return res.status(400).json({message:'Las contraseñas no son iguales'});
    }
    const [emailExistence] = await pool.query('SELECT * FROM Companys WHERE Emailcompany = ?', [emailCompany]);
    if(!emailExistence || emailExistence.length === 0 ){
        return(res.status(404).json({message:'El correo no esta registrado'}))
    }

    if(emailExistence !== emailCompany){
        // Create Object userCompany
        const CompanyID= emailExistence[0].CompanyID;
        const userCompany ={
            NameUser,
            Password,
            CompanyID:CompanyID
        }
        // Encriptar contraseña
        
        userCompany.Password = await encryptPassword(Password);
        
        const [results] = await pool.query('INSERT INTO UsersCompany SET ?', userCompany);
        userCompany.UserID = results.insertId;
        
    }
    else{
        res.status(404).json({message:'Error al insertar el usuario'});
    }
    return(res.status(201).json({message:'La insersion fue un exito'}));
        
};
  