import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { registerUserRequest, registerClientRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom"; 
import { validateEmail, validatePassword, validateCheckbox } from "../../validation/validations.js"; 

export default function RegisterClient() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

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
                const res = await registerUserRequest(values);
                const id_usuario = res.data.id;
                const data_consulta = { id_usuario: id_usuario };
                await registerClientRequest(data_consulta);
                navigate("/registerClient");
                reset();
              } catch (error) {
                console.error("Error al registrar:", error);
              }
            })}
            className="mt-8 space-y-6 bg-[rgba(255,255,255,0.5)] p-8 shadow-md rounded-lg"
          >
            <input
              type="hidden"
              value="cliente"
              {...register("tipo_usuario")}
            />

            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <div className="mt-1">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="given-name"
                  className={`appearance-none block w-full px-3 py-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Name"
                  {...register("nombre", { required: "Este campo es obligatorio" })}
                />
                {errors.nombre && <p className="text-red-500 text-xs italic">{errors.nombre.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <div className="mt-1">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="family-name"
                  className={`appearance-none block w-full px-3 py-2 border ${errors.apellido ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Last name"
                  {...register("apellido", { required: "Este campo es obligatorio" })}
                />
                {errors.apellido && <p className="text-red-500 text-xs italic">{errors.apellido.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Email"
                  {...register("email", { required: "Este campo es obligatorio", validate: validateEmail })}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Password"
                  {...register("password", { required: "Este campo es obligatorio", validate: validatePassword })}
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
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
              <label className="text-sm font-medium text-gray-700">
                <a href="/terms" target="_blank">
                He leído y acepto los términos y condiciones{''}</a>
              </label>
              {errors.terms && <p className="text-red-500 text-xs italic">{errors.terms.message}</p>}
            </div>

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
