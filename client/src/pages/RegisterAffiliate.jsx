import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { registerUserRequest, registerAfiRequest } from "../api/auth.js";
import { validateEmail,validatePassword, validateCheckbox} from "../../validation/validations.js";
import { AUTH_TYPES } from "../Constants.jsx";

export default function RegisterAffiliate() {
  localStorage.setItem("auth", AUTH_TYPES.FALSE);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: false },
    { name: "Registrarse", href: "/register", current: true },
    { name: "Contacto", href: "/contact", current: false },
    { name: "Acerca", href: "/acercade", current: false },
  ];

  return (
    <div className="bg-[url('../image/fondo.jpg')] bg-cover bg-center min-h-screen w-full">
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
      <br />
      <br />
      <br />

      <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="custom-div p-4 rounded-lg shadow-md">
          <div>
            <h2 className="mt-0 text-center text-3xl font-extrabold">
              Crea tu cuenta en Mi-Ruta
            </h2>
            <p className="mt-2 text-center text-sm">
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
              console.log(values);
              const res = await registerUserRequest(values);
              console.log(res);
              const id_usuario = res.data.id; // Extrae el ID de la respuesta
              const data_consulta = {
                id_usuario: id_usuario,
                cedula: values.cedula,
              };
              console.log(data_consulta);
              const res2 = await registerAfiRequest(data_consulta);
              console.log(res2);
            })}
            method="POST"
            className="mt-8 space-y-6  p-8 shadow-md rounded-lg"
          >
            {/* Campo oculto tipo_usuario */}
            <input
              type="hidden"
              value="afiliado"
              {...register("tipo_usuario")}
            />

            {/* Cedula */}
            <div>
              <label
                htmlFor="cedula"
                className="block text-sm font-medium"
              >
                Cédula
              </label>
              <div className="mt-1">
                <input
                  id="cedula"
                  name="cedula"
                  type="number"
                  autoComplete="off"
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none  sm:text-sm"
                  placeholder="Document"
                  {...register("cedula", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.cedula && (
                  <p className="text-red-500 text-xs italic">
                    {errors.cedula.message}
                  </p>
                )}
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="given-name"
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none sm:text-sm"
                  placeholder="Name"
                  {...register("nombre", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs italic">
                    {errors.nombre.message}
                  </p>
                )}
              </div>
            </div>

            {/* Apellido */}
            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium "
              >
                Apellido
              </label>
              <div className="mt-1">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="family-name"
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                  placeholder="Last Name"
                  {...register("apellido", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.apellido && (
                  <p className="text-red-500 text-xs italic">
                    {errors.apellido.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none`}
                  placeholder="Email"
                  {...register("email", {
                    required: "Este campo es obligatorio",
                    validate: validateEmail,
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium"
              >
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none `}
                  placeholder="Password"
                  {...register("password", {
                    required: "Este campo es obligatorio",
                    validate: validatePassword,
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mr-2"
                {...register("terms", { validate: validateCheckbox })}
              />
              <label className="text-sm ">
                <a href="/terms" target="_blank">
                He leído y acepto los términos y condiciones{''}</a>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs italic">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Botón de registro */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2"
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
