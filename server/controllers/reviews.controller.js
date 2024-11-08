import { connectDB } from "../db.js";

export const getReviews = async (req, res) => {

    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * cliente_califica_lugar');

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

export const getPlaceReviews = async(req, res) => {
    let id_lugar = req.params.id_lugar;
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * FROM cliente_califica_lugar WHERE id_lugar = ?', [id_lugar]);

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

export const createReview = async (req, res) => {
    const id_lugar = req.params.id_lugar;
    const {id_usuario, calificacion, review} = req.body
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('INSERT INTO cliente_califica_lugar(id_usuario, id_lugar, calificacion, review) VALUES (?, ?, ?, ?)',
                [id_usuario, id_lugar, calificacion, review]);

            console.log(result);
            res.json(result);

            connection.release(); 
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}

export const updateReview = async (req, res) => {
    const id_lugar = req.params.id_lugar;
    const {id_usuario, calificacion, review} = req.body
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('UPDATE cliente_califica_lugar SET calificacion = IFNULL(?, calificacion), review = IFNULL(?, review) WHERE id_usuario = ? AND id_lugar = ?',
                [calificacion, review, id_usuario, id_lugar]);

            console.log(result);

            res.json(result);

            connection.release();
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}

export const deleteReview = async (req, res) => {
    const id_lugar = req.params.id_lugar;
    const {id_usuario} = req.body
    try {
        const connection = await connectDB(); // Obtén la conexión desde connectDB
        if (connection) {
            // Realiza la consulta
            const [result] = await connection.query('DELETE FROM cliente_califica_lugar WHERE id_usuario = ? AND id_lugar = ?',
                [id_usuario, id_lugar]);

            if(result.affectedRows == 0){}

            console.log(result);

            res.json(result);

            connection.release(); 
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}