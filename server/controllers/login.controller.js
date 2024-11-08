import { connectDB } from "../db.js";
import { CrearTokenAcceso } from "../libs/jwt.js";

export const getLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await connectDB(); // Obtén la conexión desde connectDB
    if (connection) {
      // Realiza la consulta
      const [result] = await connection.query(
        "SELECT * FROM usuario WHERE email =? AND password =?",
        [email, password]
      );

      if (result.length == 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      console.log(result);

      const user = result[0];

      const token = await CrearTokenAcceso({ id: result.id_usuario });
      res.cookie("token", token);
      res.json({
        id: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
      });

      connection.release(); // Recuerda liberar la conexión después de usarla
    } else {
      res.status(500).json({ error: "No se pudo conectar a la base de datos" });
    }
  } catch (error) {
    console.error("Error al hacer la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
};
