import { connectDB } from "../db.js";

export const getClientes = async (req, res) => {
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM cliente');

            console.log(result);

            res.json({
                result
            })

            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}

export const getCliente = (req, res) => {
    res.send('Obteniendo un cliente');
}

export const createCliente = async  (req, res) => {
    const {title, description} = req.body
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('INSERT INTO tasks(title, description) VALUES (?, ?)',
                [title, description]);

            console.log(result);

            res.json({
                id: result.insertId, 
                title, 
                description,
            });

            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
    //res.send('Crear cliente');
}

export const updateCliente = (req, res) => {
    res.send('Actualizar cliente');
}

export const deleteCliente = (req, res) => {
    res.send('Eliminar cliente');
}