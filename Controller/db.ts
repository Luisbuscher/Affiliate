const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
require('dotenv').config();

// Configurações do banco de dados
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};


// Criação do pool de conexões com mysql2/promise
const pool = mysqlPromise.createPool(dbConfig);

// Função para executar consultas com Promises (async/await)
const queryAsync = async (sql: any, values: any) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(sql, values);
        return rows;
    } finally {
        connection.release();
    }
};

// Criação da conexão direta com mysql2 (para uso em callbacks)
const connection = mysql.createConnection(dbConfig);

connection.connect((err: any) => {
    if (err) {
        console.error('Erro de conexão ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

// Exportação das funcionalidades
module.exports = {
    queryAsync,
    connection
};