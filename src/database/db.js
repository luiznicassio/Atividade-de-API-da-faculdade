// Importando o driver do MySQL
import mysql from 'mysql2/promise';

// Importando as variáveis de ambiente
import 'dotenv/config';

// Criando o pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

export default pool;