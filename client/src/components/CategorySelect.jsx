import { useState } from "react";
import PropTypes from "prop-types";

const categoriesList = [
    "Restaurantes",
    "Balnearios",
    "Bares",
    "Tiendas",
    "Hoteles",
    "Salones de Belleza",
    "Gimnasios",
    "Cafeterías",
    "Servicios de Transporte",
    "Centros Comerciales",
];

const CategorySelect = ({ selectedCategories, setSelectedCategories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subCategoryOpen, setSubCategoryOpen] = useState(null); // Estado para controlar subcategorías

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prevSelected) => {
            // Si se deselecciona una categoría, también eliminar subcategorías
            if (prevSelected.includes(category)) {
                // Al quitar la categoría, eliminamos las subcategorías asociadas
                let newSelected = prevSelected.filter((item) => item !== category);

                // Cierre de subcategorías al desmarcar la categoría padre
                if (category === "Restaurantes") {
                    newSelected = newSelected.filter((item) => !["Comida Mexicana", "Comida Colombiana", "Pizzería"].includes(item));
                }
                if (category === "Balnearios") {
                    newSelected = newSelected.filter((item) => !["Agua Natural", "Agua con Cloro"].includes(item));
                }
                if (category === "Bares") {
                    newSelected = newSelected.filter((item) => !["Bar de Vinos", "Bar de Cervezas Artesanales"].includes(item));
                }
                // Añadir filtros para otras categorías aquí...

                setSubCategoryOpen(null); // Cierra el submenú al desmarcar la categoría padre
                return newSelected;
            } else {
                // Si se selecciona una categoría, aseguramos que el submenú esté abierto
                if (category === "Restaurantes" || category === "Balnearios" || category === "Bares") {
                    setSubCategoryOpen(category);
                }
                return [...prevSelected, category];
            }
        });
    };

    const handleSubCategorySelect = (subCategory) => {
        // Verifica si la categoría padre está seleccionada antes de agregar la subcategoría
        if (
            selectedCategories.includes("Restaurantes") ||
            selectedCategories.includes("Balnearios") ||
            selectedCategories.includes("Bares")
        ) {
            setSelectedCategories((prevSelected) => {
                return prevSelected.includes(subCategory)
                    ? prevSelected.filter((item) => item !== subCategory)
                    : [...prevSelected, subCategory];
            });
        }
    };

    return (
        <div className="relative w-full max-w-lg mx-auto mt-6">
            {/* Main Select Box */}
            <div
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-gray-700">
                    {selectedCategories.length > 0
                        ? selectedCategories.join(", ")
                        : "Selecciona categorías"}
                </span>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    <ul className="p-2 space-y-1">
                        {categoriesList.map((category) => (
                            <li key={category}>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-500"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                    />
                                    <span className="text-gray-700">{category}</span>
                                </label>
                                {/* Verifica si la categoría es para desplegar subcategorías */}
                                {category === "Restaurantes" && subCategoryOpen === category && (
                                    <div className="ml-4 mt-2 border-l-2 border-gray-300 pl-2">
                                        <h4 className="text-gray-600">Subcategorías:</h4>
                                        {["Comida Mexicana", "Comida Colombiana", "Pizzería"].map((subCategory) => (
                                            <label key={subCategory} className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-500"
                                                    checked={selectedCategories.includes(subCategory)}
                                                    onChange={() => handleSubCategorySelect(subCategory)}
                                                    disabled={!selectedCategories.includes("Restaurantes")} // Desactiva si la categoría padre no está seleccionada
                                                />
                                                <span className="text-gray-700">{subCategory}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {category === "Balnearios" && subCategoryOpen === category && (
                                    <div className="ml-4 mt-2 border-l-2 border-gray-300 pl-2">
                                        <h4 className="text-gray-600">Subcategorías:</h4>
                                        {["Agua Natural", "Agua con Cloro"].map((subCategory) => (
                                            <label key={subCategory} className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-500"
                                                    checked={selectedCategories.includes(subCategory)}
                                                    onChange={() => handleSubCategorySelect(subCategory)}
                                                    disabled={!selectedCategories.includes("Balnearios")}
                                                />
                                                <span className="text-gray-700">{subCategory}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {category === "Bares" && subCategoryOpen === category && (
                                    <div className="ml-4 mt-2 border-l-2 border-gray-300 pl-2">
                                        <h4 className="text-gray-600">Subcategorías:</h4>
                                        {["Bar de Vinos", "Bar de Cervezas Artesanales"].map((subCategory) => (
                                            <label key={subCategory} className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-500"
                                                    checked={selectedCategories.includes(subCategory)}
                                                    onChange={() => handleSubCategorySelect(subCategory)}
                                                    disabled={!selectedCategories.includes("Bares")}
                                                />
                                                <span className="text-gray-700">{subCategory}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {/* Agrega bloques similares para otras categorías aquí... */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// Validación de props usando PropTypes
CategorySelect.propTypes = {
    selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de categorías seleccionadas
    setSelectedCategories: PropTypes.func.isRequired, // Función para manejar el cambio en las categorías seleccionadas
};

export default CategorySelect;
