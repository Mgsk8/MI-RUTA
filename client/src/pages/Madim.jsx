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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal de creación/edición
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar el modal de eliminación
  const [userToDelete, setUserToDelete] = useState(null); // Almacena el usuario a eliminar
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
          closeModal();
        })
        .catch((error) => console.error("Error al actualizar usuario:", error));
    } else {
      axios
        .post("http://localhost:3000/usuarios", form)
        .then(() => {
          fetchUsers(); // Actualiza la lista de usuarios después de crear
          closeModal();
        })
        .catch((error) => console.error("Error al crear usuario:", error));
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user.id_usuario);
    setIsEditing(true);
    openModal();
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/usuarios/${id}`)
      .then(() => {
        fetchUsers(); // Actualiza la lista de usuarios después de eliminar
        closeDeleteModal();
      })
      .catch((error) => console.error("Error al borrar usuario:", error));
  };

  // Abre el modal de creación/edición
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cierra el modal de creación/edición y resetea el formulario
  const closeModal = () => {
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      tipo_usuario: "",
    });
    setIsModalOpen(false);
    setEditingId(null);
    setIsEditing(false);
  };

  // Abre el modal de confirmación de eliminación
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Cierra el modal de confirmación de eliminación
  const closeDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
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
            </div>
          </form>
          <br />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Crear Usuario
          </button>
          <br /><br />
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
                    <td className="px-6 py-4">{user.id_usuario}</td>
                    <td className="px-6 py-4">{user.nombre}</td>
                    <td className="px-6 py-4">{user.apellido}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.tipo_usuario}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleEdit(user)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => openDeleteModal(user)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de creación/edición */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Editar Usuario" : "Crear Usuario"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Apellido
                </label>
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  name="apellido"
                  id="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contraseña
                </label>
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tipo de Usuario
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="tipo_usuario"
                  value={form.tipo_usuario}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Selecciona el tipo de usuario
                  </option>
                  <option value="administrador">Admin</option>
                  <option value="cliente">Cliente</option>
                  <option value="afiliado">Afiliado</option>
                </select>
              </div>
              <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="hidden"
                  name="estado"
                  value="1"
                  onChange={handleChange}
                  required
                />
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                  type="button"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  type="submit"
                >
                  {isEditing ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {userToDelete.nombre} {userToDelete.apellido}?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={() => handleDelete(userToDelete.id_usuario)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Madmin;