import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import Loading from "../shared/Loading";
import axios from "axios";
import Error from "../shared/Error";
import { Card, Button, Input, Typography } from "@material-tailwind/react";

const EditarCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({ nombre: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://alexsandrovs.pythonanywhere.com/api/v1/categorias/${id}/`, categoria);
      // Redirigir a la vista de detalle de la categoría después de guardar los cambios
      navigate(`/VerDetallesCategorias/${id}`);
    } catch (error) {
      setError("No se pudo actualizar la categoría. Intenta nuevamente.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} backLink={`/verDetalleCategoria/${id}`} />;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full">
        <Navbar />
        <div className="p-6">
          <Card className="max-w-4xl p-8 shadow-lg bg-white rounded-lg mx-auto">
            <Typography variant="h5" color="blue-gray">
              Editar Categoría
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <Input
                label="Nombre de la Categoría"
                name="nombre"
                value={categoria.nombre}
                onChange={handleChange}
                required
              />
              <div className="flex space-x-4 justify-center">
                <Button
                  type="submit"
                  color="green"
                  className="text-white font-semibold hover:bg-green-600 transition-colors"
                >
                  Guardar Cambios
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  color="red"
                  className="text-white font-semibold hover:bg-red-600 transition-colors"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditarCategoria;
