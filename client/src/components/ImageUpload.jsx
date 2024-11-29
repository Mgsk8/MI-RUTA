import { useState } from 'react';
import "../../styles/styles.css";

const ImageUpload = ({ selectedImages, setSelectedImages }) => {
    const [selectedImagePreviews, setSelectedImagePreviews] = useState([]);

    // Función para manejar la carga de múltiples imágenes
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files); // Convertir los archivos en un array

        // Verificar cuántas imágenes se han seleccionado
        if (selectedImages.length + files.length > 3) {
            alert('Solo puedes seleccionar hasta 3 imágenes.');
            return; // Detener si se excede el número máximo de imágenes
        }

        // Filtrar archivos para verificar el peso máximo de cada uno
        const validFiles = files.filter((file) => file.size <= 1048576); // 1 MB = 1048576 bytes

        // Verificar si hay archivos que exceden el límite de tamaño
        if (validFiles.length !== files.length) {
            alert('Una o más imágenes exceden el límite de 1 MB.');
        }

        // Previsualizar las imágenes
        const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

        // Actualizar las imágenes seleccionadas y las previsualizaciones
        setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
        setSelectedImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    };

    // Función para eliminar una imagen seleccionada
    const handleRemoveImage = (indexToRemove) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove) // Filtrar la imagen que se desea eliminar
        );
        setSelectedImagePreviews((prevPreviews) =>
            prevPreviews.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <div className="mb-4">
            <div className="text-center">
                {/* Icono de cámara para subir imágenes */}
                <label htmlFor="images" className="cursor-pointer">
                    <i className="fas fa-camera text-6xl" />
                </label>
                <div className="mt-2 text-sm font-medium">
                    <span>Haz clic en el icono para subir imágenes</span>
                </div>
            </div>

            <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
            />

            {/* Mostrar la previsualización de las imágenes */}
            {selectedImagePreviews.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium">Previsualización:</h3>
                    <div className="flex space-x-4 mt-2">
                        {selectedImagePreviews.map((preview, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 p-2 bg-gray-200 text-red-500 rounded-full hover:bg-red-100"
                                >
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
