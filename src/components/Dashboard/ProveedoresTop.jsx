import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import Loading from "../shared/Loading"; // Componente de carga
import Breadcrumb from "../shared/Breadcrumb";

// Botón de ordenación (aunque en este caso no se ordenan, pero es un ejemplo)
const SortButton = ({ onClick, sortOrder }) => (
  <motion.button
    onClick={onClick}
    className="ml-1 flex items-center transition-transform duration-300 hover:text-green-600"
    whileHover={{ scale: 1.1 }}
  >
    <FaAngleRight
      className={`text-gray-500 hover:text-green-500 transition ${
        sortOrder === "asc" ? "rotate-180" : ""
      }`}
    />
  </motion.button>
);

const ProveedoresTop = () => {
  const [proveedoresTop, setProveedoresTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch proveedores
  useEffect(() => {
    const fetchProveedoresTop = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/proveedores-top/");
        console.log(response.data); // Imprime la respuesta para verificar la estructura de los datos
        setProveedoresTop(response.data);
      } catch (error) {
        console.error("Error al obtener los proveedores top", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProveedoresTop();
  }, []);
  

  // Mostrar indicador de carga
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-slate-100 via-gray-100 to-slate-300">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Navbar />
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
                name: "Proveedores Clave",
                className: "text-3xl text-black",
              },
            ]}
          />
          <div className="flex items-center justify-between mt-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Proveedores con más Pedidos
            </h1>
          </div>

          <section className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <ul className="space-y-6">
              {proveedoresTop.length === 0 ? (
                <p className="text-center text-lg text-gray-500 py-6">
                  No hay proveedores con pedidos registrados.
                </p>
              ) : (
                proveedoresTop.map((proveedor) => (
                  <motion.li
                    key={proveedor.nombre}
                    className="flex justify-between items-center p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold text-gray-800">
                        {proveedor.nombre}
                      </span>
                      <span className="text-sm text-gray-600">
                        Total pedidos: {proveedor.cantidad_pedidos} - Monto
                        total: $
                        {proveedor.total_pedido
                          ? proveedor.total_pedido.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <Link
                      to={`/DetallesProveedor/${proveedor.id}`}

                      className="text-green-600 hover:text-green-800 flex items-center"
                    >
                      <span>Ver detalles</span>
                      <FaAngleRight className="ml-2" />
                    </Link>
                  </motion.li>
                ))
              )}
            </ul>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProveedoresTop;
