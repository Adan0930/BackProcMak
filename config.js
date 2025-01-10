import { config } from "dotenv";
config();

export const database ={
    host: process.env.DATABSE_HOST || 'Database',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'ProcMak',
    port: process.env.DATABASE_PORT || 3306,
};

export const port = process.env.PORT || 3005;