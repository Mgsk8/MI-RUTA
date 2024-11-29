import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { getNegocio_, actualizarNegocio } from "../api/auth";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategorySelect from "../components/CategorySelect.jsx";

export default function EditarNegocio() {
  const { id_lugar } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [negocio, setNegocio] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Actualiza el valor del formulario cada vez que se seleccionan categorías

  const categoriesList = ["Restaurantes", "Tiendas", "Servicios"];
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
          setValue("latitud", negocio[0].latitud || "");
          setValue("longitud", negocio[0].longitud || "");
          setValue("direccion_manual", negocio[0].direccion_manual || "");
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
      if (selectedCategories.length != 0) {
        values.categorias = selectedCategories.join(", ");
      }

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
        navigation={[
          { name: "Usuarios", href: "/menuAdmin", current: false },
          {
            name: "Visualizar negocios",
            href: "/menuAdmin_negocios",
            current: false,
          },
          {
            name: "Registrar negocios",
            href: "/registerCompany_admin",
            current: false,
          },
        ]}
        logo="/image/logoblanco.png"
      />
      <div className="flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold  mb-4">
        <br />
          Editar Negocio
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 space-y-2  p-6 shadow-md rounded-lg w-full max-w-lg"
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium "
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              {...register("nombre", { required: true })}
              className="mt-2 block w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label
              htmlFor="informacion"
              className="block text-sm font-medium"
            >
              Información
            </label>
            <textarea
              id="informacion"
              name="informacion"
              {...register("informacion", { required: true })}
              className="mt-2 block w-full border  rounded-md p-2"
            />
          </div>

          <div>
            <label
              htmlFor="latitud"
              className="block text-sm font-medium"
            >
              Latitud
            </label>
            <input
              id="latitud"
              name="latitud"
              type="text"
              readOnly
              {...register("latitud")}
              className="mt-1 block w-full border  rounded-md p-2"
            />
          </div>

          <div>
            <label
              htmlFor="longitud"
              className="block text-sm font-medium "
            >
              Longitud
            </label>
            <input
              id="longitud"
              name="longitud"
              type="text"
              readOnly
              {...register("longitud")}
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="direccion_manual"
              className="block text-sm font-medium "
            >
              Direccion manual
            </label>
            <input
              id="direccion_manual"
              name="direccion_manual"
              type="text"
              {...register("direccion_manual", { required: true })}
              className="mt-1 block w-full border  rounded-md p-2"
            />
          </div>
          <div>
            <label className="block ">
              Categorías del negocio:
            </label>
            <CategorySelect
              id="categorias"
              name="categorias"
              categories={categoriesList}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
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
