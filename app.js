import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.send('Estamos iniciando el servidor de ProcMak')
})
app.listen(3000,()=>{
    console.log('Server on port 3001')
})