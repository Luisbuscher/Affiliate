import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configurações do banco de dados
const dbConfig: mysql.PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

// Criação do pool de conexões com mysql2/promise
const pool = mysql.createPool(dbConfig);

export default pool;