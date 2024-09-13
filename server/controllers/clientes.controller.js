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

export const getCliente = async (req, res) => {
    let id_cliente = req.params.id_cliente;
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query ('SELECT * FROM usuario WHERE id_usuario = ? AND tipo_usuario = "cliente"', [id_cliente]);
            
            console.log(result);
            res.json(result);

            connection.release();

        } else{
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
        
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}

export const createCliente = async  (req, res) => {
    const {id_usuario} = req.body;
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('INSERT INTO cliente(id_cliente) VALUES (?)',
                [id_usuario]);

            console.log(result);

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

export const updateCliente = async (req, res) => {
    /*let nombre = req.params.nombre
    let apellido = req.params.apellido
    let email = req.params.email*/
    let id_usuario = req.params.id_usuario;
    const {nombre, apellido, email} = req.body;

    try {
        const connection = await connectDB()
        if (connection){
            const [result] = await connection.query('UPDATE usuario SET nombre =?, apellido =?, email =? WHERE id_usuario =? AND tipo_usuario ="cliente"',
                [nombre, apellido, email, id_usuario]);
            
        

            console.log(result);
            res.json(result);
            
            connection.release();
        }else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {

        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
        
    }

}

export const deleteCliente = async (req, res) => {
    let id_usuario = req.params.id_usuario
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('DELETE FROM usuario WHERE id_usuario =? AND tipo_usuario = "cliente"', [id_usuario]);

            console.log(result);
            res.json(result);

        }else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
        

    }

}