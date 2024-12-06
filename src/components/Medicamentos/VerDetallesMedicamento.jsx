import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loading from "../shared/Loading";
import Navbar from "../shared/Navbar";
import axios from "axios";
import Error from "../shared/Error";
import { Typography, Button } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const VerDetalleMedicamento = () => {
  const { id } = useParams();
  const [medicamento, setMedicamento] = useState(null);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseMedicamento = await axios.get(
          `http://localhost:8000/api/v1/medicamentos/${id}/`
        );
        setMedicamento(responseMedicamento.data);

        const responseProducto = await axios.get(
          `http://localhost:8000/api/v1/productos/${responseMedicamento.data.producto}/`
        );
        const productoData = responseProducto.data;
        productoData.precio = parseFloat(productoData.precio);

        setProducto(productoData);
      } catch (error) {
        console.error(error);
        setError("No se pudo obtener el medicamento o su producto asociado.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleRecetaToggle = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/medicamentos/${id}/`,
        { receta_obligatoria: !medicamento.receta_obligatoria }
      );
      setMedicamento(prev => ({
        ...prev,
        receta_obligatoria: !prev.receta_obligatoria
      }));
    } catch (error) {
      console.error("Error al actualizar el estado de la receta:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!medicamento) return <div>No se encontró el medicamento.</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="w-64 h-full fixed left-0" />

      {/* Main Content */}
      <div className=" flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <div className="p-6 space-y-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-gray-600 space-x-2"
          >
            <Button variant="text" onClick={() => navigate("/inventario")} className="text-lg">
              Inventario
            </Button>
            <FaAngleRight />
            <Button variant="text" onClick={() => navigate("/ListaMedicamentos")} className="text-lg">
              Lista de Medicamentos
            </Button>
            <FaAngleRight />
            <Typography variant="h5" className="text-black font-semibold">
              {producto?.nombre || "Sin nombre"}
            </Typography>
          </motion.div>

          {/* Details Card */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-white rounded-lg shadow-md flex space-x-8"
          >
            {/* Product Image */}
            {producto?.imagen_url && (
              <div className="w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Product Details */}
            <div className="flex-1">
              <Typography variant="h6" className="text-gray-800 font-bold mb-4">
                Información del Producto
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <InfoCard title="Descripción" content={producto?.descripcion || "Sin descripción"} />
                <InfoCard title="Presentación" content={producto?.presentacion || "Sin presentación"} />
                <InfoCard title="Precio Unitario" content={producto?.precio ? `$${producto.precio.toFixed(2)}` : "N/A"} />
                <InfoCard title="Fecha de Vencimiento" content={producto?.fecha_vencimiento || "Sin fecha"} />
                <InfoCard title="Stock" content={producto?.stock ?? "Sin stock"} />
                <InfoCard title="Proveedor" content={producto?.proveedor_nombre || "Sin proveedor"} />
                <InfoCard title="Categoría" content={producto?.categoria_nombre || "Sin categoría"} />
                <InfoCard title="Receta Obligatoria" content={medicamento?.receta_obligatoria ? "Sí" : "No"} />
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <Button onClick={() => navigate(-1)} className="bg-blue-500">
                  Regresar
                </Button>
                <Button onClick={handleRecetaToggle} className="bg-yellow-500">
                  {medicamento.receta_obligatoria ? "Marcar como No Obligatoria" : "Marcar como Obligatoria"}
                </Button>
                <Button
                  onClick={async () => {
                    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este Medicamento?");
                    if (confirmDelete) {
                      try {
                        await axios.delete(`http://localhost:8000/api/v1/medicamentos/${medicamento.id}/`);
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, content }) => (
  <div className="p-4 bg-gray-50 rounded-lg shadow">
    <Typography variant="small" className="text-gray-700">
      <strong>{title}:</strong> {content}
    </Typography>
  </div>
);




export default VerDetalleMedicamento;
