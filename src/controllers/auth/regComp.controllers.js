import {pool} from '../../../database.js';

//REGISTER COMPANYS

export const signUpCompany = async (req,res) =>{    
    const {NameCompany, EmailCompany} = req.body;
    // CHECK IF THE EMAIL ALREADY EIXIST 
    const [emailExistenceCompany]= await pool.query('SELECT * FROM Companys WHERE EmailCompany = ?',[EmailCompany]);
    if(emailExistenceCompany.length > 0){
    
        return res.status(409).json({message:'ESTE CORREO YA EXISTE EN LA BASE DE DATOS'})
    }
    //CREATE THE COMPANY USER 
    const newUserCompany={
        NameCompany,
        EmailCompany,
    };
    // SAVING IN THE DATABASE ProcMak IN TABLE Companys
    const [results] = await pool.query('INSERT INTO Companys SET ?', newUserCompany);
    newUserCompany.id = results.insertId;
    
    return(res.status(201).json({message:'LA COMPAÑIA SE INSERTO CORRECTAMENTE'}));
};

