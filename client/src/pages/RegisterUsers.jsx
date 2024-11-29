import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { AUTH_TYPES } from "../Constants";

export default function RoleSelection() {
  localStorage.setItem("auth", AUTH_TYPES.FALSE);
  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: false },
    { name: "Registrarse", href: "/register", current: true },
    { name: "Acerca", href: "#", current: false },
  ];

  return (

    <div className="min-h-screen  from-gray-900 via-gray-800 to-gray-700 flex flex-col bg-[url('../image/fondoRegister.jpg')] bg-cover  w-full">


      <Navbar navigation={navigation} logo="/image/logoblanco.png" />

      <div className="flex flex-1 flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full p-10 rounded-lg shadow-lg text-center custom-div">
          <h2 className="text-4xl font-extrabold mb-4">
            Selecciona tu rol
          </h2>
          <p className=" mb-6">
            Por favor, selecciona si eres un afiliado o un cliente para
            continuar.
          </p>

          {/* Botones */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Botón Afiliado */}
            <Link
              to="/registerAffiliate" // Ruta para Afiliado
              className="w-full py-3 px-6 text-lg font-medium rounded-md bg-indigo-600 hover:bg-indigo-500 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
            >
              Afiliado
            </Link>

            {/* Botón Cliente */}
            <Link
              to="/registerClient" // Ruta para Cliente
              className="w-full py-3 px-6 text-lg font-medium rounded-md bg-green-600 hover:bg-green-500 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
            >
              Cliente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
