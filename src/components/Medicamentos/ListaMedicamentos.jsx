import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../shared/Loading";
import { FaAnglesRight } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";
import Breadcrumb from "../shared/Breadcrumb";
import { motion } from "framer-motion";

// Botón para ordenar columnas
const SortButton = ({ onClick, sortOrder }) => (
  <motion.button
    onClick={onClick}
    className="ml-1 flex items-center transition-transform duration-300"
    whileHover={{ scale: 1.1 }}
  >
    <RxCaretSort
      className={`text-gray-500 hover:text-green-500 transition ${sortOrder === "asc" ? "rotate-180" : ""}`}
    />
  </motion.button>
);

const ListaMedicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("nombre");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch medicamentos con sus productos asociados
  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/medicamentos/");
        const medicamentosData = response.data;

        // Obtener los detalles de los productos en paralelo
        const productosPromises = medicamentosData.map((medicamento) =>
          axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/productos/${medicamento.producto}/`)
        );

        const productosResponses = await Promise.all(productosPromises);

        // Combina los medicamentos con sus productos
        const medicamentosConProductos = medicamentosData.map((medicamento, index) => ({
          ...medicamento,
          producto: productosResponses[index].data,
        }));

        setMedicamentos(medicamentosConProductos);
      } catch (error) {
        console.error("Error al obtener los medicamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicamentos();
  }, []);

  // Ordenar medicamentos usando useMemo
  const sortedMedicamentos = useMemo(() => {
    return [...medicamentos].sort((a, b) => {
      let aValue, bValue;

      switch (sortCriteria) {
        case "nombre":
          aValue = a.producto?.nombre?.toLowerCase() || "";
          bValue = b.producto?.nombre?.toLowerCase() || "";
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        case "stock":
        case "precio":
        case "id":
          aValue = a.producto?.[sortCriteria] ?? 0;
          bValue = b.producto?.[sortCriteria] ?? 0;
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        default:
          return 0;
      }
    });
  }, [medicamentos, sortOrder, sortCriteria]);

  // Función para cambiar el criterio de orden
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Mostrar indicador de carga
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <section className="flex-grow p-6 lg:px-10 overflow-y-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            paths={[
              {
                name: "Inventario",
                link: "/inventario",
                className: "text-2xl font-bold text-gray-600",
              },
              {
                name: "Lista de Medicamentos",
                className: "text-3xl text-black",
              },
            ]}
          />
          <div className="flex items-center justify-between mt-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Lista de Medicamentos ({sortedMedicamentos.length})
            </h1>
            <motion.button
              onClick={() => navigate("/CrearMedicamento")}
              className="bg-gradient-to-r from-green-500 h-12 to-green-700 text-white font-semibold py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-shadow duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agregar Medicamento
            </motion.button>
          </div>

          <section className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold flex items-center">
                    Nombre del Medicamento
                    <SortButton onClick={() => handleSort("nombre")} sortOrder={sortOrder} />
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Stock
                    <SortButton onClick={() => handleSort("stock")} sortOrder={sortOrder} />
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Precio Unitario
                    <SortButton onClick={() => handleSort("precio")} sortOrder={sortOrder} />
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    ID
                    <SortButton onClick={() => handleSort("id")} sortOrder={sortOrder} />
                  </th>
                  <th className="px-6 py-4 text-right text-xl text-gray-700 font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody>
                {sortedMedicamentos.map((medicamento, index) => (
                  <motion.tr
                    key={medicamento.id || `medicamento-${index}`}
                    className="bg-white border-b transition-all hover:bg-gray-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <td className="px-6 py-4 text-gray-800">{medicamento.producto?.nombre || "Desconocido"}</td>
                    <td className="px-6 py-4 text-gray-800">{medicamento.producto?.stock || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {medicamento.producto?.precio != null
                        ? Number(medicamento.producto.precio).toFixed(2)
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{medicamento.id || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <motion.button
                        onClick={() => navigate(`/verDetalleProducto/${medicamento.id}`)}
                        className="text-green-600 hover:text-green-800 transition font-semibold flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        Ver acciones <FaAnglesRight className="ml-2" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ListaMedicamentos;
