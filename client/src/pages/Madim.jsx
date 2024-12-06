import React, { useState, useEffect } from "react";
import { 
  getUsuarioRequest,  // Cambiado para obtener todos los usuarios
  registerUserRequest, 
  updateUserRequest, 
  deleteUserRequest 
} from "../api/auth";  // Asegúrate de importar las funciones correctas
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
    getUsuarioRequest()  // Cambiado para la función correcta
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
    registerUserRequest({ ...form, estado: 1 }) // Estado fijo en 1 al crear
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
    updateUserRequest(form)  // Utiliza la función de la API
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
      deleteUserRequest({ id_usuario: userToDelete })  // Utiliza la función de la API
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
        navigation={[{ name: "Inicio", href: "/", current: false }, { name: "Usuarios", href: "/menuAdmin", current: true }]}
        logo="/image/logoblanco.png"
      />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
          Gestión de Usuarios
        </h1>
        <form className="max-w-md mx-auto">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Buscar</label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 text-sm"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => {
              setIsCreating(true); // Abre la modal para crear usuario
              resetForm(); // Resetea el formulario antes de crear
            }}
            className="font-medium rounded-lg text-sm px-4 py-2"
          >
            Crear Usuario
          </button>
        </div>
        <div className="relative shadow-md sm:rounded-lg">
          <table className="table">
            <thead className="text-xs uppercase">
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
                  <tr className="border-b" key={user.id_usuario}>
                    <td className="px-6 py-4 font-medium">{user.id_usuario}</td>
                    <td className="px-6 py-4">{user.nombre}</td>
                    <td className="px-6 py-4">{user.apellido}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.tipo_usuario}</td>
                    <td className="px-6 py-4">{user.estado}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(user)}
                        type="button"
                        className="font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id_usuario)}
                        type="button"
                        className="font-medium rounded-lg text-sm px-4 py-2 mb-2"
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
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
              <form onSubmit={handleSubmitCreate}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="email">Correo</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="tipo_usuario">Tipo de Usuario</label>
                  <select
                    id="tipo_usuario"
                    name="tipo_usuario"
                    value={form.tipo_usuario}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                  >
                    <option value="administrador">Administrador</option>
                    <option value="usuario">Usuario</option>
                  </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Crear</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Madmin;