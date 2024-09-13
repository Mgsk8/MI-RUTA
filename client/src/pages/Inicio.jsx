import Navbar from "../components/Navbar"

export default function Inicio() {
  const navigation = [
    { name: 'Inicio', href: '/', current: true },
    { name: 'Iniciar sesion', href: '/login', current: false },
    { name: 'Registrarse', href: '/register', current: false },
    { name: 'Acerca', href: '#', current: false },
  ]

  return (
    <div>



      <Navbar navigation={navigation} logo='/image/logoblanco.png' />

      {/* Contenido de la vista de inicio */}
      {/* Banner de bienvenida con texto e imagen */}
      <div className="mt-0 bg-gray-800 p-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-white">
            Explora y descubre nuevos lugares
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Utiliza Mi Ruta para conectarte con los mejores comercios y
            actividades en tu municipio. ¡No te pierdas las ofertas y
            descuentos exclusivos!
          </p>
        </div>

        {/* Espacio para la imagen */}
        <div className="border-none mt-8 sm:mt-0 sm:ml-8 w-full sm:w-1/3">
          <img


            src="/image/mirutaMenuprincipal.png"

            alt="Descubre nuevos lugares"
            className="h-auto object-cover"
          />
        </div>
      </div>

      {/* Sección de información principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900">Bienvenido a Mi Ruta</h1>
        <p className="mt-6 text-lg text-gray-700">
          Mi Ruta es una aplicación que permite ofrecer a los usuarios
          información sobre lugares y comercios en el municipio (ciudad).
          Facilita la conexión entre los negocios locales y el usuario
          (turista), ofrece cupones de descuento para mantener a los turistas y
          personas locales conectadas con la aplicación, y permite que, por
          medio de la aplicación, aumenten las ventas y las visitas en el lugar.
        </p>
      </div>
    </div>
  )
}
