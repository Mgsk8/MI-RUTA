import React, { useState, useEffect } from "react";
import { getNegocios, deleteNegocios } from "../api/auth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function Madmin_negocios() {
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
  const delete_negocios = async (id_lugar) => {
    try {
      const res = await deleteNegocios(id_lugar);
      get_Negocios();
    } catch (error) {
      console.log("no se pudo eliminar el negocio")
    }

  }
  useEffect(() => {
    get_Negocios();
  }, []);


  return (
    <div>
        <Navbar
        navigation={[
          { name: "Usuarios", href: "/menuAdmin", current: false },
          { name: "Visualizar negocios", href: "/menuAdmin_negocios", current: true },
          { name: "Registrar negocios", href: "/registerCompany_admin", current: false },
        ]}
        logo="/image/logoblanco.png"
      />
      <div className="full-screen  bg-gray-200">
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-2xl md:text-4xl text-gray-50 font-bold mb-4 text-center">Gestiona tu negocio</h1>
          <br />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 ">Id</th>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3 ">Informacion</th>
                  <th className="px-6 py-3">Latitud</th>
                  <th className="px-6 py-3 ">Longitud</th>
                  <th className="px-6 py-3">Categoria</th>
                  <th className="px-6 py-3">Calificacion</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {negocios.length > 0 ? (
                  negocios.map((negocio) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={negocio.id_lugar}>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {negocio.id_lugar}
                      </td>
                      <td className="px-6 py-4">
                        {negocio.nombre}
                      </td>
                      <td className="px-6 py-4">
                        {negocio.informacion}
                      </td>
                      <td className="bpx-6 py-4">
                        {negocio.latitud}
                      </td>
                      <td className="bpx-6 py-4">
                        {negocio.longitud}
                      </td>
                      <td className="px-6 py-4">
                        {negocio.categoria}
                      </td>
                      <td className="px-6 py-4">
                        {negocio.calificacion}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => console.log("Editar", negocio.id_lugar)}
                          className="text-blue-700 mr-10"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            delete_negocios(negocio.id_lugar)

                          }
                          className="text-red-700"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center border border-black py-4"
                    >
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
