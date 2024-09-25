import { connectDB } from "../db.js";
import {CrearTokenAcceso} from "../libs/jwt.js";
import bcrypt from "bcryptjs";
export const getUsuarios = async (req, res) =>{
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM usuario');

            console.log(result);
            res.json(result);

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
    let id_usuario = req.params.id_usuario;
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario]);

            console.log(result);

            if(result.length == 0){
                return res.status(404).json({ message: "Usuario no encontrado"});
            }

            res.json(result[0])

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
    //let email = req.params.email;
    //let password = req.params.password;
    const {email, password} = req.body
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password]);

            if(result.length == 0){
                return res.status(404).json({ message: "Usuario no encontrado"});
            }

            console.log(result);

            res.json(result[0])

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
        const passwordHash = await bcrypt.hash(password,10);
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('INSERT INTO usuario(nombre, apellido, email, password, tipo_usuario) VALUES (?, ?, ?, ?, ?)',
                [nombre, apellido, email, password, tipo_usuario]);

            console.log(result);
            
            const token = await CrearTokenAcceso({id: result.id_usuario})
            res.cookie("token", token);
            res.json({
              message: "User created successfully",
            });

            res.json({
                id: result.insertId, 
                nombre,     
                apellido,
                email,
                password: passwordHash,
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
    const id_usuario = req.params.id_usuario;
    const {nombre, apellido, email} = req.body;
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('UPDATE usuario SET nombre = IFNULL(?, nombre) , apellido = IFNULL(?, apellido), email = IFNULL(?, email) WHERE id_usuario = ?',
                [nombre, apellido, email, id_usuario]);

            console.log(result);

            res.json(result);

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

export const cambiarEstadoUsuario = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    const {estado} = req.body;
    //let estado = req.params.estado;
    if (estado == 1){
        estado = 0;
    }else{
        estado = 1;
    }
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('UPDATE usuario SET estado = ? WHERE id_usuario = ?',
                [estado, id_usuario]);

            console.log(result);

            res.json(result);

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

export const deleteUsuario = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('DELETE FROM usuario WHERE id_usuario = ?',
                [id_usuario]);

            if(result.affectedRows == 0){}

            console.log(result);

            res.json(result);

            connection.release(); // Recuerda liberar la conexión después de usarla
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
    //res.send('Actualizar usuarios')
}