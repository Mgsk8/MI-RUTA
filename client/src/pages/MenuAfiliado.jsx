import React, { useState, useEffect } from "react";
import { getNegocios, getNegocio_afiliado } from "../api/auth";
import { deleteNegocios } from "../api/auth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


export default function MenuAfiliado() {
  const [negocios, setNegocios] = useState([]);
  const navigate = useNavigate();
  
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

  const delete_negocios = async (id_lugar) => {
    try {
      const res = await deleteNegocios(id_lugar);
      getNegocios();
    } catch (error) {
      console.log("No se pudo eliminar el negocio");
    }
  };

  const handleEdit = (id_lugar) => {
    navigate(`/editarNegocio/${id_lugar}`); // Redirigir a la página de edición
  };

  useEffect(() => {
    get_Negocios();
  }, []);

  return (
    <div>
      <Navbar
        navigation={[
          { name: "Inicio ", href: "/menuAfiliado", current: true },
          {
            name: "Registrar Negocio",
            href: "/registerCompany",
            current: false,
          },
        ]}
        logo="/image/logoblanco.png"
      />
      <div className="bg-cover bg-center min-h-screen w-full">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-2xl md:text-4xl text-black-50 font-bold mb-4 text-center">
            Gestiona tu negocio
          </h1>
          <br />
          <div className="">
            <table className="table">
              <thead className=" ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Información
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Latitud
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Longitud
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Categoría
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Calificación
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {negocios.length > 0 ? (
                  negocios.map((negocio) => (
                    <tr
                      className=" "
                      key={negocio.id_lugar}
                    >
                      <td className="px-6 py-4">{negocio.id_lugar}</td>
                      <td className="px-6 py-4">{negocio.nombre}</td>
                      <td className="px-6 py-4">{negocio.informacion}</td>
                      <td className="px-6 py-4">{negocio.latitud}</td>
                      <td className="px-6 py-4">{negocio.longitud}</td>
                      <td className="px-6 py-4">{negocio.categorias}</td>
                      <td className="px-6 py-4">{negocio.calificacion}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleEdit(negocio.id_lugar)}
                          className="text-blue-600 hover:text-blue-800 mx-2"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => delete_negocios(negocio.id_lugar)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar"
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
                      className="text-center border py-4"
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
