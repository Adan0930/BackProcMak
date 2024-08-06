import mysql from 'mysql2/promise';
import { database } from './config.js';


export const createpool = mysql.createPool(database);
export const pool = await createpool.getConnection((err) =>{
    if (err) {
        console.error('error la conectar la base de datos ');
        return;
    }
    console.log('Nos hemos conectado correctamente a la base de datos ')
});
