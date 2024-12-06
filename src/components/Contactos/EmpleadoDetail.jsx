import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function EmpleadoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/empleados/${id}/`);
        setEmpleado(response.data);
      } catch (error) {
        setError("Hubo un problema al cargar los datos del empleado.");
      }
    };

    fetchEmpleado();
  }, [id]);

  const handleBack = () => navigate(-1);
  const handleEdit = () => navigate(`/editarEmpleado/${id}`);
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
      axios.delete(`https://alexsandrovs.pythonanywhere.com/api/v1/empleados/${id}/`)
        .then(() => navigate('/ListaEmpleados'))
        .catch(error => setError("Error al eliminar el empleado."));
    }
  };

  if (error) return <Error />;
  if (!empleado) return <Loading />;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full overflow-auto">
        <Navbar />
        <div className="p-6 sm:p-8 max-w-5xl mx-auto">
          {/* Breadcrumb integrado en el título */}
          <div className="mb-8">
            <nav className="text-gray-500">
              <ol className="flex items-center space-x-2 text-lg">
                <li>
                  <button onClick={() => navigate('/GestionContactos')} className="text-slate-600 font-medium hover:underline">
                    Gestión de Contactos
                  </button>
                </li>
                <FaAngleRight className="w-5 h-5 text-gray-400" />
                <li>
                  <button onClick={() => navigate('/ListaEmpleados')} className="text-slate-600 font-medium hover:underline">
                    Lista de Empleados
                  </button>
                </li>
                <FaAngleRight className="w-5 h-5 text-gray-400" />
                <li className="font-semibold text-gray-950 text-3xl">
                  {empleado.persona?.nombre}
                </li>
              </ol>
            </nav>
          </div>

          {/* Título de la página */}
          <h2 className="text-5xl font-bold text-gray-950 mb-6">
            Detalle del Empleado
          </h2>
          
          {/* Información del empleado */}
          <div className="bg-white p-8 rounded-lg shadow-xl space-y-6">
            <div className="space-y-6">
              {/* Información Personal */}
              <div>
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                  Información Personal
                </h3>
                <div className="space-y-3 text-lg">
                  <p><strong>Nombre:</strong> {empleado.persona?.nombre}</p>
                  <p><strong>Apellidos:</strong> {empleado.persona?.apellidos}</p>
                  <p><strong>Dirección:</strong> {empleado.persona?.direccion}</p>
                  <p><strong>Correo Electrónico:</strong> {empleado.persona?.correo}</p>
                  <p><strong>Teléfono:</strong> {empleado.persona?.telefono}</p>
                  <p><strong>Identificación:</strong> {empleado.persona?.identificacion}</p>
                </div>
              </div>

              {/* Información Laboral */}
              <div>
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                  Información Laboral
                </h3>
                <div className="space-y-3 text-lg">
                  <p><strong>Cargo:</strong> {empleado.cargo}</p>
                  <p><strong>Fecha de Contratación:</strong> {empleado.fecha_contratacion}</p>
                  <p><strong>Salario:</strong> S/{empleado.salario}</p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between mt-10 space-x-4">
                <button
                  onClick={handleBack}
                  className="bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition ease-in-out duration-200 w-full md:w-auto"
                >
                  <FaArrowLeft className="mr-2" /> Regresar
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition ease-in-out duration-200 w-full md:w-auto"
                >
                  <FaEdit className="mr-2" /> Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition ease-in-out duration-200 w-full md:w-auto"
                >
                  <FaTrashAlt className="mr-2" /> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpleadoDetail;
