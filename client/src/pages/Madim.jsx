import React, { useState, useEffect } from "react";
import axios from "axios";

function Madmin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    tipo_usuario: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/usuarios")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  };

  useEffect(() => {
    fetchUsers(); // Cargar los usuarios al montar el componente
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      axios
        .patch(`http://localhost:3000/usuarios/${editingId}`, form)
        .then(() => {
          fetchUsers(); // Actualiza la lista de usuarios después de editar
          setEditingId(null); // Resetear el estado de edición
        })
        .catch((error) => console.error("Error al actualizar usuario:", error));
    } else {
      axios
        .post("http://localhost:3000/usuarios", form)
        .then(() => {
          fetchUsers(); // Actualiza la lista de usuarios después de crear
        })
        .catch((error) => console.error("Error al crear usuario:", error));
    }
    setForm({ nombre: "", apellido: "", email: "", password: "", tipo_usuario: "" }); // Limpiar el formulario
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user.id_usuario);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/usuarios/${id}`)
      .then(() => fetchUsers()) // Actualiza la lista de usuarios después de eliminar
      .catch((error) => console.error("Error al borrar usuario:", error));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2"
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2"
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            className="border p-2"
            name="tipo_usuario"
            value={form.tipo_usuario}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar tipo de usuario</option>
            <option value="administrador">administrador</option>
            <option value="afiliado">afiliado</option>
            <option value="cliente">cliente</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          {editingId ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Apellido</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_usuario}>
              <td className="border px-4 py-2">{user.id_usuario}</td>
              <td className="border px-4 py-2">{user.nombre}</td>
              <td className="border px-4 py-2">{user.apellido}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-4 py-1"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id_usuario)}
                  className="bg-red-500 text-white px-4 py-1"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Madmin;
