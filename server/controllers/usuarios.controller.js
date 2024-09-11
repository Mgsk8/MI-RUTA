import { connectDB } from "../db.js";

export const getUsuarios = async (req, res) =>{
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM usuario');

            console.log(result);


            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}
export const getUsuario = async (req, res) => {
    //console.log(req.params.id);
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.params.id]);

            console.log(result);

            res.json(result)

            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}

export const getLogin = async (req, res) => {
    console.log(req.params.email);
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM usuario WHERE email = ?', [req.params.email]);

            console.log(result);

            res.json(result)

            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}

export const createUsuario = async (req, res) => {
    const {nombre, apellido, email, password, tipo_usuario} = req.body
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('INSERT INTO usuario(nombre, apellido, email, password, tipo_usuario) VALUES (?, ?, ?, ?, ?)',
                [nombre, apellido, email, password, tipo_usuario]);

            console.log(result);

            res.json({
                id: result.insertId, 
                nombre, 
                apellido,
                email,
                password,
                tipo_usuario,
                estado: result.insertEstado
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
    
export const updateUsuario = async (req, res) => {
    const {nombre, apellido, email, id_usuario} = req.body
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('UPDATE usuario SET nombre = ?, apellido = ?, email = ? WHERE id_usuario = ?',
                [nombre, apellido, email, id_usuario]);

            console.log(result);

            res.json({
                //id: result.insertId, 
                nombre, 
                apellido,
                email,
                //password,
                //tipo_usuario,
                //result.
            });

            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
    //res.send('Actualizar usuarios')
};

export const deletetUsuario = (req, res) => res.send('Eliminar usuarios');