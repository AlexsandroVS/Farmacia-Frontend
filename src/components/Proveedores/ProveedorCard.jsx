// ProveedorCard.js
import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProveedorCard({ id, nombre, direccion, contacto, activo }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/DetallesProveedor/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer shadow-lg rounded-lg p-8 bg-white border-l-4 ${
        activo ? "border-green-500" : "border-gray-300"
      } w-72 hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out`}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <FaBuilding className="h-12 w-12 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
          <p className="text-sm text-gray-500">{activo ? "Activo" : "Inactivo"}</p>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-base text-gray-700">Dirección: {direccion}</p>
        <p className="text-base text-gray-700">Contacto: {contacto}</p>
      </div>
    </div>
  );
}

export default ProveedorCard;
