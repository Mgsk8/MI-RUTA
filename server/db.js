import { createPool } from "mysql2/promise";

// Crear el pool de conexiones
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mi-ruta'
});

// Definir la función testConnection para probar la conexión a la base de datos
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión exitosa a la base de datos");
        await connection.release(); // Libera la conexión
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);
    }
}

// Llamar a la función testConnection
testConnection();

