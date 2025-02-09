import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

app.use(bodyParser.json());
app.use('/', postRoutes(pool));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
