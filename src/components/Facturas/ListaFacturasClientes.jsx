import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../shared/Loading";
import { motion } from "framer-motion";
import { MdFileDownload } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const ListaFacturasClientes = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Función para obtener las facturas de todos los clientes
  const fetchFacturasClientes = async () => {
    const token = localStorage.getItem("token");  // Obtener el token del localStorage
    if (!token) {
      console.error("Token no encontrado. No se puede realizar la solicitud.");
      return;
    }

    try {
      const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/facturas-cliente/", 
        {
          headers: {
            "Authorization": `Bearer ${token}`  // Usar el token en la cabecera
          }
        }
      );
      setFacturas(response.data);
    } catch (error) {
      console.error("Error al obtener las facturas de clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Llamada a las APIs al cargar el componente
  useEffect(() => {
    fetchFacturasClientes();
  }, []);

  // Manejar indicador de carga
  if (loading) {
    return <Loading />;
  }

  // Manejar descarga de factura
  const descargarFactura = (id) => {
    const url = `https://alexsandrovs.pythonanywhere.com/api/factura_cliente/pdf/${id}/`;
    
    // Usar window.open para abrir la URL en una nueva ventana o pestaña
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";  // Asegúrate de que se abra en una nueva pestaña
    link.click();  // Simula el clic en el enlace para descargar el archivo
  };
  
  // Filtrar facturas por búsqueda
  const filteredFacturas = searchQuery
    ? facturas.filter((factura) =>
        factura.cliente
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : facturas;

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <section className="flex-grow p-6 lg:px-10 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            {/* Botón para regresar a la lista de facturas */}
            
            <h1 className="text-3xl font-bold text-gray-900">
              Facturas de Clientes ({filteredFacturas.length})
            </h1>
            <button
              onClick={() => navigate("/facturas")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Facturas Empleados
            </button>
          </div>

          <section className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Total
                  </th>
                  <th className="px-6 py-4 text-right text-gray-700 font-semibold">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFacturas.map((factura) => (
                  <motion.tr
                    key={factura.id}
                    className="bg-white border-b transition-all hover:bg-gray-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <td className="px-6 py-4 text-gray-800">{factura.id}</td>
                    <td className="px-6 py-4 text-gray-800">{factura.cliente}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {factura.fecha}
                    </td>
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
                          onClick={() =>
                            navigate(`/facturas/clientes/verfactura/${factura.id}`)
                          }
                        />
                        <MdFileDownload
                          className="cursor-pointer"
                          onClick={() => descargarFactura(factura.id)}
                        />
                      </motion.div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ListaFacturasClientes;
