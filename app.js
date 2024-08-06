import express from "express";
import router from './src/routes/auth.routes.js';
import { config } from "dotenv";
config();
import morgan from "morgan";

//Initializations
const app = express();

//Settings

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.get('/',(req,res)=>{
    res.send('Estamos iniciando el servidor de ProcMak')
    });

app.use(router);


export default app; 