import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import axios from "axios";
import { Typography, Button, Checkbox, Input } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const CrearMedicamento = () => {
  const [productos, setProductos] = useState([]);
  const [medicamentoData, setMedicamentoData] = useState({
    producto: "",
    receta_obligatoria: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/");
        setProductos(response.data);
      } catch (error) {
        console.error(error);
        setError("No se pudo obtener los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://alexsandrovs.pythonanywhere.com/api/v1/medicamentos/",
        medicamentoData
      );
      console.log(response.data);
      navigate("/ListaMedicamentos");
    } catch (error) {
      console.error(error);
      setError("Hubo un error al crear el medicamento.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="w-64 h-full fixed left-0" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
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
            <Typography variant="h5" className="text-black font-semibold">
              Crear Medicamento
            </Typography>
          </motion.div>

          {/* Formulario Crear Medicamento */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <Typography variant="h6" className="text-gray-800 font-bold mb-4">
              Información del Medicamento
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Selección de Producto */}
              <div className="mb-4">
                <Typography variant="small" className="text-gray-700">
                  <strong>Seleccionar Producto</strong>
                </Typography>
                <select
                  value={medicamentoData.producto}
                  onChange={(e) => setMedicamentoData({ ...medicamentoData, producto: e.target.value })}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecciona un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkbox de Receta */}
              <div className="mb-4">
                <Checkbox
                  checked={medicamentoData.receta_obligatoria}
                  onChange={(e) =>
                    setMedicamentoData({ ...medicamentoData, receta_obligatoria: e.target.checked })
                  }
                  label="Receta obligatoria"
                />
              </div>

              {/* Botón de Enviar */}
              <div className="mt-6 flex space-x-4">
                <Button type="submit" className="bg-blue-500">
                  Crear Medicamento
                </Button>
                <Button onClick={() => navigate(-1)} className="bg-gray-500">
                  Cancelar
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CrearMedicamento;
