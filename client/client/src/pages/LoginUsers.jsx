import { loginRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from "../../validation/validations";  // Importar validaciones

export default function LoginUsers() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: true },
    { name: "Registrarse", href: "/register", current: false },
    { name: "Acerca", href: "#", current: false },
    { name: "administrador", href: "admin", current: false },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[url('../image/fondo.jpg')] bg-cover  w-full">
        <Navbar navigation={navigation} logo="/image/logoblanco.png" />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>
          <div className="max-w-md w-full mx-auto rounded-lg p-8 space-y-8 bg-[rgba(255,255,255,0.5)]">
            <h2 className="mt-5 text-center text-[30px] font-bold leading-9 tracking-tight text-gray-900">
              Inicia Sesión
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                onSubmit={handleSubmit(async (data) => {
                  try {
                    const res = await loginRequest(data);
                    console.log(data);
                    console.log(res);
                    const id_usuario= res.data.id_usuario;
                    localStorage.setItem("id_usuario_actual", id_usuario);
                    console.log(id_usuario);
                    if (res.status === 200) {
                      // Login exitoso, redirigir al dashboard o página principal
                      if (res.data.tipo_usuario == "administrador") {
                        navigate('/menuAdmin');
                      } else if (res.data.tipo_usuario == "afiliado") {
                        navigate('/menuAfiliado');
                      } else {
                        navigate('/menuCliente');
                      }
                    } else {
                      // Manejo de errores si el login no es exitoso
                      console.error('Error en login:', res.statusText);
                    }
                  } catch (error) {
                    console.error('Error en la consulta de login:', error);
                    // Manejo del error
                  }
                })}
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Correo Electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      {...register("email", { required: "Este campo es obligatorio", validate: validateEmail })}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Contraseña
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      {...register("password", { required: "Este campo es obligatorio", validate: validatePassword })}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                ¿Aún no te registras?{' '}
                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Registrarse
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
