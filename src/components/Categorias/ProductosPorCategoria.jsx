import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loading from "../shared/Loading";
import Navbar from "../shared/Navbar";
import NoProducts from "../Producto/NoProducts";
import axios from "axios";
import { Card, Button, Typography } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useSearch } from "../shared/SearchContext"; 

const ProductosPorCategoria = () => {
  const { id } = useParams(); 
  const { searchQuery } = useSearch(); 
  const [productos, setProductos] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      if (!id) {
        setError("ID de categoría no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        const productosResponse = await axios.get(
          `https://alexsandrovs.pythonanywhere.com/api/v1/productos/?categoria_id=${id}`
        );
        setProductos(productosResponse.data);

        const categoriaResponse = await axios.get(
          `https://alexsandrovs.pythonanywhere.com/api/v1/categorias/${id}/`
        );
        setCategoriaNombre(categoriaResponse.data.nombre);
      } catch (error) {
        setError("No se pudieron cargar los productos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  // Filtrar los productos según el término de búsqueda
  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!filteredProductos.length) return <NoProducts />;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 overflow-y-auto">
        <Navbar />
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center mb-4">
            <Button
              onClick={() => navigate("/inventario")}
              variant="text"
              color="blue-gray"
              className="font-semibold"
            >
              <p className="text-2xl text-gray-500">Inventario</p>
            </Button>
            <FaAngleRight className="text-gray-600 mx-2" />
            <Button
              onClick={() => navigate("/categorias")}
              variant="text"
              color="blue-gray"
              className="font-semibold"
            >
              <p className="text-2xl text-gray-500">Categorías</p>
            </Button>
            <FaAngleRight className="text-gray-600 mx-2" />
            <Typography variant="h4" color="blue-gray">
              <p className="text-3xl text-gray-700">{categoriaNombre || "Categoría"}</p>
            </Typography>
          </div>

          {/* Lista de productos con animación */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {filteredProductos.map((producto) => (
              <motion.div
                key={producto.id}
                className="p-4 shadow-lg bg-white rounded-lg transform transition-all hover:scale-105 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col items-center">
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre || "Imagen del producto"}
                      className="w-full h-48 rounded-lg object-cover mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 rounded-lg bg-gray-200 flex items-center justify-center mb-4">
                      <span className="text-gray-500">Sin imagen disponible</span>
                    </div>
                  )}
                  <Typography variant="h5" color="blue-gray" className="text-center">
                    {producto.nombre || "Sin nombre"}
                  </Typography>
                  <Typography className="text-gray-700">
                    Precio: ${producto.precio != null ? Number(producto.precio).toFixed(2) : "N/A"}
                  </Typography>
                  <div className="mt-4">
                    <Button
                      onClick={() => navigate(`/verDetalleProducto/${producto.id}`)}
                      color="blue"
                      className="text-white font-semibold hover:bg-blue-600 transition-all"
                    >
                      Ver Detalle
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductosPorCategoria;
