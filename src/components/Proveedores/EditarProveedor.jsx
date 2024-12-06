import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loading from "../shared/Loading";
import Navbar from "../shared/Navbar";
import axios from "axios";

const EditarProveedor = () => {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/${id}/`);
        setProveedor(response.data);
      } catch (error) {
        setError("No se pudo obtener la información. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setProveedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://alexsandrovs.pythonanywhere.com/api/v1/v1/proveedores/${id}/`, proveedor, {
        headers: { "Content-Type": "application/json" },
      });
      navigate(`/DetallesProveedor/${id}`);
    } catch (error) {
      const errorMsg = error.response?.data || "No se pudo actualizar el proveedor. Intenta nuevamente.";
      setError(errorMsg);
    }
  };

  const renderInput = (label, name, type = "text", required = true) => (
    <div className="mb-4">
      <label className="block text-gray-950 text-xl font-bold font-lexend">
        {label}:
      </label>
      <input
        name={name}
        type={type}
        value={proveedor[name]}
        onChange={handleChange}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-md transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!proveedor) return <div>No se encontró el proveedor.</div>;

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full overflow-auto">
        <Navbar />
        <div className="p-8 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-950 font-poppins">Editar Proveedor</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderInput("Nombre", "nombre")}
              {renderInput("Dirección", "direccion")}
              {renderInput("Teléfono", "telefono", "tel")}
              {renderInput("Correo Electrónico", "email", "email")}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-3 px-6 rounded mt-4 hover:bg-blue-700 transition duration-200"
                >
                  Actualizar Proveedor
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-red-600 text-white font-bold py-3 px-6 rounded mt-4 ml-4 hover:bg-red-700 transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProveedor;
