import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Madmin() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error al obtener usuarios:', error));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            axios.put(`http://localhost:5000/api/users/${editingId}`, form)
                .then(() => {
                    setUsers(users.map(user => user.id === editingId ? { ...user, ...form } : user));
                    setEditingId(null);
                })
                .catch(error => console.error('Error al actualizar usuario:', error));
        } else {
            axios.post('http://localhost:5000/api/users', form)
                .then(response => setUsers([...users, response.data]))
                .catch(error => console.error('Error al crear usuario:', error));
        }
        setForm({ nombre: '', apellido: '', email: '', password: '' });
    };

    const handleEdit = (user) => {
        setForm(user);
        setEditingId(user.id);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/users/${id}`)
            .then(() => setUsers(users.filter(user => user.id !== id)))
            .catch(error => console.error('Error al borrar usuario:', error));
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
                        required />
                    <input
                        className="border p-2"
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        required />
                    <input
                        className="border p-2"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required />
                    <input
                        className="border p-2"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
                    {editingId ? 'Actualizar Usuario' : 'Crear Usuario'}
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
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
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
                                    onClick={() => handleDelete(user.id)}
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
