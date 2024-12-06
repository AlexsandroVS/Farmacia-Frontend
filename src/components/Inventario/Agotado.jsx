import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import Loading from "../shared/Loading";
import Breadcrumb from "../shared/Breadcrumb";
import { motion } from "framer-motion";
import { FaAnglesRight } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";

function Agotado() {
  const [productosAgotados, setProductosAgotados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("nombre");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    axios
      .get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/")
      .then((response) => {
        const productos = response.data;
        const agotados = productos.filter((producto) => producto.stock === 0); // Filtrar productos sin stock
        setProductosAgotados(agotados);
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

  const handleReabastecer = () => {
    navigate("/pedidos"); 
  };

  // Filtrar productos agotados según el searchQuery
  const filteredProducts = productosAgotados.filter((producto) =>
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
              { name: "Productos Agotados", className: "text-3xl text-black" },
            ]}
          />
          <div className="flex items-center justify-between mt-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Productos Agotados ({sortedProducts.length})
            </h1>
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
                    <td className="px-6 py-4 text-gray-800">0</td>
                    <td className="px-6 py-4 text-gray-800">{producto.id}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={handleReabastecer}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                      >
                        Reabastecer
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

export default Agotado;
