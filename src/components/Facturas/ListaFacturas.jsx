import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../shared/Loading";
import { motion } from "framer-motion";
import { MdFileDownload } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useSearch } from "../shared/SearchContext";

const ListaFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [empleados, setEmpleados] = useState({});
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch(); // Obtiene el searchQuery desde el contexto
  const navigate = useNavigate();

  // Obtener empleados desde la API
  const fetchEmpleados = async () => {
    try {
      const response = await axios.get(
        "https://alexsandrovs.pythonanywhere.com/api/v1/empleados/"
      );
      const empleadosMap = response.data.reduce((acc, emp) => {
        const nombreCompleto = emp.persona
          ? `${emp.persona.nombre} ${emp.persona.apellidos}`
          : "Empleado desconocido";
        acc[emp.id] = nombreCompleto;
        return acc;
      }, {});
      setEmpleados(empleadosMap);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  // Obtener facturas desde la API
  const fetchFacturas = async () => {
    try {
      const response = await axios.get(
        "https://alexsandrovs.pythonanywhere.com/api/v1/facturas/"
      );
      setFacturas(response.data);
    } catch (error) {
      console.error("Error al obtener las facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Llamadas iniciales a las APIs
  useEffect(() => {
    fetchEmpleados();
    fetchFacturas();
  }, []);

  // Redirigir a la descarga de factura
  const descargarFactura = (id) => {
    const url = `https://alexsandrovs.pythonanywhere.com/api/factura/${id}/pdf/`;
    window.location.href = url;
  };

  // Filtrar facturas basadas en la búsqueda
  const filteredFacturas = searchQuery
    ? facturas.filter((factura) => {
        const empleadoNombre = empleados[factura.empleado] || "";
        return (
          factura.cliente?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          empleadoNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          factura.fecha?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : facturas;

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Barra de navegación */}
        <Navbar />

        {/* Contenido principal */}
        <section className="flex-grow p-6 lg:px-10 overflow-y-auto">
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Lista de Facturas ({filteredFacturas.length})
            </h1>

            <div className="flex space-x-4">
              <motion.button
                onClick={() => navigate("/CrearFactura")}
                className="bg-gradient-to-r from-blue-500 h-12 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-shadow duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Crear Factura
              </motion.button>

              <motion.button
                onClick={() => navigate("/facturas/clientes")}
                className="bg-gradient-to-r from-green-500 h-12 to-green-700 text-white font-semibold py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-shadow duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Facturas Clientes
              </motion.button>
            </div>
          </div>

          {/* Tabla de facturas */}
          <section className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Empleado</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Cliente</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Fecha</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total</th>
                  <th className="px-6 py-4 text-right text-gray-700 font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacturas.map((factura) => {
                  return (
                    <motion.tr
                      key={factura.id}
                      className="bg-white border-b transition-all hover:bg-gray-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="px-6 py-4 text-gray-800">{factura.id}</td>
                      <td className="px-6 py-4 text-gray-800">{factura.empleado_nombre}</td>
                      <td className="px-6 py-4 text-gray-800">{factura.cliente}</td>
                      <td className="px-6 py-4 text-gray-800">{factura.fecha}</td>
                      <td className="px-6 py-4 text-gray-800">
                        {Number(factura.total).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <motion.div
                          className="flex justify-end items-center gap-4 text-slate-800 hover:text-blue-800 transition font-semibold text-2xl"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FaEye
                            className="cursor-pointer"
                            onClick={() => navigate(`/verfactura/${factura.id}`)}
                          />
                          <MdFileDownload
                            className="cursor-pointer"
                            onClick={() => descargarFactura(factura.id)}
                          />
                        </motion.div>
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

export default ListaFacturas;
