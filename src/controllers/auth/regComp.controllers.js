import {pool} from '../../../database.js';
//REGISTER COMPANYS

export const signUpCompany = async (req,res) =>{    
    const {NameCompany, EmailCompany} = req.body;
    // CHECK IF THE EMAIL ALREADY EIXIST 
    const [emailExistenceCompany]= await pool.query('SELECT * FROM Companys WHERE EmailCompany = ?',[EmailCompany]);
    if(emailExistenceCompany.length > 0){
        console.log('Este correo ya Existe');
        return res.send('Este email ya esta registrasdo el la base de datos');
    }
    //CREATE THE COMPANY USER 
    const newUserCompany={
        NameCompany,
        EmailCompany,
    };
    // SAVING IN THE DATABASE ProcMak IN TABLE Companys
    const [results] = await pool.query('INSERT INTO Companys SET ?', newUserCompany);
    newUserCompany.id = results.insertId;
    console.log(newUserCompany);

    //INSERT TYPE SUSCRIPTION DEFAULT
    const CompanyID = results.insertId;

    const SuscriptionCompany = await pool.query('INSERT INTO Suscriptions (CompanyID) VALUES (?)',[CompanyID]);
    console.log(SuscriptionCompany);
};

