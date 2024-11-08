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
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualizar el término de búsqueda cuando el usuario escribe
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      axios
        .patch(`http://localhost:3000/usuarios/${editingId}`, form)
        .then(() => {
          fetchUsers(); // Actualiza la lista de usuarios después de editar
          setEditingId(null);
          setIsEditing(false);
        })
        .catch((error) => console.error("Error al actualizar usuario:", error));
    } else {
      axios
        .post("http://localhost:3000/usuarios", form)
        .then(() => {
          fetchUsers(); // Actualiza la lista de usuarios después de crear
          setIsEditing(false);
        })
        .catch((error) => console.error("Error al crear usuario:", error));
    }
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      tipo_usuario: "",
    });
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user.id_usuario);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/usuarios/${id}`)
      .then(() => fetchUsers()) // Actualiza la lista de usuarios después de eliminar
      .catch((error) => console.error("Error al borrar usuario:", error));
  };

  // Filtrar usuarios por el término de búsqueda
  const filteredUsers = users.filter((user) =>
    `${user.nombre} ${user.apellido}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar
        navigation={[
          { name: "Usuarios", href: "/menuAdmin", current: true },
          { name: "Visualizar negocios", href: "/menuAdmin_negocios", current: false },
          { name: "Registrar negocios", href: "/registerCompany_admin", current: false },
        ]}
        logo="/image/logoblanco.png"
      />
      <div className="bg-gray-300 bg-cover bg-center min-h-screen w-full">
        <div className="max-w-4xl mx-auto p-0 md:p-0">
          <h1 className="text-2xl md:text-4xl text-black-50 font-bold mb-4 text-center">
            <br />
            Gestión de Usuarios
          </h1>
          <br />
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Buscar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange} // Controlar el input de búsqueda
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <br />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Nombre</th>
                  <th scope="col" className="px-6 py-3">Apellido</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Tipo de usuario</th>
                  <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={user.id_usuario}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.id_usuario}
                    </td>
                    <td className="px-6 py-4">{user.nombre}</td>
                    <td className="px-6 py-4">{user.apellido}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.tipo_usuario}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(user)}
                        type="button"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id_usuario)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditing && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
                <form onSubmit={handleSubmit} className="mb-6">
                  <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                  />
                  <input
                    className="mt-4 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    required
                  />
                  <input
                    className="mt-4 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <input
                    className="mt-4 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                  />
                  <input
                    className="mt-4 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    name="tipo_usuario"
                    value={form.tipo_usuario}
                    onChange={handleChange}
                    placeholder="Tipo de Usuario"
                    required
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Guardar Cambios
                  </button>
                </form>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Madmin;

