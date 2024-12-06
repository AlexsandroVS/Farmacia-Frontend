import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";

function Escasez() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/productos/");
        const productos = response.data;
        const bajoStock = productos.filter((producto) => producto.stock <= 5); // Cambia el umbral según sea necesario
        setProductosBajoStock(bajoStock);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleReabastecer = () => {
    navigate("/pedidos"); 
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gray-200">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="p-8 bg-gray-200 min-h-screen">
          <h1 className="text-3xl font-bold mb-6 text-gray-950 font-poppins">
            Productos en Escasez
          </h1>

          {productosBajoStock.length === 0 ? (
            <p className="text-xl text-gray-700">
              No hay productos en bajo stock.
            </p>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Lista de Productos
              </h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Nombre del Producto</th>
                    <th className="py-2 px-4 border-b">Cantidad en Stock</th>
                    <th className="py-2 px-4 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosBajoStock.map((producto) => (
                    <tr key={producto.id}>
                      <td className="py-2 px-4 border-b">{producto.nombre}</td>
                      <td className="py-2 px-4 border-b">{producto.stock}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                          onClick={handleReabastecer}
                        >
                          Reabastecer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Escasez;
