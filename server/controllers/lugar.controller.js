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
    const {nombre, informacion, latitud, longitud, direccion_automatica, direccion_manual, categorias, calificacion, images, descuento} = req.body;
    console.log("nombre: ", nombre, "\ninformacion: ", informacion, "\nlatitud: ", latitud, "\nlongitud: ", longitud, "\ncategoria: ", categorias, "\ncalificacion: ", calificacion,"\ndescuento: ", descuento);
    
    try {
        const connection = await connectDB();
        if (connection){

            const [result] = await connection.query('INSERT INTO lugar(nombre, informacion, latitud, longitud, direccion_automatica, direccion_manual, categorias, calificacion, images, descuento) VALUES (?,?,?,?,?,?,?,?,?,?)',   
                [nombre, informacion, latitud.toString(), longitud.toString(), direccion_automatica, direccion_manual, categorias, calificacion, images, descuento]);
            
            console.log(result);

            res.json({
                id: result.insertId, 
                nombre, 
                informacion,
                latitud,
                longitud,
                direccion_automatica,
                direccion_manual,
                categorias,
                calificacion,
                descuento
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
export const actualizarLugar = async (req, res) => {
    const id_lugar = req.params.id_lugar;
    const { nombre, informacion, latitud, longitud, direccion_manual, categorias, calificacion } = req.body;

    console.log('Datos recibidos:', req.body);
    console.log('ID del lugar a actualizar:', id_lugar);

    try {
        const connection = await connectDB();
        if (connection) {
            const [result] = await connection.query(
                'UPDATE lugar SET nombre = IFNULL(?, nombre), informacion = IFNULL(?, informacion), latitud = IFNULL(?, latitud), longitud = IFNULL(?, longitud), direccion_manual = IFNULL(?, direccion_manual), categorias = IFNULL(?, categorias), calificacion = IFNULL(?, calificacion) WHERE id_lugar = ?',
                [nombre, informacion, latitud, longitud, direccion_manual, categorias, calificacion, id_lugar]
            );

            console.log('Resultado de la consulta:', result);
            res.json(result);
            connection.release();
        } else {
            res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        }
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.status(500).json({ error: error.message || 'Error en la consulta' });
    }
};

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
