import { useState, useEffect } from "react";
import { getNegocios } from "../api/auth";
import { ButtonList } from "../components/ButtonList";
import { Category } from "../components/Category";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Icono para el filtro
// import "../../style/style.css";

export default function MenuCliente() {
  const [categories, setCategories] = useState(["All"]);
  const [lugares, setLugares] = useState([]);
  const [filteredLugares, setFilteredLugares] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda por nombre
  const [ratingFilter, setRatingFilter] = useState(0); // Estado para el filtro de calificación mínima
  const [showRatingFilter, setShowRatingFilter] = useState(false); // Controla la visibilidad del filtro de calificación
  const navigation = [{ name: "Menú", href: "/menuCliente", current: true}];
  const navigate = useNavigate();

  const fetchLugares = async () => {
    try {
      const res = await getNegocios();
      const lugares = res.data;
      const allCategories = [
        "All",
        ...new Set(lugares.map((lugar) => lugar.categorias)),
      ];

      setCategories(allCategories);
      setLugares(lugares);
      setFilteredLugares(lugares);
    } catch (error) {
      console.error("Error fetching lugares: ", error);
    }
  };

  useEffect(() => {
    fetchLugares();
  }, []);

  const filterCategory = (category) => {
    if (category === "All") {
      setFilteredLugares(lugares);
    } else {
      const filtered = lugares.filter((lugar) => lugar.categorias === category);
      setFilteredLugares(filtered);
    }
  };

  const goToInfoNegocio = (id) => {
    navigate(`/infoNegocio/${id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingFilter = (e) => {
    setRatingFilter(Number(e.target.value));
  };

  useEffect(() => {
    let filtered = lugares;

    if (searchTerm) {
      filtered = filtered.filter((lugar) =>
        lugar.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter > 0) {
      filtered = filtered.filter((lugar) => lugar.calificacion == ratingFilter);
    }

    setFilteredLugares(filtered);
  }, [searchTerm, ratingFilter, lugares]);

  return (
    <>
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full  px-6  bg-opacity-80">
          <div className="text-center mt-10 mb-6">
            <h1 className="text-4xl font-extrabold tracking-widest text-cyan-300 uppercase">
              Filtrar <span className="text-orange-500">Lugares</span>
            </h1>
            <p className="text-base mt-4 italic tracking-wide leading-relaxed">
              Explora los{" "}
              <span className="text-orange-400 font-bold">mejores lugares</span>{" "}
              a tu disposición
            </p>
          </div>

          {/* Campo de búsqueda con icono de filtro */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 pr-10 rounded  focus:outline-none focus:ring-2 "
            />
            <FaStar
              onClick={() => setShowRatingFilter(!showRatingFilter)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2  cursor-pointer"
            />
          </div>

          {/* Filtro de calificación (visible solo si se selecciona el icono de filtro) */}
          {showRatingFilter && (
            <div className="mb-4">
              <label htmlFor="ratingFilter" className="mr-2">
                Filtrar por calificación mínima:
              </label>
              <select
                id="ratingFilter"
                value={ratingFilter}
                onChange={handleRatingFilter}
                className="p-2 rounded "
              >
                <option value={0}>Todas</option>
                <option value={1}>1 estrella</option>
                <option value={2}>2 estrellas</option>
                <option value={3}>3 estrellas</option>
                <option value={4}>4 estrellas</option>
                <option value={5}>5 estrellas</option>
              </select>
            </div>
          )}

          <ButtonList categories={categories} filterCategory={filterCategory} />
          <hr className="my-6 " />
          <Category lugares={filteredLugares} onLugarClick={goToInfoNegocio} />
        </div>
      </div>
    </>
  );
}
