import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { registerUserRequest, registerClientRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export default function RegisterClient() {
  const { register, handleSubmit, reset } = useForm(); // Incluye reset en useForm
  const navigate = useNavigate(); // Inicializa useNavigate

  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: false },
    { name: "Registrarse", href: "/register", current: true },
    { name: "Acerca", href: "#", current: false },
  ];

  return (
    <div className="bg-[url('../image/fondo.jpg')] bg-cover bg-center min-h-screen w-full">
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-10 text-center text-3xl font-extrabold text-gray-900">
              Crea tu cuenta en Mi-Ruta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(async (values) => {
              try {
                console.log(values);
                const res = await registerUserRequest(values);
                console.log(res);
                const id_usuario = res.data.id; // Extrae el ID de la respuesta

                // Datos adicionales para la segunda consulta
                const data_consulta = {
                  id_usuario: id_usuario, // Incluye el ID obtenido
                };
                console.log(data_consulta);
                const res2 = await registerClientRequest(data_consulta);
                console.log(res2);

                // Redirecciona a otra página después del registro exitoso
                navigate("/registerClient"); // Cambia la ruta según sea necesario

                // Limpia los campos del formulario
                reset(); // Resetea los campos del formulario
              } catch (error) {
                console.error("Error al registrar:", error);
              }
            })}
            action="#"
            method="POST"
            className="mt-8 space-y-6 bg-[rgba(255,255,255,0.5)] p-8 shadow-md rounded-lg"
          >
            {/* Campo oculto tipo_usuario */}
            <input
              type="hidden"
              value="cliente"
              {...register("tipo_usuario")}
            />

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
                  autoComplete="given-name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Name"
                  {...register("nombre", { required: true })}
                />
              </div>
            </div>

            {/* Apellido */}
            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <div className="mt-1">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  autoComplete="family-name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Last name"
                  {...register("apellido", { required: true })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <div className="1k 1x abn">
              <div className="lx of zg">
                <input
                  id="same-as-shipping"
                  name="same-as-shipping "
                  type="checkbox"
                  className="oc se adw agc ayn bnt"
                />{" "}
                <label className=" text-sm font-medium text-gray-700">
                  {"Acepta los términos y condiciones"}
                </label>
              </div>
            </div>

            {/* Botón de registro */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}