const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables del archivo .env

// Configuración de la conexión
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        // Requerido por Supabase para conexiones externas
        rejectUnauthorized: false 
    }
});

// Verificación de conexión al iniciar (Opcional pero recomendado)
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error adquiriendo cliente de la base de datos', err.stack);
    }
    console.log('Conexión exitosa a Supabase (PostgreSQL)');
    release();
});

module.exports = pool;