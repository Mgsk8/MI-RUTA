import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getNegocio_, actualizarNegocio } from "../api/auth";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function EditarNegocio() {
  const { id_lugar } = useParams();
  const { register, handleSubmit, setValue,} = useForm();
  const [negocio, setNegocio] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatosNegocio = async () => {
      try {
        const res = await getNegocio_(id_lugar);
        const negocio = res.data;
        console.log("Datos del negocio obtenidos:", negocio);
  
        if (negocio) {
          // Configurar los valores del formulario solo si los datos existen
          setValue("nombre", negocio[0].nombre || "");
          setValue("informacion", negocio[0].informacion || "");
          setValue("latitud", negocio[0].latitud|| "");
          setValue("longitud", negocio[0].longitud || "");

        } else {
          setResultMessage("No se encontraron datos del negocio.");
        }
      } catch (error) {
        console.error("Error al cargar los detalles del negocio:", error);
        setResultMessage("Error al cargar los detalles del negocio.");
      } finally {
        setLoading(false);
      }
    };
  
    if (id_lugar) {
      cargarDatosNegocio();
    }
  }, [id_lugar, setValue]); 
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const response = await actualizarNegocio(id_lugar, values);
      if (response.status === 200) {
        setResultMessage("¡Negocio actualizado exitosamente!");
      } else {
        setResultMessage("Error al actualizar el negocio.");
      }
    } catch (error) {
      console.error("Error en el proceso de actualización", error);
      setResultMessage("Error al actualizar el negocio.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar
        navigation={[{ name: "Editar Negocio", href: "/editCompany", current: true }]}
        logo="/Image/logoblanco.png"
      />
      <div className="flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Editar Negocio</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-4 bg-white p-6 shadow-md rounded-lg w-full max-w-lg"
        >
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              {...register("nombre", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="informacion" className="block text-sm font-medium text-gray-700">
              Información
            </label>
            <textarea
              id="informacion"
              name="informacion"
              {...register("informacion", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="latitud" className="block text-sm font-medium text-gray-700">
              Latitud
            </label>
            <input
              id="latitud"
              name="latitud"
              type="text"
              readOnly
              {...register("latitud")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="longitud" className="block text-sm font-medium text-gray-700">
              Longitud
            </label>
            <input
              id="longitud"
              name="longitud"
              type="text"
              readOnly
              {...register("longitud")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Actualizar Negocio
          </button>
        </form>

        {resultMessage && (
          <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-md">
            {resultMessage}
          </div>
        )}
      </div>
    </div>
  );
}
