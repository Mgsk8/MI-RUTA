import { connectDB } from "../db.js";

export const getAfiliados = async (req, res) => {
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('SELECT * FROM usuario WHERE tipo_usuario = "afiliado"');

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

export const getAfiliado = async (req, res) => {
    let id_afiliado = req.params.id_afiliado;
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query ('SELECT * FROM usuario WHERE id_usuario = ? AND tipo_usuario = "afiliado"', [id_afiliado]);
            
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

export const createAfiliado = async  (req, res) => {
    const {id_usuario} = req.body;
    const {cedula} = req.body;
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('INSERT INTO afiliado(id_afiliado, cedula) VALUES (?, ?)',
                [id_usuario, cedula]);

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

export const updateAfiliado = async (req, res) => {
    /*let nombre = req.params.nombre
    let apellido = req.params.apellido
    let email = req.params.email*/
    let id_usuario = req.params.id_usuario;
    const {nombre, apellido, email} = req.body;
    let id_afiliado = req.params.id_afiliado;
    const {cedula} = req.body;
    try {
        const connection = await connectDB()
        if (connection){
            const [result] = await connection.query('UPDATE usuario SET nombre =?, apellido =?, email =? WHERE id_usuario =? AND tipo_usuario ="afiliado"',
                [nombre, apellido, email, id_usuario]);
            
            const [resultC] = await connection.query('UPDATE afiliado set cedula =? WHERE id_afiliado =?', [cedula, id_afiliado])
        

            console.log(result);
            res.json(result);
            res.json(resultC)
            
            connection.release();
        }else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {

        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
        
    }

}

export const deleteAfiliado = async (req, res) => {
    let id_usuario = req.params.id_usuario
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('DELETE FROM usuario WHERE id_usuario =? AND tipo_usuario = "afiliado"', [id_usuario]);

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