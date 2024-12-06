import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { AiOutlineTags } from "react-icons/ai"; // Ícono para categorías
import axios from "axios";

function CrearCategoria() {
  const [searchQuery, setSearchQuery] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoriasExistentes, setCategoriasExistentes] = useState([]); // Lista de categorías existentes
  const [error, setError] = useState(""); // Mensaje de error

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/categorias/");
        setCategoriasExistentes(response.data.map(cat => cat.nombre.toLowerCase())); // Almacenar nombres en minúsculas para comparación
      } catch (error) {
        console.error("Error al obtener categorías existentes:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    if (categoriasExistentes.includes(nombre.toLowerCase())) {
      setError("La categoría ya existe. Por favor, elige un nombre diferente.");
      return; // Evitar enviar la solicitud si hay un duplicado
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/categorias/", { nombre });
      console.log("Categoría creada:", response.data);
      setNombre("");
    } catch (error) {
      console.error("Error al crear la categoría:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gray-200">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <AiOutlineTags className="text-blue-600 text-4xl" />
            <h2 className="text-3xl font-bold text-gray-950 font-poppins">Crear Nueva Categoría</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-gray-950 text-xl font-bold font-lexend mb-2">
                Nombre de la Categoría:
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Ej. Medicinas, Suplementos, etc."
                className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md transition duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Cuadro de información adicional */}
            <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-300">
              <p className="text-gray-700">
                <strong>Consejo:</strong> Usa nombres claros y descriptivos para ayudar a los usuarios a navegar por las categorías. 
                Por ejemplo, "Medicamentos de venta libre" o "Suplementos vitamínicos".
              </p>
            </div>

            <button
              type="submit"
              className="bg-red-700 text-white font-bold py-3 px-6 rounded hover:bg-red-900 transition duration-200 w-full"
            >
              Crear Categoría
            </button>
            <button
              type="submit"
              className="bg-blue-500 mt-5 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition duration-200 w-full"
              onClick={() => window.history.back()}
            >
              Regresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearCategoria;
