import React, { useState, useEffect } from "react";
import { getNegocios } from "../api/auth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function MenuAfiliado() {
  const [negocios, setNegocios] = useState([]);

  const get_Negocios = async () => {
    try {
      const res = await getNegocios();
      console.log("Datos recibidos:", res.data);
      if (Array.isArray(res.data)) {
        setNegocios(res.data); 
      } else {
        console.error("Los datos no son un array");
      }
    } catch (error) {
      console.error("Error al obtener los negocios:", error);
    }
  };

  useEffect(() => {
    get_Negocios();
  }, []);

  return (
    <div>
      <Navbar navigation={[{ name: "Inicio ", href: "/menuAfiliado", current: false }]} logo="/image/logoblanco.png" />
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Gestiona tu negocio</h1>
        <div className="sm:overflow-x-auto">
          <table className="table-auto border-collapse border border-black min-w-full w-12">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Id</th>
                <th className="border border-black px-4 py-2">Nombre</th>
                <th className="border border-black px-4 py-2">Nit</th>
                <th className="border border-black px-4 py-2">Informacion</th>
                <th className="border border-black px-4 py-2">Ubicacion</th>
                <th className="border border-black px-4 py-2">Categoria</th>
                <th className="border border-black px-4 py-2">Calificacion</th>
                <th className="border border-black px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {negocios.length > 0 ? (
                negocios.map((negocio) => (
                  <tr key={negocio.id_lugar}>
                    <td className="border border-black px-4 py-2">{negocio.id_lugar}</td>
                    <td className="border border-black px-4 py-2">{negocio.nombre}</td>
                    <td className="border border-black px-4 py-2">{negocio.nit}</td>
                    <td className="border border-black px-4 py-2">{negocio.informacion}</td>
                    <td className="border border-black px-4 py-2">{negocio.ubicacion}</td>
                    <td className="border border-black px-4 py-2">{negocio.categoria}</td>
                    <td className="border border-black px-4 py-2">{negocio.calificacion}</td>
                    <td className="border border-black px-4 py-2">
                      <button onClick={() => console.log("Editar", negocio.id_lugar)} className="text-blue-700 mr-10">
                        <FaEdit />
                      </button>
                      <button onClick={() => console.log("Eliminar", negocio.id_lugar)} className="text-red-700">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center border border-black py-4">
                    No hay negocios disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
