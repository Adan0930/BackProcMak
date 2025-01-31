import cors from 'cors';


const ConfigCors = {
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type,Authorization'],
    credentials: true
}

export default cors(ConfigCors);
