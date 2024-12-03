import Navbar from "../components/Navbar";
import { AUTH_TYPES } from "../Constants";
import { useState, useEffect } from "react";
export default function Inicio() {
  localStorage.setItem("auth", AUTH_TYPES.FALSE);
  const navigation = [
    { name: "Inicio", href: "/", current: true },
    { name: "Iniciar sesión", href: "/login", current: false },
    { name: "Registrarse", href: "/register", current: false },
    { name: "Contacto", href: "/contact", current: false },
  ];

  const slides = [
    {
      id: 1,
      title: "Descubre lugares increíbles",
      description: "Explora los mejores restaurantes, parques y atracciones de tu ciudad.",
      image: "/public/image/slider1.jpg",
    },
    {
      id: 2,
      title: "Ofertas exclusivas",
      description: "Encuentra descuentos especiales en los negocios locales.",
      image: "/public/image/slider2.jpg",
    },
    {
      id: 3,
      title: "Conecta con la comunidad",
      description: "Descubre eventos y actividades que ocurren cerca de ti.",
      image: "/public/image/slider3.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Cambio automático del slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Cambia la imagen cada 2 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [slides.length]);

  return (
    <div>
      <Navbar navigation={navigation} logo="/image/logoblanco.png" />

      {/* Slider */}
      <div className="relative w-full h-96 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg mb-6">{slide.description}</p>
            </div>
          </div>
        ))}

        {/* Controles manuales del slider */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50  p-2 rounded-full hover:bg-opacity-70"
        >
          {"<"}
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
        >
          {">"}
        </button>
      </div>

      {/* Contenido adicional */}
      <div class="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div class="absolute inset-0 -z-10 overflow-hidden">
          <svg class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
              <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="lg:pr-4">
              <div class="lg:max-w-lg">
                <p class="text-base/7 font-semibold ">Bienvenidos a</p>
                <h1 class="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">Mi Ruta</h1>
                <p class="mt-6 text-xl/8 ">Explora y descubre nuevos lugares</p>
              </div>
            </div>
          </div>
          <div class="-ml-12 -mt-12 p-12  lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img class="w-[48rem] max-w-none rounded-xl  shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src="https://flowbite.com/images/custom-development/landing-2.svg" alt=""/>
          </div>
          <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="lg:pr-4">
              <div class="max-w-xl text-base/7  lg:max-w-lg">
                <p>Utiliza Mi Ruta para conectarte con los mejores comercios y
            actividades en tu municipio. ¡No te pierdas las ofertas y
            descuentos exclusivos!</p>
                <ul role="list" class="mt-8 space-y-8 ">
                  <li class="flex gap-x-3">
                    <svg class="mt-1 size-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clip-rule="evenodd" />
                    </svg>
                    <span><strong class="font-semibold ">Mi Ruta</strong>  es una aplicación que permite ofrecer a los usuarios
                    información sobre lugares y comercios en el municipio (ciudad).</span>
                  </li>
                  <li class="flex gap-x-3">
                    <svg class="mt-1 size-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
                    </svg>
                    <span><strong class="font-semibold ">Facilita</strong> la conexión entre los negocios locales y el usuario
                    (turista).</span>
                  </li>
                  <li class="flex gap-x-3">
                    <svg class="mt-1 size-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                      <path fill-rule="evenodd" d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clip-rule="evenodd" />
                    </svg>
                    <span><strong class="font-semibold ">Ofrece Cupones</strong> de descuento para mantener a los turistas y
                        personas locales conectadas con la aplicación, y permite que, por
                        medio de la aplicación, aumenten las ventas y las visitas en el lugar.</span>
                  </li>
                </ul>
                <p class="mt-8">Mi Ruta es una aplicación diseñada para conectar a las personas con los mejores lugares de su ciudad, incluyendo restaurantes, parques, atracciones y eventos. Con un sistema de ubicación intuitivo, los usuarios pueden descubrir sitios cercanos, explorar ofertas exclusivas y planificar sus actividades de forma sencilla. La aplicación ofrece una experiencia visual atractiva, optimizada para dispositivos móviles, y busca fomentar el turismo local mientras conecta a las comunidades con las oportunidades que tienen a su alrededor."</p>
                <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900"></h2>
                <p class="mt-6"></p>
              </div>
            </div>
          </div>
        </div>
      </div>


      
      <footer class="bg-gray-900 w-full">
        <div class="w-full max-w-screen-x1 mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src="image/logoblanco.png" class="h-20" alt="Mi Ruta" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Mi Ruta</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
              <li><a href="#" class="hover:underline me-4 md:me-6">About</a></li>
              <li><a href="/terms" target="_black" class="hover:underline me-4 md:me-6">Privacy Policy</a></li>
              <li><a href="#" class="hover:underline me-4 md:me-6">Licensing</a></li>
              <li><a href="#" class="hover:underline">Contact</a></li>
            </ul>
          </div>
          <hr class="my-6  sm:mx-auto lg:my-8" />
          <span class="block text-sm text-gray-400 sm:text-center">© 2024 <a href="/" class="hover:underline">Mi Ruta™</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}
