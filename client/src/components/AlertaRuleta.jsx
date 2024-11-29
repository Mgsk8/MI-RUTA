import React from 'react';

const AlertaEstetica = ({ mensaje, onClose }) => {
  return (
    <div className="fixed top-18 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-20">
      <div className="custom-div p-6 rounded-lg shadow-xl w-80 max-w-sm">
        <h2 className="text-xl font-bold text-center text-blue-600">¡Felicidades!</h2>
        <p className="text-lg text-center mt-4">{mensaje}</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertaEstetica;