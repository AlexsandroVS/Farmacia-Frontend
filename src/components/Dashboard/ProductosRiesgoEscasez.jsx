import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import { FaAnglesRight } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";
import { motion } from "framer-motion";

const ProductosRiesgoEscasez = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("nombre");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductosRiesgoEscasez = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/");
        // Filtrar productos con stock <= 30
        const productosFiltrados = response.data.filter(producto => producto.stock <= 30);
        setProductos(productosFiltrados);
      } catch (error) {
        setError("No se pudo cargar los productos con riesgo de escasez.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductosRiesgoEscasez();
  }, []);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!productos.length) return <div>No se encontraron productos con riesgo de escasez.</div>;

  const sortedProducts = [...productos].sort((a, b) => {
    let aValue, bValue;

    switch (sortCriteria) {
      case "nombre":
        aValue = a.nombre.toLowerCase();
        bValue = b.nombre.toLowerCase();
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      case "stock":
        aValue = a.stock;
        bValue = b.stock;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      case "precio":
        aValue = a.precio;
        bValue = b.precio;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      case "id":
        aValue = a.id;
        bValue = b.id;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full">
        <Navbar />
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-4"
          >
            <h1 className="text-3xl font-bold text-gray-900">Productos con Riesgo de Escasez</h1>
          </motion.div>

          <motion.section
            className="bg-white shadow-lg rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold flex items-center">
                    Nombre de Producto
                    <button onClick={() => handleSort("nombre")} className="ml-1 flex items-center">
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Stock
                    <button onClick={() => handleSort("stock")} className="ml-1">
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Precio Unitario
                    <button onClick={() => handleSort("precio")} className="ml-1">
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xl text-gray-700 font-semibold">
                    ID
                    <button onClick={() => handleSort("id")} className="ml-1">
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right text-xl text-gray-700 font-semibold">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((producto) => (
                  <motion.tr
                    key={producto.id}
                    className="bg-white border-b transition-all duration-300 hover:bg-gray-100"
                    whileHover={{ scale: 1.03 }}
                  >
                    <td className="px-6 py-4 text-gray-800">{producto.nombre}</td>
                    <td className="px-6 py-4 text-gray-800">{producto.stock}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {producto.precio != null ? Number(producto.precio).toFixed(2) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{producto.id}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/producto/${producto.id}`)}
                        className="text-gray-600 ml-auto text-lg hover:text-gray-800 transition-all duration-300 font-semibold flex items-center"
                      >
                        Ver Detalles <FaAnglesRight className="ml-2" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ProductosRiesgoEscasez;
