import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../shared/Navbar';
import Card from '../Inventario/Card';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";

function GestionContactos() {
  const [datos, setDatos] = useState({
    empleados: 'Cargando...',
    proveedores: 'Cargando...',
    totalEmpleados: 0,
    totalProveedores: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [empleadosResponse, proveedoresResponse] = await Promise.all([
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/empleados/"),
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/"),
        ]);

        setDatos({
          empleados: 'Empleados cargados',
          proveedores: 'Proveedores cargados',
          totalEmpleados: empleadosResponse.data.length,
          totalProveedores: proveedoresResponse.data.length,
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
        <Navbar />

        <section className="flex-grow w-full p-4 overflow-auto bg-slate-100 from-gray-50 to-gray-300">
          <div className="p-4 mb-4 rounded-lg">
            <h1 className="text-4xl font-bold">Gestión de Contactos</h1>
            <p className="text-gray-500">
              Información sobre empleados y proveedores
            </p>
          </div>

          {error ? (
            <div className="bg-red-100 text-red-500 p-4 rounded">{error}</div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {/* Tarjeta de Empleados */}
              <Card
                link="/ListaEmpleados"
                title="Empleados"
                icon={<FaUser className="h-16 w-16 text-blue-500" />}
                value={datos.totalEmpleados}
                subtitle="Total de Empleados"
                bgColor="bg-white"
                borderColor="border-blue-300"
                textColor="text-gray-800"
                gradientColor="bg-gradient-to-r from-blue-400 to-blue-500"
              />

              {/* Tarjeta de Proveedores */}
              <Card
                link="/ListaProveedores"
                title="Proveedores"
                icon={<FaTruck className="h-16 w-16 text-green-500" />}
                value={datos.totalProveedores}
                subtitle="Total de Proveedores"
                bgColor="bg-white"
                borderColor="border-green-300"
                textColor="text-gray-800"
                gradientColor="bg-gradient-to-r from-green-400 to-green-500"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default GestionContactos;
