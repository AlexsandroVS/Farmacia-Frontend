import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function EmpleadoCard({ persona, cargo, direccion, telefono, activo }) {
  const navigate = useNavigate();

  // Function to handle click and navigate to detailed view
  const handleCardClick = () => {
    // Utiliza persona.id para acceder al ID del empleado
    navigate(`/empleado/${persona.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer shadow-lg rounded-lg p-6 bg-white border-l-4 ${
        activo ? "border-green-500" : "border-gray-300"
      } w-64 hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out`}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <FaUser className="h-12 w-12 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{persona.nombre}</h2>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-base font-semibold text-gray-700">Cargo: {cargo}</p>
        <p className="text-base text-gray-700">Dirección: {direccion}</p>
        <p className="text-base text-gray-700">Telefono: {telefono}</p>
      </div>
    </div>
  );
}

export default EmpleadoCard;
