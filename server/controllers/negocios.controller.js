import { connectDB } from "../db";

export const getNegocios = async (req, res) => {

    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * FROM negocio');

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
export const getNegocio = async (req, res) => {
    let id_lugar = req.params.id_lugar;
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * FROM negocio WHERE id_lugar', [id_lugar]);

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

export const crearNegocio = async (req, res) => {
    let id_lugar = req.params.id_lugar;
    let nit = req.params.nit;
    let id_afiliado = req.params.id_afiliado;

    
    try {
        const connection = await connectDB();
        if (connection){

            const [result] = await connection.query('INSERT INTO negocio(id_lugar, nit, id_afiliado) VALUES (?,?,?)'
                [id_lugar, nit, id_afiliado]);
            
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
export const actualizarNegocio = async (req, res) => {
    let nit = req.params.nit;
    let id_afiliado = req.params.id_afiliado;
    let id_lugar = req.params.id_lugar;

    try {
        const connection = await connectDB();
        if (connection){
            
            const [result] = await connection.query('UPDATE negocio SET nit =?, id_afiliado =? WHERE id_lugar =?',
                [nit, id_afiliado, id_lugar]
            )

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
export const deleteNegocio = async(req, res) => {
    let id_lugar = req.params.id_lugar
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('DELETE FROM negocio WHERE id_lugar =?', [id_lugar]);

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