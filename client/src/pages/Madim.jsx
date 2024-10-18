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
    tipo_usuario: "administrador", // Valor predeterminado
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/usuarios")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    // Creación de nuevo usuario
    axios
      .post("http://localhost:3000/usuarios", { ...form, estado: 1 }) // Estado fijo en 1 al crear
      .then((response) => {
        fetchUsers(); // Actualiza la lista de usuarios
        resetForm();
        setIsCreating(false); // Cierra la modal después de crear
      })
      .catch((error) => console.error("Error al crear usuario:", error));
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingUser(user); // Almacena el usuario que se va a editar
    setIsCreating(false); // Cierra la modal de creación si está abierta
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    // Edición de usuario existente
    axios
      .patch(`http://localhost:3000/usuarios/${editingUser.id_usuario}`, form)
      .then(() => {
        fetchUsers();
        resetForm();
        setEditingUser(null); // Resetea el usuario que se está editando
      })
      .catch((error) => console.error("Error al actualizar usuario:", error));
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setIsConfirmingDelete(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      axios
        .delete(`http://localhost:3000/usuarios/${userToDelete}`)
        .then(() => {
          fetchUsers();
          setUserToDelete(null);
          setIsConfirmingDelete(false);
        })
        .catch((error) => console.error("Error al borrar usuario:", error));
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      tipo_usuario: "administrador", // Resetea a valor predeterminado
    });
    setEditingUser(null); // Resetea el usuario que se está editando
  };

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
      <div className="bg-slate-500">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl text-gray-50 font-bold mb-4 text-center">
            Gestión de Usuarios
          </h1>
          <br />
          <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Buscar
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                required
              />
            </div>
          </form>
          <br />
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setIsCreating(true); // Abre la modal para crear usuario
                resetForm(); // Resetea el formulario antes de crear
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            >
              Crear Usuario
            </button>
          </div>
          <br />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ minHeight: "400px" }}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Nombre</th>
                  <th scope="col" className="px-6 py-3">Apellido</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Tipo de usuario</th>
                  <th scope="col" className="px-6 py-3">Estado</th>
                  <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id_usuario}>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.id_usuario}
                      </td>
                      <td className="px-6 py-4">{user.nombre}</td>
                      <td className="px-6 py-4">{user.apellido}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.tipo_usuario}</td>
                      <td className="px-6 py-4">{user.estado}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(user)}
                          type="button"
                          className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id_usuario)}
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 mb-2"
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No hay usuarios que mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal para crear usuario */}
          {isCreating && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
                <form onSubmit={handleSubmitCreate}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo_usuario">
                      Tipo de usuario
                    </label>
                    <select
                      id="tipo_usuario"
                      name="tipo_usuario"
                      value={form.tipo_usuario}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-2 w-full"
                    >
                      <option value="administrador">Administrador</option>
                      <option value="usuario">Usuario</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                      Crear
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)} // Cierra la modal de creación
                      className="bg-red-500 text-white rounded px-4 py-2"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal para editar usuario */}
          {editingUser && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
                <form onSubmit={handleSubmitEdit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo_usuario">
                      Tipo de usuario
                    </label>
                    <select
                      id="tipo_usuario"
                      name="tipo_usuario"
                      value={form.tipo_usuario}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-2 w-full"
                    >
                      <option value="administrador">Administrador</option>
                      <option value="usuario">Usuario</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetForm(); // Resetea el formulario al cerrar
                        setEditingUser(null); // Cierra la modal de edición
                      }}
                      className="bg-red-500 text-white rounded px-4 py-2"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal de confirmación de borrado */}
          {isConfirmingDelete && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Confirmación de Borrado</h2>
                <p>¿Estás seguro de que deseas borrar este usuario?</p>
                <div className="flex justify-between mt-4">
                  <button onClick={confirmDelete} className="bg-red-600 text-white rounded px-4 py-2">
                    Borrar
                  </button>
                  <button
                    onClick={() => {
                      setUserToDelete(null); // Resetea el usuario a borrar
                      setIsConfirmingDelete(false); // Cierra la modal de confirmación
                    }}
                    className="bg-gray-300 text-black rounded px-4 py-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Madmin;
