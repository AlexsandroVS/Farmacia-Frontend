import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Icono de búsqueda

const BusquedaGeneral = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el texto de búsqueda

  // Función que maneja el cambio en el input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar los datos según el término de búsqueda
  const handleSearch = () => {
    if (onSearch) {
      // Si la función onSearch está definida, la llamamos con el término de búsqueda
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar..."
        className="px-4 py-2 border rounded-lg w-80"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default BusquedaGeneral;
