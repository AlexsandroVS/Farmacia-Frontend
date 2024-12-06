import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import Loading from "../shared/Loading";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TablaResumenCliente from "./TablaResumenCliente";
import TablaProductosVendidosCliente from "./TablaProductosVendidosCliente";
import ReporteMensualClientes from "./ReporteMensualClientes"; // Importa el componente de reporte por mes si lo tienes

const ReporteGeneralCliente = () => {
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarReporte, setMostrarReporte] = useState(false);
  const [mostrarReportePorMes, setMostrarReportePorMes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch reporte general desde la API
  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await fetch(
          "https://alexsandrovs.pythonanywhere.com/api/v1/reporte-general-cliente/"
        )
        const data = await response.json();
        setReporte(data);
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReporte();
  }, []);

  // Función de descarga del reporte
  const descargarReporteClientePDF = () => {
    const url = `https://alexsandrovs.pythonanywhere.com/api/v1/reporte-general-pdf-cliente/
`;
    window.open(url, "_blank");
  };

  if (loading) return <Loading />;
  if (!reporte) return <div>No se pudo cargar el reporte.</div>;

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <section className="flex-grow p-6 lg:px-10 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Reporte General Cliente
            </h1>
            <div className="flex space-x-4">
              <motion.button
                onClick={() => setMostrarReporte(!mostrarReporte)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mostrarReporte ? "Ocultar Reporte" : "Mostrar Reporte"}
              </motion.button>
              <motion.button
                onClick={() => navigate("/reportes/clientes/grafico/")} 
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mostrar Grafico
              </motion.button>
              <motion.button
                onClick={() => navigate("/reportes")} 
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold py-2 px-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Regresar a Reportes
              </motion.button>

              
            </div>
          </div>
          {mostrarReporte && (
            <>
              <TablaResumenCliente reporte={reporte} />
              <TablaProductosVendidosCliente
                reporte={reporte}
                searchQuery={searchQuery}
              />
              <section className="flex justify-between mb-6">
              <motion.button
                onClick={() => setMostrarReportePorMes(!mostrarReportePorMes)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mostrarReportePorMes
                  ? "Ocultar Reporte por Mes"
                  : "Mostrar Reporte por Mes"}
              </motion.button>
                <motion.button
                  onClick={descargarReporteClientePDF}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-6 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Descargar Reporte
                </motion.button>
              </section>
              
            </>
            
          )}
          {mostrarReportePorMes && <ReporteMensualClientes />}{" "}
          {/* Componente de reporte por mes */}
        </section>
      </div>
    </div>
  );
};

export default ReporteGeneralCliente;
