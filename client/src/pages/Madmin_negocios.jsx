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
      <a href="/">
        <Navbar
        navigation={[
          { name: "Usuarios", href: "/menuAdmin", current: false },
          { name: "Visualizar negocios", href: "/menuAdmin_negocios", current: true },
          { name: "Registrar negocios", href: "/registerCompany_admin", current: false },
        ]}
        logo="/image/logoblanco.png"
      /></a>
      <div className="min-h-screen w-full bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-2xl md:text-4xl text-gray-50 font-bold mb-4 text-center">Gestiona tu negocio</h1>
          <br />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table-auto text-sm text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white min-w-full w-12">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-blue-500">Id</th>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3 bg-blue-500">Informacion</th>
                  <th className="px-6 py-3">Latitud</th>
                  <th className="px-6 py-3 bg-blue-500">Longitud</th>
                  <th className="px-6 py-3">Categoria</th>
                  <th className="px-6 py-3 bg-blue-500">Calificacion</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {negocios.length > 0 ? (
                  negocios.map((negocio) => (
                    <tr className="bg-blue-600 border-b border-blue-400" key={negocio.id_lugar}>
                      <td className="px-6 py-4 text-base font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {negocio.id_lugar}
                      </td>
                      <td className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {negocio.nombre}
                      </td>
                      <td className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {negocio.informacion}
                      </td>
                      <td className="bpx-6 py-4 text-base font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {negocio.latitud}
                      </td>
                      <td className="bpx-6 py-4 text-base font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {negocio.longitud}
                      </td>
                      <td className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {negocio.categoria}
                      </td>
                      <td className="px-6 py-4 text-base font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {negocio.calificacion}
                      </td>
                      <td className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
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
