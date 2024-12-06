import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../shared/Loading";
import { FaAnglesRight } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";
import Breadcrumb from "../shared/Breadcrumb";
import { motion } from "framer-motion";

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("nombre");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    axios
      .get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/")
      .then((response) => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      });
  }, []);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleClickDetalle = (productId) => {
    navigate(`/verDetalleProducto/${productId}`);
  };

  // Filtrar productos según el searchQuery
  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue, bValue;

    switch (sortCriteria) {
      case "nombre":
        aValue = a.nombre.toLowerCase();
        bValue = b.nombre.toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
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
              { name: "Lista de Productos", className: "text-3xl text-black" },
            ]}
          />
          <div className="flex items-center justify-between mt-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Lista de Productos ({sortedProducts.length})
            </h1>
            <button
              onClick={() => navigate("/CrearProducto")}
              className="bg-gradient-to-r from-red-500 h-12 to-red-700 text-white font-semibold py-2 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-shadow duration-300 shadow-lg"
            >
              Agregar Producto
            </button>
          </div>

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
                    <button
                      onClick={() => handleSort("nombre")}
                      className="ml-1 flex items-center"
                    >
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Stock
                    <button
                      onClick={() => handleSort("stock")}
                      className="ml-1"
                    >
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xl text-gray-700 font-semibold">
                    Precio Unitario
                    <button
                      onClick={() => handleSort("precio")}
                      className="ml-1"
                    >
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xl text-gray-700 font-semibold">
                    ID
                    <button
                      onClick={() => handleSort("id")}
                      className="ml-1"
                    >
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
                      {producto.precio != null
                        ? Number(producto.precio).toFixed(2)
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{producto.id}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleClickDetalle(producto.id)}
                        className="text-gray-600 ml-auto text-lg hover:text-gray-800 transition-all duration-300 font-semibold flex items-center"
                      >
                        Ver acciones <FaAnglesRight className="ml-2" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.section>
        </section>
      </div>
    </div>
  );
}

export default ListaProductos;
