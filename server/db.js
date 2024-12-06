import { createPool } from "mysql2/promise";

// Crear el pool de conexiones
const pool = createPool({
  host: "database-1.c5okuiuqmtnz.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Miruta22!",
  port: 3306,
  database: "mi-ruta",
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
