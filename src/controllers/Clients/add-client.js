
import {pool} from '../../../database.js';

export const addClient = async (req,res)=>{
    const {Name, LastName, RFC, Email, Phone, Address} = req.body;

    const [clientExistence] = await pool.query('SELECT * FROM Clients WHERE RFC = ?', [RFC]);
    if(clientExistence.length > 0){
        return res.status(404).json({message:'El cliente ya existe'})
    }
    const addClient ={
        Name,
        LastName,
        RFC,
        Email,
        Phone,
        Address
    }
    const InsertUser = 'INSERT INTO Clients SET ?';
    const [results] = await pool.query(InsertUser, addClient);
    addClient.id = results.insertId;

    return res.status(201).json({message:'EL cliente se inserto correctamente'});
};