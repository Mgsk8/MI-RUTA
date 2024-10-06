import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const CategorySelect = ({ categories, selectedCategories, setSelectedCategories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState("down");
    const selectRef = useRef(null); // Reference to the select box

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category]
        );
    };

    useEffect(() => {
        const updateDropdownPosition = () => {
            if (selectRef.current) {
                const rect = selectRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceAbove = rect.top;

                // Set dropdown position based on available space
                setDropdownPosition(spaceBelow >= spaceAbove ? "down" : "up");
            }
        };

        // Attach event listener to update position on window resize
        window.addEventListener("resize", updateDropdownPosition);
        updateDropdownPosition(); // Initial check on mount

        return () => {
            window.removeEventListener("resize", updateDropdownPosition);
        };
    }, [isOpen]);

    return (
        <div className="relative w-full max-w-lg mx-auto mt-6" ref={selectRef}>
            {/* Main Select Box */}
            <div
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`text-gray-700 ${selectedCategories.length > 0 ? "font-medium" : "font-light"}`}>
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
                <div
                    className={`absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto transition-all duration-300 ease-in-out ${
                        dropdownPosition === "up" ? "bottom-full mb-2" : "top-full mt-2"
                    }`}
                >
                    <ul className="p-2 space-y-2">
                        {categories.map((category) => (
                            <li key={category}>
                                <label
                                    className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-colors duration-200 ease-in-out 
                                    ${selectedCategories.includes(category) ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                    />
                                    <span className="text-gray-700">{category}</span>
                                </label>
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
    categories: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de categorías debe ser obligatorio
    selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de categorías seleccionadas
    setSelectedCategories: PropTypes.func.isRequired, // Función para manejar el cambio en las categorías seleccionadas
};

export default CategorySelect;
