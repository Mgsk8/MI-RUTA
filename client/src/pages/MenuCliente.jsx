import { useState, useEffect } from "react";
import { getNegocios } from "../api/auth";
import { ButtonList } from "../components/ButtonList";
import { Category } from "../components/Category";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

export default function MenuCliente() {
  const [categories, setCategories] = useState(["All"]);
  const [lugares, setLugares] = useState([]);
  const [filteredLugares, setFilteredLugares] = useState([]);
  const navigation = [{ name: "Inicio", href: "/menuCliente", current: true }];
  const navigate = useNavigate(); // Para redirigir al usuario

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
    navigate(`/infoNegocio/${id}`); // Redirige a la página de InfoNegocio
  };

  return (
    <>
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 via-gray-600 to-gray-500">
        <div className="max-w-5xl w-full text-white py-10 px-6 rounded-lg shadow-2xl bg-gray-800 bg-opacity-80">
          <div className="text-center mt-10 mb-6">
            <h1 className="text-4xl font-extrabold tracking-widest text-cyan-300 uppercase">
              Filtrar <span className="text-orange-500">Lugares</span>
            </h1>
            <p className="text-gray-300 text-base mt-4 italic tracking-wide leading-relaxed">
              Explora los{" "}
              <span className="text-orange-400 font-bold">mejores lugares</span>{" "}
              a tu disposición
            </p>
          </div>
          <ButtonList categories={categories} filterCategory={filterCategory} />
          <hr className="my-6 border-gray-600" />
          <Category lugares={filteredLugares} onLugarClick={goToInfoNegocio} />
        </div>
      </div>
    </>
  );
}
