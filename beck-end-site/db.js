const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'marcelo',
    database: 'healthmatch'
});

db.connect()
    .then(() => {
        console.log('Banco PostgreSQL conectado!');
    })
    .catch((erro) => {
        console.log('Erro ao conectar ao PostgreSQL:', erro);
    });

module.exports = db;