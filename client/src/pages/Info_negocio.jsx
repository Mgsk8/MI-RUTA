import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { infoLugar } from "../api/auth";
import Navbar from "../components/Navbar";

export default function InfoNegocio() {
  const { id } = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const navigation = [{ name: "Inicio", href: "/menuCliente", current: true }];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await infoLugar(id);
        setBusinessData(res.data[0]);
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!businessData) return <p>Cargando...</p>;

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí iría el código para enviar la reseña
      setMessage("Reseña enviada con éxito.");
    } catch (error) {
      setMessage("Hubo un error al enviar la reseña. Inténtalo de nuevo.");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
    
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
        {/* Contenedor principal */}
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Imagen del lugar */}
          <div className="h-80 bg-gray-200 relative">
            <img
              src={businessData.images}
              alt={businessData.nombre}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-4 left-4 text-white font-semibold text-2xl">{businessData.nombre}</div>
          </div>

          <div className="p-8 space-y-8">
            {/* Nombre y descripción */}
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{businessData.nombre}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{businessData.informacion}</p>
            </div>

            {/* Calificación */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-800 font-semibold text-lg">Calificación:</label>
                <div className="flex items-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      filled={star <= rating}
                      onClick={() => handleRating(star)}
                    />
                  ))}
                </div>
              </div>

              {/* Reseña */}
              <div>
                <label className="text-gray-800 font-semibold text-lg">Reseña:</label>
                <textarea
                  className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="4"
                  placeholder="Escribe tu reseña aquí..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>

              {/* Botón para enviar reseña */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Enviar Reseña
              </button>

              {/* Mensaje de confirmación o error */}
              {message && (
                <p
                  className={`mt-4 text-lg ${message.includes("éxito") ? "text-green-500" : "text-red-500"}`}
                >
                  {message}
                </p>
              )}
            </div>

            {/* Mapa del lugar */}
            <div className="bg-gray-200 h-72 rounded-xl flex items-center justify-center shadow-md">
              <p className="text-gray-500 italic">Mapa del lugar (próximamente)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Star({ filled, onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "orange" : "gray"}
      className="w-8 h-8 cursor-pointer hover:scale-110 transition-all duration-200"
    >
      <path d="M12 .587l3.668 7.431 8.214 1.196-5.941 5.788 1.404 8.198L12 18.896l-7.345 3.863 1.404-8.198L.118 9.214l8.214-1.196z" />
    </svg>
  );
}
