import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loading from "../shared/Loading";
import Navbar from "../shared/Navbar";
import axios from "axios";
import Error from "../shared/Error";
import { Card, Button, Typography } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const VerDetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/productos/${id}/`);
        setProducto(response.data);
      } catch (error) {
        setError("No se pudo obtener el producto. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!producto) return <div>No se encontró el producto.</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 overflow-y-auto">
        <Navbar />
        <div className="p-6">
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="flex items-center mb-4"
          >
            <Button
              onClick={() => navigate("/inventario")}
              variant="text"
              color="blue-gray"
              className="font-bold text-gray-500 text-2xl"
            >
              Inventario
            </Button>
            <FaAngleRight className="text-gray-600 mx-2" />
            <Button
              onClick={() => navigate("/ListaMedicinas")}
              variant="text"
              color="blue-gray"
              className="font-bold text-gray-500 text-2xl"
            >
              Lista de Productos
            </Button>
            <FaAngleRight className="text-gray-600 mx-2" />
            <Typography variant="h4" color="black" className="text-black text-3xl">
              {producto.nombre || "Sin nombre"}
            </Typography>
          </motion.div>

          <motion.div 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            className="max-w-4xl p-8 shadow-lg bg-white rounded-lg mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div className="flex justify-center">
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre || "Imagen del producto"}
                    className="w-full max-w-md rounded-lg shadow-lg object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full max-w-md rounded-lg shadow-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen disponible</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <Typography variant="h5" color="blue-gray" className="font-bold">
                  Detalles del Producto
                </Typography>
                <Typography>
                  <strong className="text-gray-700">Descripción:</strong> {producto.descripcion || "Sin descripción"}
                </Typography>
                <Typography>
                  <strong className="text-gray-700">Presentación:</strong> {producto.presentacion || "Sin presentación"}
                </Typography>
                <Typography>
                  <strong className="text-gray-700">Precio Unitario:</strong> {producto.precio != null ? Number(producto.precio).toFixed(2) : "N/A"}
                </Typography>
                <Typography>
                  <strong className="text-gray-700">Fecha de Vencimiento:</strong> {producto.fecha_vencimiento ? new Date(producto.fecha_vencimiento).toLocaleDateString() : "Sin fecha"}
                </Typography>
                <Typography>
                  <strong className="text-gray-700">Stock:</strong> {producto.stock != null ? producto.stock : "Sin stock"}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="font-bold">
                  Información Adicional
                </Typography>
                <Typography>
                  <strong className="text-gray-700">Proveedor:</strong> {producto.proveedor_nombre || "Sin proveedor"}
                </Typography>
                <Typography>
                  <strong className="text-gray-700">Categoría:</strong> {producto.categoria_nombre || "Sin categoría"}
                </Typography>
              </div>
            </div>

            <div className="flex space-x-4 justify-center mt-6">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={() => navigate(-1)}
                  color="blue"
                  className="text-white font-semibold hover:bg-blue-600 transition-colors"
                >
                  Regresar
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={() => navigate(`/editar/${producto.id}`)}
                  color="yellow"
                  className="text-white font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Editar
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={async () => {
                    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
                    if (confirmDelete) {
                      try {
                        await axios.delete(`https://alexsandrovs.pythonanywhere.com/api/v1/productos/${producto.id}/`);
                        alert("Producto eliminado exitosamente.");
                        navigate(-1);
                      } catch (error) {
                        console.error("Error eliminando el producto:", error);
                        alert("No se pudo eliminar el producto. Intenta nuevamente.");
                      }
                    }
                  }}
                  color="red"
                  className="text-white font-semibold hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VerDetalleProducto;
