import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  const navigate = useNavigate();

  // Asegurarnos de que 'paths' sea un arreglo
  if (!Array.isArray(paths) || paths.length === 0) {
    return null; // No renderizamos nada si paths no es un arreglo válido
  }
  
  return (
    <div className="flex items-center mb-4">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <FaAngleRight className="text-black mx-3 p-1 text-3xl" />}
          {path.link ? (
            <button
              onClick={() => navigate(path.link)}
              className={`text-2xl font-bold text-gray-600 ${
                index === paths.length - 1 ? "text-3xl text-gray-800" : ""
              }`}
            >
              {path.name}
            </button>
          ) : (
            <span className="text-3xl font-bold text-gray-800">
              {path.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
