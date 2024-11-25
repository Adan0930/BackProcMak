import express from "express";
import router from './src/routes/auth.routes.js';
import { config } from "dotenv";
config();
import morgan from "morgan";
import cors from 'cors';

//Initializations
const app = express();

//Settings

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors({
  origin:'http://localhost:3001',
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type', 'Authorization']
}));

//Routes
app.get('/',(req,res)=>{
    res.send('Estamos iniciando el servidor de ProcMak')
    });

app.use(router);


export default app; 