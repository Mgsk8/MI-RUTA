import React, { useState, useEffect } from "react";
import { getNegocio_afiliado } from "../api/auth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function MenuAfiliado() {
  const [negocios, setNegocios] = useState([]);

  const get_Negocios = async () => {
    try {
      const id_usuario_actual = localStorage.getItem("id_usuario_actual");
      if (!id_usuario_actual) {
        console.log("No se encuentra el id del usuario");
      } else {
        const res = await getNegocio_afiliado(id_usuario_actual);
        if (Array.isArray(res.data)) {
          setNegocios(res.data);
        }
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
      <Navbar
        navigation={[
          { name: "Inicio ", href: "/", current: true },
          { name: "Registrar Negocio", href: "/registerCompany", current: false },
          { name: "Editar Negocio", href: "/editCompany", current: false },
        ]}
        logo="/image/logoblanco.png"
      />
      <div className="bg-gray-500 min-h-screen">
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-2xl md:text-4xl text-gray-50 font-bold mb-4 text-center">
            Gestiona tu negocio
          </h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm text-gray-500 dark:text-gray-100">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-2">Id</th>
                  <th scope="col" className="px-3 py-2">Nombre</th>
                  <th scope="col" className="px-4 py-2">Información</th>
                  <th scope="col" className="px-3 py-2">Latitud</th>
                  <th scope="col" className="px-3 py-2">Longitud</th>
                  <th scope="col" className="px-3 py-2">Categoría</th>
                  <th scope="col" className="px-1 py-2">Calificación</th>
                  <th scope="col" className="px-3 py-2">Nit</th>
                  <th scope="col" className="px-2 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {negocios.length > 0 ? (
                  negocios.map((negocio) => (
                    <tr key={negocio.id_lugar}>
                      <td className="border border-black px-4 py-2">{negocio.id_lugar}</td>
                      <td className="border border-black px-4 py-2">{negocio.nombre}</td>
                      <td className="border border-black px-4 py-2">{negocio.informacion}</td>
                      <td className="border border-black px-4 py-2">{negocio.latitud}</td>
                      <td className="border border-black px-4 py-2">{negocio.longitud}</td>
                      <td className="border border-black px-4 py-2">{negocio.categoria}</td>
                      <td className="border border-black px-4 py-2">{negocio.calificacion}</td>
                      <td className="border border-black px-4 py-2">{negocio.negocio_nit}</td>
                      <td className="border border-black px-4 py-2">
                        <button onClick={() => console.log("Editar", negocio.id_lugar)} className="text-blue-700 mr-2">
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
                    <td colSpan="9" className="text-center border border-black py-4">
                      No hay negocios disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
