import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loading from "../shared/Loading";
import Navbar from "../shared/Navbar";
import axios from "axios";

const EditarEmpleado = () => {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://alexsandrovs.pythonanywhere.com/api/v1/empleados/${id}/`
        );
        setEmpleado(response.data);
      } catch (error) {
        setError("No se pudo obtener la información. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    const [parent, child] = name.split(".");
    if (child) {
      setEmpleado((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setEmpleado((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submitting
    
    // Excluir el campo 'usuario.username' antes de enviar la solicitud PUT
    const { usuario, ...empleadoSinUsername } = empleado;

    try {
      const response = await axios.put(
        `https://alexsandrovs.pythonanywhere.com/api/v1/empleados/${id}/`,
        empleadoSinUsername, // Enviar sin 'usuario.username'
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate(-1); // Navigate back after successful update
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data ||
        "No se pudo actualizar el empleado. Intenta nuevamente.";
      setError(errorMsg);
    }
  };

  const renderInput = (label, name, type = "text", required = true) => {
    const value =
      name.includes(".")
        ? empleado[name.split(".")[0]]?.[name.split(".")[1]] || ""
        : empleado[name] || "";

    // Evitar que un objeto sea pasado al input
    if (typeof value === "object") {
      console.error(`El valor de ${name} es un objeto y no debe ser pasado a un campo de texto.`);
      return null;
    }

    return (
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          {label}:
        </label>
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          required={required}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
    );
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!empleado) return <div>No se encontró el empleado.</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full overflow-auto">
        <Navbar />
        <div className="container mx-auto p-6 sm:p-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Editar Empleado
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              <div className="col-span-1">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                  Información Personal
                </h3>
                {renderInput("Nombre", "persona.nombre")}
                {renderInput("Apellidos", "persona.apellidos")}
                {renderInput("Dirección", "persona.direccion")}
                {renderInput("Correo Electrónico", "persona.correo", "email")}
                {renderInput("Teléfono", "persona.telefono", "tel")}
                {renderInput("Identificación", "persona.identificacion")}
              </div>
              <div className="col-span-1">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                  Información Laboral
                </h3>
                {renderInput("Cargo", "cargo")}
                {renderInput("Fecha de Contratación", "fecha_contratacion", "date")}
                {renderInput("Salario", "salario", "number")}
              </div>
              {/* Eliminado el campo de 'username' */}
              <div className="col-span-1">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                  Información de Usuario
                </h3>
                {/* Ya no es necesario mostrar el campo 'Username' */}
              </div>
              <div className="col-span-full flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                >
                  Actualizar Empleado
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarEmpleado;
