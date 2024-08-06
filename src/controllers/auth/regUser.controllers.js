import {pool} from '../../../database.js';
import { encryptPassword } from '../../lib/bcrypt.js';


//REGISTER USERS COMPANYS

export const signUpUser = async(req,res) =>{
    const {EmailCompany, NameUser, Password,Password2} = req.body;

    if(Password !== Password2){
        console.log('Las contraseñas no son iguales');
        return res.send('Verifica tus contraseñas');
    }

    const [emailExistence] = await pool.query('SELECT * FROM Companys WHERE Emailcompany = ?', [EmailCompany]);
        if(emailExistence !== EmailCompany){
            // Create Object userCompany
            const userCompany ={
                NameUser,
                Password
            }
            // Encriptar contraseña

            userCompany.Password = encryptPassword(Password);

            const [results] = await pool.query('INSERT INTO UserCompany SET ?', userCompany);
            userCompany.id = results.insertId;
            
            return console.log('insersion correcta');
        }
        else{
            console.error('Existe un error con el estado');
        }

};
