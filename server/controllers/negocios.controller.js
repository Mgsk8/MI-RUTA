import { connectDB } from "../db.js";

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

export const getNegocio_afiliatte = async (req, res) => {
    let id_usuario = req.params.id_usuario;
    try {
        const connection = await connectDB();
        if (connection){
            await connection.query('DROP TEMPORARY TABLE IF EXISTS negocios_afiliado;');
            await connection.query('CREATE TEMPORARY TABLE negocios_afiliado AS SELECT lugar.*, negocio.nit AS negocio_nit FROM lugar JOIN negocio ON lugar.id_lugar = negocio.id_negocio WHERE negocio.id_afiliado = ?', [id_usuario]);
            const [result] = await connection.query('SELECT * FROM negocios_afiliado');
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
            const [result] = await connection.query('SELECT * FROM negocio WHERE id_negocio= ?', [id_lugar]);

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
    /*let id_lugar = req.params.id_lugar;
    let nit = req.params.nit;
    let id_afiliado = req.params.id_afiliado;*/
    const {id_negocio,nit,id_afiliado} = req.body;

    
    try {
        const connection = await connectDB();
        if (connection){

            const [result] = await connection.query('INSERT INTO negocio(id_negocio, nit, id_afiliado) VALUES (?,?,?)',
                [id_negocio, nit, id_afiliado]);
            
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
    /*let nit = req.params.nit;
    let id_afiliado = req.params.id_afiliado;
    let id_lugar = req.params.id_lugar;*/
    const {nit, id_afiliado, id_lugar} = req.body;

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
