import { config } from "dotenv";
config();

export const database ={
    host: process.env.DATABSE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'procMak',
};

export const port = process.env.PORT || 3005;