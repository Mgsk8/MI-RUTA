import { connectDB } from "../db.js";

export const getPing = async (req, res) => {
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [rows] = await connection.query('SELECT 1 + 1 AS result');
            res.json(rows);
            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}