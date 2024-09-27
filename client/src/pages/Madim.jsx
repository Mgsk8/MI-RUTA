import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Madmin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    tipo_usuario: "",
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
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      tipo_usuario: "",
    }); // Limpiar el formulario
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
    <div>
      <a href="/">
        <Navbar
        navigation={[
          { name: "Usuarios", href: "/menuAdmin", current: true },
          { name: "Negocios", href: "/menuAdmin_negocios", current: false },
        ]}
        logo="/image/logoblanco.png"
      /></a>
      <div className="min-h-screen w-full bg-white dark:bg-gray-700 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl text-gray-50 font-bold mb-4 text-center">
            Gestión de Usuarios
          </h1>
          <br />
          <form onSubmit={handleSubmit} className="mb-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <input
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <input
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
              <input
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-800 font-medium rounded-lg text-sm focus:ring-4 px-4 py-2.5 mt-4 w-full md:w-auto dark:hover:bg-blue-700"
            >
              {editingId ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
          </form>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center rtl:text-right text-blue-100 dark:text-blue-100">
              <thead className="table-auto main-w-full w-12 text-sm text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-blue-500">ID</th>
                  <th scope="col" className="px-6 py-3">Nombre</th>
                  <th scope="col" className="px-6 py-3 bg-blue-500">Apellido</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3 bg-blue-500">Tipo de usuario</th>
                  <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="bg-blue-600 border-b border-blue-400" key={user.id_usuario}>
                    <td className="px-6 py-4 text-base font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">{user.id_usuario}</td>
                    <td className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">{user.nombre}</td>
                    <td className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">{user.apellido}</td>
                    <td className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">{user.email}</td>
                    <td className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">{user.tipo_usuario}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(user)}
                        type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id_usuario)}
                        type="buttom" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      );
}

      export default Madmin;
