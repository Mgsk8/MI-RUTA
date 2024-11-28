import { connectDB } from "../db.js";

export const getReviews = async (req, res) => {

    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * FROM cliente_califica_lugar');

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

export const getPlaceUserReview = async(req, res) => {
    const id_lugar = req.params.id_lugar;
    const id_usuario = req.params.id_usuario;
    //const {id_lugar, id_usuario} = req.params;

    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * FROM cliente_califica_lugar WHERE id_lugar = ? AND id_usuario = ?', [id_lugar, id_usuario]);

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
    const { id_usuario } = req.body;

    console.log("Intentando eliminar reseña de usuario:", id_usuario, "en lugar:", id_lugar); // Confirmación de datos

    try {
        const connection = await connectDB();
        if (connection) {
            const [result] = await connection.query(
                'DELETE FROM cliente_califica_lugar WHERE id_usuario = ? AND id_lugar = ?',
                [id_usuario, id_lugar]
            );

            console.log("Resultado de la eliminación:", result); // Verifica el resultado aquí

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Reseña no encontrada" });
            }

            res.json({ success: "¡Reseña eliminada con éxito!" });
            connection.release();
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
};
