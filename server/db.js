import { createPool } from "mysql2/promise";

// Crear el pool de conexiones
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mi-ruta'
});

// Definir la función connectDB para conectarse a la base de datos
export async function connectDB() {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión exitosa a la base de datos");
        return connection; // Retorna la conexión para su uso
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);
        return null; // Retorna null en caso de error
    }
}