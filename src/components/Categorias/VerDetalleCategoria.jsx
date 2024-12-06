import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loading from "../shared/Loading";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { Card, Button, Typography } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa6";

const VerDetalleCategoria = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/categorias/${id}/`);
        setCategoria(response.data);
      } catch (error) {
        setError("No se pudo obtener la categoría. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!categoria) return <div>No se encontró la categoría.</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full">
        <Navbar />
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center mb-4">
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
              <p className="text-3xl text-gray-700">{categoria.nombre || "Sin nombre"}</p>
            </Typography>
          </div>

          <Card className="max-w-4xl p-8 shadow-lg bg-white rounded-lg mx-auto">
            <div className="space-y-4">
              <Typography variant="h5" color="blue-gray">
                Detalles de la Categoría
              </Typography>
              <Typography>
                <strong className="text-gray-700">Nombre:</strong> {categoria.nombre || "Sin nombre"}
              </Typography>
              <Typography>
                <strong className="text-gray-700">ID:</strong> {categoria.id || "Sin ID"}
              </Typography>
            </div>

            <div className="flex space-x-4 justify-center mt-6">
              <Button
                onClick={() => navigate(-1)}
                color="blue"
                className="text-white font-semibold hover:bg-blue-600 transition-colors"
              >
                Regresar
              </Button>
              <Button
                onClick={() => navigate(`/editarCategoria/${categoria.id}`)}
                color="yellow"
                className="text-white font-semibold hover:bg-yellow-500 transition-colors"
              >
                Editar
              </Button>
              <Button
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "¿Estás seguro de que deseas eliminar esta categoría?"
                  );
                  if (confirmDelete) {
                    const deleteCategoria = async () => {
                      try {
                        await axios.delete(`https://alexsandrovs.pythonanywhere.com/api/categorias/${id}/`);
                        navigate("/categorias"); // Redirigir después de eliminar
                      } catch (error) {
                        setError("No se pudo eliminar la categoría. Intenta nuevamente.");
                      }
                    };
                    deleteCategoria();
                  }
                }}
                color="red"
                className="text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Eliminar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerDetalleCategoria;
