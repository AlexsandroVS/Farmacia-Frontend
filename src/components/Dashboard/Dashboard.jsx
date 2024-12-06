import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { LiaBriefcaseMedicalSolid } from "react-icons/lia";
import { IoWarningOutline } from "react-icons/io5";
import Card from "../Inventario/Card";
import CardDetails from "../Inventario/CardDetails";
import axios from "axios";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [datos, setDatos] = useState({
    estadoInventario: "Cargando...",
    ganancia: "Cargando...",
    totalFacturado: "Cargando...", 
    medicinasDisponibles: "Cargando...",
    escasezMedicamentos: "Cargando...",
    proximosAVencer: 0,
    proveedoresTop: [],
    pedidosReabastecimiento: [],
    riesgoEscasez: 0,
    productosConRiesgoEscasez: 0, // Nuevo estado para productos con stock <= 30
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [
          productosResponse,
          proveedoresResponse,
          pedidosResponse,
          totalFacturadoResponse,
        ] = await Promise.all([
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/"),
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/"),
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/"),
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/reporte-general/"),
        ]);

        const productos = productosResponse.data;

        setDatos({
          estadoInventario: productos.length > 0 ? "Bien" : "Mal",
          totalFacturado: totalFacturadoResponse.data.total_facturado, 
          medicinasDisponibles: productos.length,
          escasezMedicamentos: productos.filter((p) => p.stock <= 5).length,
          proximosAVencer: productos.filter(
            (p) =>
              new Date(p.fecha_vencimiento) <=
              Date.now() + 30 * 24 * 60 * 60 * 1000
          ).length,
          proveedoresTop: proveedoresResponse.data.slice(0, 3),
          pedidosReabastecimiento: pedidosResponse.data.slice(-3),
          riesgoEscasez: productos.filter((p) => p.stock <= 3 && p.demandaAlta)
            .length,
          productosConRiesgoEscasez: productos.filter((p) => p.stock <= 30).length, // Cálculo de productos con stock <= 30
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Hubo un problema al cargar los datos.");
      }
    };

    fetchDatos();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gray-200 overflow-hidden">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <section className="flex-grow w-full p-4 overflow-auto bg-slate-100 from-gray-50 to-gray-300">
          <div className="p-4 mb-4 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 text-lg mt-1">
              Una descripción general rápida de los datos del inventario
            </p>
          </div>

          {error ? (
            <div className="bg-red-100 text-red-500 p-4 rounded">{error}</div>
          ) : (
            <>
              {/* Tarjetas Principales */}
              <div className="flex flex-wrap justify-center gap-6">
                <Card
                  link="/Inventario"
                  title="Estado de Inventario"
                  icon={
                    <MdOutlineHealthAndSafety className="h-14 w-14 text-green-500 animate-pulse" />
                  }
                  value={datos.estadoInventario}
                  subtitle="Estado General"
                  bgColor="bg-white"
                  borderColor="border-green-300"
                  textColor="text-gray-800"
                  gradientColor="bg-gradient-to-r from-green-400 to-green-500"
                />
                <Card
                  link="/reportes"
                  title="Ganancia del Mes"
                  icon={
                    <FaMoneyBillWave className="h-14 w-14 text-yellow-500" />
                  }
                  value={`S/. ${datos.totalFacturado}`}
                  subtitle="Total Ganancias"
                  bgColor="bg-white"
                  borderColor="border-yellow-300"
                  textColor="text-gray-800"
                  gradientColor="bg-gradient-to-r from-yellow-400 to-yellow-500"
                />
                <Card
                  link="/ListaMedicinas"
                  title="Medicinas Disponibles"
                  icon={
                    <LiaBriefcaseMedicalSolid className="h-14 w-14 text-blue-500" />
                  }
                  value={datos.medicinasDisponibles}
                  subtitle="Total de Productos"
                  bgColor="bg-white"
                  borderColor="border-blue-300"
                  textColor="text-gray-800"
                  gradientColor="bg-gradient-to-r from-blue-400 to-blue-500"
                />
                <Card
                  link="/Abastecer"
                  title="Medicamentos en Escasez"
                  icon={
                    <IoWarningOutline className="h-14 w-14 text-red-500 animate-pulse" />
                  }
                  value={datos.escasezMedicamentos}
                  subtitle="Medicamentos con bajo stock"
                  bgColor="bg-white"
                  borderColor="border-red-300"
                  textColor="text-gray-800"
                  gradientColor="bg-gradient-to-r from-red-400 to-red-500"
                />
              </div>

              {/* Secciones Detalladas */}
              <section className="flex flex-wrap justify-center gap-4 mt-6">
                <Link to="/ProximosAVencer">
                  <CardDetails
                    title="Próximo a Expirar"
                    total={datos.proximosAVencer}
                    group="Productos próximos a expirar en el mes"
                    titleClass="text-lg font-medium" 
                    totalClass="text-2xl font-semibold text-gray-700" 
                  />
                </Link>
                <Link to="/ProveedoresTop">
                  <CardDetails
                    title="Proveedores Clave"
                    total={datos.proveedoresTop.length}
                    group="Top proveedores con más pedidos"
                    titleClass="text-lg font-medium" 
                    totalClass="text-2xl font-semibold text-gray-700" 
                  />
                </Link>
                <Link to="/productos-top">
                  <CardDetails
                    title="Productos más Vendidos"
                    total={datos.pedidosReabastecimiento.length}
                    group="Los productos más populares"
                    titleClass="text-lg font-medium" 
                    totalClass="text-2xl font-semibold text-gray-700" 
                  />
                </Link>
                
                <Link to="/productos-escazes">
                  <CardDetails
                    title="Productos con Riesgo de Escasez"
                    total={datos.productosConRiesgoEscasez}
                    group="Productos con stock menor a 30"
                    titleClass="text-lg font-medium" 
                    totalClass="text-2xl font-semibold text-gray-700" 
                  />
                </Link>
              </section>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
