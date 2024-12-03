import React from "react";
import Navbar from "../components/Navbar"; // Asegúrate de importar correctamente el componente Navbar

const AcercaDe = () => {
  const navigation = [{ name: "Inicio", href: "/", current: true }]; // Navegación para el Navbar

  return (
    <div className="acerca-de-container">
      {/* Navbar con botón para volver al inicio */}
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />

      <div className="content text-center py-10 px-6">
        <h1 className="text-4xl font-extrabold tracking-widest uppercase">
          Acerca de Nuestra Aplicación
        </h1>
        <p className="text-base mt-4 italic tracking-wide leading-relaxed">
          Mi Ruta es una aplicación diseñada para conectar turistas y locales
          con los negocios y lugares de interés en los municipios. A través de
          nuestra plataforma, los usuarios pueden descubrir:
          <br />
          Restaurantes, cafeterías y lugares turísticos.
          <br />
          Actividades disponibles en la ciudad.
          <br />
          Ofertas y cupones de descuento exclusivos.
        </p>

        {/* Botón para abrir el PDF */}
        <div className="mt-6">
          <a
            href="/Documentacion.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 mt-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            <span>Open PDF for More Info</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
