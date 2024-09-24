import { registerPlaceRequest, registerCompanyRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RegistroNegocio() {
    const { register, handleSubmit } = useForm();
    const navigation = [
        { name: "Inicio", href: "/menuAfiliado", current: false },
        { name: "Registrar Negocio", href: "/registerCompany", current: true },
        { name: "Editar Negocio", href: "/editCompany", current: false },
    ];

    return (
        <>
            <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
            <div className="bg-[url('../image/fondoRegisterCompany.jpg')] bg-cover bg-center min-h-screen w-full">
                <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="bg-[rgba(255,255,255,0.9)] p-4 rounded-md">
                            <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
                                Registrar Negocio
                            </h2>
                        </div>

                        <form
                            onSubmit={handleSubmit(async (values) => {
                                console.log(values);
                                const res = await registerPlaceRequest(values);
                                console.log(res);
                                const id_negocio = res.data.id; // Extrae el ID de la respuesta
                                // Datos adicionales para la segunda consulta
                                const data_consulta = {
                                    id_negocio: id_negocio, // Incluye el ID obtenido
                                    nit: values.nit,
                                    id_afiliado: values.id,
                                };
                                console.log(data_consulta);
                                const res2 = await registerCompanyRequest(data_consulta);
                                console.log(res2);
                            })}
                            //action="#"
                            method="POST"
                            className="mt-8 space-y-6 bg-[rgba(255,255,255,0.9)] p-8 shadow-md rounded-lg"
                        >

                            {/* Nombre */}
                            <div>
                                <label
                                    htmlFor="nombre"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nombre
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        required
                                        autoComplete="given-name"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...register("nombre", { required: true })}
                                    />
                                </div>
                            </div>

                            {/* Información */}
                            <div>
                                <label
                                    htmlFor="apellido"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Información
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="informacion"
                                        name="informacion"
                                        type="textarea"
                                        required
                                        autoComplete="family-name"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...register("informacion", { required: true })}
                                    />
                                </div>
                            </div>

                            {/* Ubicacion */}
                            <div>
                                <label
                                    htmlFor="ubicacion"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ubicación
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="ubicacion"
                                        name="ubicacion"
                                        type="ubicacion"
                                        required
                                        autoComplete="ubicacion"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...register("ubicacion", { required: true })}
                                    />
                                </div>
                            </div>

                            {/* Categoria */}
                            <div>
                                <input
                                    id="categoria"
                                    name="categoria"
                                    type="hidden"
                                    value="Negocio"
                                    {...register("categoria", { required: true })}
                                />
                            </div>

                            {/* Calificacion */}
                            <div>
                                <input
                                    id="calificacion"
                                    name="calificacion"
                                    type="hidden"
                                    value="0"
                                    {...register("calificacion", { required: true })}
                                />
                            </div>

                            {/* Nit */}
                            <div>
                                <label
                                    htmlFor="nit"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nit
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="nit"
                                        name="nit"
                                        type="text"
                                        required
                                        autoComplete="given-name"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...register("nit", { required: true })}
                                    />
                                </div>
                            </div>

                            {/* Botón de registro */}
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Crear negocio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
