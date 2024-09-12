import Navbar from "../components/Navbar";

export default function LoginUsers() {
  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: true },
    { name: "Registrarse", href: "/register", current: false },
    { name: "Acerca", href: "#", current: false },
  ];
  return (
    <>
      <div className="bg-[url('../Image/fondo.jpg')] bg-cover  w-full">
          <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="/Image/logonegro.png"
              className="mx-auto  w-[130px] h-[130px]"
            />
          </div>
          <div className="max-w-md w-full mx-auto bg-white rounded-lg p-8 space-y-8 bg-[rgba(255,255,255,0.5)]" >
            <h2 className="mt-5 text-center text-[30px] font-bold leading-9 tracking-tight text-gray-900 ">
              Inicia Sesión
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
                  required
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Registrarse
            </a>
          </p>
        </div>
          </div>
      </div>
    </div>
        
    </>
  )
}

