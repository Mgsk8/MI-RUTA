export const Category = ({ lugares }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {lugares.map((lugar, index) => (
        <div
          key={index}
          className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        >
          <a href="" className="block">
            <img
              src={lugar.images} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold text-orange-500 mb-2">
              {lugar.nombre}
            </h2>
            <p className="text-gray-300">{lugar.informacion}</p><br />
            
            <p className="atext-gray-400 mt-2">Categoría: {lugar.categorias}</p>
            <p className="text-gray-400 mt-2">
              Dirección: {lugar.direccion_manual}
            </p>
            <p className="text-gray-400 mt-2">
              calificacion: {lugar.calificacion}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};
