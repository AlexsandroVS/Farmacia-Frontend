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
import { useSearch } from "../shared/SearchContext"; // Importa el hook de búsqueda

function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("id");
  const navigate = useNavigate();
  const { searchQuery } = useSearch(); // Obtén el valor de búsqueda global

  useEffect(() => {
    axios
      .get("https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/")
      .then((response) => {
        setPedidos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los pedidos:", error);
        setLoading(false);
      });
  }, []);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleClickDetalle = (pedidoId) => {
    navigate(`/verDetallePedido/${pedidoId}`);
  };

  // Filtrar los pedidos según el valor de searchQuery
  const filteredPedidos = pedidos.filter((pedido) => {
    return (
      pedido.id.toString().includes(searchQuery) || // Filtra por ID
      pedido.fecha_pedido.includes(searchQuery) || // Filtra por fecha
      (pedido.total_pedido != null && pedido.total_pedido.toString().includes(searchQuery)) // Filtra por total
    );
  });

  const sortedPedidos = [...filteredPedidos].sort((a, b) => {
    let aValue, bValue;

    switch (sortCriteria) {
      case "id":
        aValue = a.id;
        bValue = b.id;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      case "fecha_pedido":
        aValue = new Date(a.fecha_pedido);
        bValue = new Date(b.fecha_pedido);
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      case "total_pedido":
        aValue = a.total_pedido;
        bValue = b.total_pedido;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      case "estado":
        aValue = a.estado.toLowerCase();
        bValue = b.estado.toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
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
        <Navbar />
        <section className="flex-grow p-6 lg:px-10 overflow-y-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            paths={[
              {
                name: "Inventario",
                link: "/inventario",
                className: "text-2xl font-bold text-gray-600",
              },
              { name: "Lista de Pedidos", className: "text-3xl text-black" },
            ]}
          />
          <div className="flex items-center justify-between mt-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Lista de Pedidos ({sortedPedidos.length})
            </h1>
            <button
              onClick={() => navigate("/CrearPedido")}
              className="bg-gradient-to-r from-red-500 h-12 to-red-700 text-white font-semibold py-2 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-shadow duration-300 shadow-lg"
            >
              Agregar Pedido
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
                    ID
                    <button
                      onClick={() => handleSort("id")}
                      className="ml-1 flex items-center"
                    >
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-xl text-left text-gray-700 font-semibold">
                    Fecha
                    <button
                      onClick={() => handleSort("fecha_pedido")}
                      className="ml-1"
                    >
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xl text-gray-700 font-semibold">
                    Total
                    <button
                      onClick={() => handleSort("total_pedido")}
                      className="ml-1"
                    >
                      <RxCaretSort className="text-gray-500 hover:text-red-500 transition" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xl text-gray-700 font-semibold">
                    Estado
                    <button
                      onClick={() => handleSort("estado")}
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
                {sortedPedidos.map((pedido) => (
                  <motion.tr
                    key={pedido.id}
                    className="bg-white border-b transition-all duration-300 hover:bg-gray-100"
                    whileHover={{ scale: 1.03 }}
                  >
                    <td className="px-6 py-4 text-gray-800">{pedido.id}</td>
                    <td className="px-6 py-4 text-gray-800">{pedido.fecha_pedido}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {pedido.total_pedido != null
                        ? Number(pedido.total_pedido).toFixed(2)
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{pedido.estado}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleClickDetalle(pedido.id)}
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

export default ListarPedidos;
