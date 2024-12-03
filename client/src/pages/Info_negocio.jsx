import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
    infoLugar, 
    getPlaceUserReview, 
    postReview, 
    updateReview, 
    deleteReview, 
    getPlaceReviews, 
    getUsuariosRequest 
} from "../api/auth";
import Navbar from "../components/Navbar";
import MapViewNegocio from "../components/MapViewNegocio";
import { LOCAL_STORAGE_TERMS } from "../Constants";
import Ruleta from "../components/Ruleta";
import AlertaEstetica from "../components/AlertaRuleta";

const handleShare = () => {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({
      title: businessData?.nombre || "Consulta esta página",
      text: "¡Mira este lugar interesante que encontré!",
      url,
    }).catch((error) => console.error("Error al compartir:", error));
  } else {
    navigator.clipboard.writeText(url).then(() => {
      alert("El enlace ha sido copiado al portapapeles.");
    });
  }
};


// Componente para la calificación con estrellas
const StarRating = ({ calificacion, setCalificacion }) => {
  const handleClick = (index) => {
    setCalificacion(index + 1);
  };

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          onClick={() => handleClick(index)}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 cursor-pointer ${
            index < calificacion ? "text-yellow-500" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.293 2.788 1.014-5.93-4.301-4.1 5.944-.875L10 1l2.636 5.883 5.944.875-4.3 4.1 1.014 5.93L10 15z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

export default function InfoNegocio() {
  const { id: id_lugar } = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [review, setReview] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigation = [{ name: "Inicio", href: "/menuCliente", current: true }];
  const [showRuleta, setShowRuleta] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [ruletaResult, setRuletaResult] = useState(null);
  const [showAlerta, setShowAlerta] = useState(false);
  // Definir fetchData fuera de useEffect para que sea accesible en todo el componente
  const fetchData = async () => {
    try {
      const res = await infoLugar(id_lugar);
      setBusinessData(res.data[0]);

      const id_usuario = localStorage.getItem(
        LOCAL_STORAGE_TERMS.ID_LOGGED_USER
      );
      const userReviewData = await getPlaceUserReview(id_lugar, id_usuario);

      if (userReviewData.data && userReviewData.data.length > 0) {
        setUserReview(userReviewData.data[0]);
        setReview(userReviewData.data[0].review);
        setCalificacion(userReviewData.data[0].calificacion);
      } else {
        setUserReview(null);
      }

      const allReviewsData = await getPlaceReviews(id_lugar);

      // Agregar nombres de usuarios a cada reseña
      const reviewsWithUserNames = await Promise.all(
        allReviewsData.data.map(async (review) => {
          const userResponse = await getUsuariosRequest(review.id_usuario);
          return {
            ...review,
            nombre_usuario: `${userResponse.data.nombre} ${userResponse.data.apellido}`,
          };
        })
      );
      setReviews(reviewsWithUserNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id_lugar]);

  const handleSubmitReview = async () => {
    const id_usuario = localStorage.getItem(LOCAL_STORAGE_TERMS.ID_LOGGED_USER);
    const reviewData = { review, calificacion, id_usuario };

    try {
      if (userReview) {
        await updateReview(reviewData, id_lugar);
        setMessage("¡Reseña actualizada con éxito!");
      } else {
        await postReview(reviewData, id_lugar);
        setUserReview(reviewData);
        setMessage("¡Reseña enviada con éxito!");
      }
      await fetchData(); // Volver a cargar los datos
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Error al enviar la reseña.");
    }
  };

  const handleDeleteReview = async () => {
    try {
      const id_usuario = localStorage.getItem(
        LOCAL_STORAGE_TERMS.ID_LOGGED_USER
      );
      const reviewData = { id_usuario };
      await deleteReview(reviewData, id_lugar);
      setUserReview(null);
      setReview("");
      setCalificacion(0);
      setMessage("¡Reseña eliminada con éxito!");
      await fetchData(); // Volver a cargar los datos
    } catch (error) {
      console.error("Error deleting review:", error);
      setMessage("Error al eliminar la reseña.");
    }
  };
  const handleRuletaClick = () => {
    if (!hasSpun) {
      setButtonVisible(false);
      setShowRuleta(true);
    }
  };
  const handleRuletaFinish = (resultado) => {
    setShowRuleta(false); // Ocultar la ruleta después de girar
    setHasSpun(true);
    setRuletaResult(resultado);
    setShowAlerta(true);
    console.log(resultado); // Marcar que ya fue girada
  };
  const closeAlerta = () => {
    setShowAlerta(false);
  };
  if (
    !businessData ||
    businessData.latitud === undefined ||
    businessData.longitud === undefined
  ) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
      <div className="relative min-h-screen flex flex-col items-center bg-gray-300 p-4 md:p-8">
        <div className="relative max-w-6xl w-full bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
          {/* Columna Izquierda - Información del lugar */}
          <div className="w-full md:w-1/2 p-4 md:p-8 space-y-4 md:space-y-8">
            <div className="h-48 md:h-64 bg-gray-200 relative mb-4 md:mb-6">
              <img
                src={businessData.images}
                alt={businessData.nombre}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute bottom-4 left-4 text-white font-semibold text-lg md:text-2xl">
                {businessData.nombre}
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 md:mb-4">
                {businessData.nombre}
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {businessData.informacion}
              </p>
            </div>

            <div className="space-y-4 mt-6 md:mt-8">
              <h3 className="text-lg md:text-xl font-semibold">
                Añadir Reseña y Calificación
              </h3>

              <StarRating
                calificacion={calificacion}
                setCalificacion={setCalificacion}
              />

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Escribe tu reseña aquí..."
                className="border p-2 mt-2 rounded w-full"
              />

              <button
                onClick={handleSubmitReview}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto"
              >
                {userReview ? "Actualizar Reseña" : "Enviar Reseña"}
              </button>

              {userReview && (
                <button
                  onClick={handleDeleteReview}
                  className="mt-2 bg-red-600 text-white py-2 px-4 rounded w-full md:w-auto"
                >
                  Eliminar Reseña
                </button>
              )}

              {message && <p className="text-green-600 mt-2">{message}</p>}

              <div className="mt-4">
                <button
                  onClick={handleShare}
                  className="bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Compartir este lugar
                </button>
              </div>

            </div>
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-semibold">
                Comentarios/Calificaciones del lugar
              </h3>
              <div className="space-y-4 mt-4">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-xl">
                      <p className="text-sm text-gray-600">{review.review}</p>
                      <div className="flex items-center mt-2">
                        <StarRating
                          calificacion={review.calificacion}
                          setCalificacion={() => {}}
                        />
                        <span className="ml-2 text-gray-500">
                          Por {review.nombre_usuario}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay reseñas aún.</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <MapViewNegocio
              latitude={businessData.latitud}
              longitude={businessData.longitud}
              onLocationChange={(location) =>
                console.log("Nueva ubicación:", location)
              }
            />
          </div>
          {buttonVisible && (
            <div className="absolute bottom-0 right-0">
              <button
                style={{
                  width: "260px",
                  height: "260px",
                  background:
                    'transparent url("/image/ruletica.gif") center/contain no-repeat',
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Botón de Ruleta"
                onClick={handleRuletaClick}
              />
            </div>
          )}
          {showRuleta && (
            <div className="absolute bottom-0 right-0 items-center justify-center ">
              <div className="p-4">
                <Ruleta onFinish={handleRuletaFinish} />
              </div>
            </div>
          )}
          {showAlerta && (
            <AlertaEstetica
              mensaje={`¡Has ganado: ${ruletaResult}`}
              onClose={closeAlerta}
            />
          )}
        </div>
      </div>
    </>
  );
}
