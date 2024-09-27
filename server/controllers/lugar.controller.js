import { connectDB } from "../db.js";

export const getLugares = async (req, res) => {

    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * FROM lugar');

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
export const getLugar = async(req, res) => {
    let id_lugar = req.params.id_lugar;
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('SELECT * FROM lugar WHERE id_lugar = ?', [id_lugar]);

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
export const crearLugar = async(req, res) => {
    /*let id_lugar = req.params.id_lugar;
    let nombre = req.params.nombre;
    let informacion = req.params.informacion;
    let ubicacion = req.params.ubicacion;
    let categoria = req.params.categoria;*/
    const {nombre, informacion, latitud, longitud, categoria, calificacion} = req.body;
    console.log("nombre: ", nombre, "\ninformacion: ", informacion, "\nlatitud: ", latitud, "\nlongitud: ", longitud, "\ncategoria: ", categoria, "\ncalificacion: ", calificacion);
    
    try {
        const connection = await connectDB();
        if (connection){

            const [result] = await connection.query('INSERT INTO lugar(nombre, informacion, latitud, longitud, categoria, calificacion) VALUES (?,?,?,?,?,?)',
                [nombre, informacion, latitud.toString(), longitud.toString(), categoria, calificacion]);
            
            console.log(result);

            res.json({
                id: result.insertId, 
                nombre, 
                informacion,
                latitud,
                longitud,
                categoria,
                calificacion
            });

            connection.release();
        }else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }

    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }

    
}
export const actualizarLugar = async(req, res) => {
    /*let nombre = req.params.nombre;
    let informacion = req.params.informacion;
    let ubicacion = req.params.ubicacion;
    let categoria = req.params.categoria;
    let id_lugar = req.params.id_lugar;*/
    const {nombre, informacion, ubicacion, categoria, id_lugar} = req.body;

    try {
        const connection = await connectDB();
        if (connection){
            
            const [result] = await connection.query('UPDATE lugar SET nombre = IFNULL(?, nombre), informacion = IFNULL(?, informacion), ubicacion = IFNULL(?, ubicacion), categoria = IFNULL(?, categoria) WHERE id_lugar = ?',
                [nombre, informacion, ubicacion, categoria, id_lugar]
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
export const deleteLugar = async(req, res) => {
    let id_lugar = req.params.id_lugar
    try {
        const connection = await connectDB();
        if (connection){
            const [result] = await connection.query('DELETE FROM lugar WHERE id_lugar =?', [id_lugar]);

            console.log(result);
            res.json(result);

        }else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });


    }
}
