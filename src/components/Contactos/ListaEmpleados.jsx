import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import EmpleadoCard from "./EmpleadoCard";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa";
import { useSearch } from "../shared/SearchContext"; // Importa el contexto de búsqueda

function ListaEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch(); // Usa el estado de búsqueda desde el contexto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get(
          "https://alexsandrovs.pythonanywhere.com/api/v1/empleados/"
        );
        setEmpleados(response.data);
      } catch (error) {
        console.error("Error al obtener los empleados:", error);
        setError("Hubo un problema al cargar los datos de empleados.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  // Filtrar empleados basados en la búsqueda
  const filteredEmpleados = searchQuery
    ? empleados.filter((empleado) =>
        `${empleado.persona.nombre} ${empleado.persona.apellidos}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : empleados;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gray-100">
        <Navbar />
        <nav className="text-gray-500 mb-2 p-4 ml-4 mt-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <button
                onClick={() => navigate("/GestionContactos")}
                className="text-slate-600 text-2xl font-semibold hover:underline"
              >
                Gestión de Contactos
              </button>
            </li>
            <FaAngleRight className="w-5 h-5" />
            <li>
              <button
                onClick={() => navigate("/ListaEmpleados")}
                className="text-black text-3xl font-semibold hover:underline"
              >
                Lista de Empleados
              </button>
            </li>
          </ol>
          <button
            onClick={() => navigate("/crearEmpleado")}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-700"
          >
            Crear Empleado
          </button>
        </nav>
        <section className="flex-grow  ml-8 bg-slate-50 overflow-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Lista de Empleados</h1>
            <p className="text-gray-600">Información detallada de todos los empleados</p>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Cargando empleados...
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-500 p-4 rounded">{error}</div>
          ) : filteredEmpleados.length === 0 ? (
            <div className="text-center text-gray-500">No hay empleados disponibles.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredEmpleados.map((empleado) => (
                <EmpleadoCard
                  key={empleado.persona.id} // Usa persona.id como key
                  persona={empleado.persona} // Pasa el objeto persona
                  cargo={empleado.cargo}
                  direccion={empleado.persona.direccion}
                  telefono={empleado.persona.telefono}
                  activo={empleado.activo}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ListaEmpleados;
