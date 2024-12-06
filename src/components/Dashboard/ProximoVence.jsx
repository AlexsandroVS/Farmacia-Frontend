import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../shared/Loading";
import { FaTrashAlt } from "react-icons/fa";
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

const ProximoVence = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("nombre");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch productos con sus detalles
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/");
        const productosData = response.data;
        
        // Filtrar productos que estén próximos a vencer
        const productosProximosAVencer = productosData.filter((producto) => {
          const today = new Date();
          const expirationDate = new Date(producto.fecha_vencimiento);
          const timeDifference = expirationDate - today;
          const daysLeft = Math.floor(timeDifference / (1000 * 3600 * 24)); // Días restantes
          return daysLeft <= 30 && daysLeft >= 0; // Solo los que vencen en 30 días o menos
        });

        setProductos(productosProximosAVencer);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Ordenar productos usando useMemo
  const sortedProductos = useMemo(() => {
    return [...productos].sort((a, b) => {
      let aValue, bValue;

      switch (sortCriteria) {
        case "nombre":
          aValue = a.nombre?.toLowerCase() || "";
          bValue = b.nombre?.toLowerCase() || "";
          return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        case "stock":
        case "precio":
        case "id":
          aValue = a[sortCriteria] ?? 0;
          bValue = b[sortCriteria] ?? 0;
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        default:
          return 0;
      }
    });
  }, [productos, sortOrder, sortCriteria]);

  // Función para cambiar el criterio de orden
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Función para eliminar un producto
  const handleDelete = async (productoId) => {
    try {
      await axios.delete(`https://alexsandrovs.pythonanywhere.com/api/v1/productos/${productoId}/`);
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== productoId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
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
                name: "Dashboard",
                link: "/Dashboard",
                className: "text-2xl font-bold text-gray-600",
              },
              {
                name: "Productos Próximos a Vencer",
                className: "text-3xl text-black",
              },
            ]}
          />
          <div className="flex items-center justify-between mt-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Productos Próximos a Vencer ({sortedProductos.length})
            </h1>
          </div>

          <section className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold flex items-center">
                    Nombre
                    <SortButton onClick={() => handleSort("nombre")} sortOrder={sortOrder} />
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Fecha de Vencimiento
                    <SortButton onClick={() => handleSort("fecha_vencimiento")} sortOrder={sortOrder} />
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Días Restantes
                  </th>
                  <th className="px-6 py-4 text-right text-xl text-gray-700 font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody>
                {sortedProductos.map((producto) => {
                  const today = new Date();
                  const expirationDate = new Date(producto.fecha_vencimiento);
                  const timeDifference = expirationDate - today;
                  const daysLeft = Math.floor(timeDifference / (1000 * 3600 * 24));

                  return (
                    <motion.tr
                      key={producto.id}
                      className="bg-white border-b transition-all hover:bg-gray-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="px-6 py-4 text-gray-800">{producto.nombre}</td>
                      <td className="px-6 py-4 text-gray-800">{producto.fecha_vencimiento}</td>
                      <td className="px-6 py-4 text-gray-800">{daysLeft} días</td>
                      <td className="px-6 py-4 text-right">
                        <motion.button
                          onClick={() => handleDelete(producto.id)}
                          className="text-red-600 hover:text-red-800 transition font-semibold flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FaTrashAlt className="mr-2" />
                          Eliminar
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProximoVence;
