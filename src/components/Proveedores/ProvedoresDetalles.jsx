import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../shared/Navbar';
import Error from '../shared/Error';
import Loading from '../shared/Loading';
import { FaArrowLeft, FaEdit, FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";

function ProveedoresDetalles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/${id}/`);
        setProveedor(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del proveedor:", error);
        setError("Hubo un problema al cargar los datos del proveedor.");
      }
    };

    fetchProveedor();
  }, [id]);

  const handleBack = () => navigate(-1);
  const handleEdit = () => navigate(`/editarProveedor/${id}`);
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de eliminar este proveedor?")) {
      axios.delete(`https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/${id}/`)
        .then(() => navigate('/ListaProveedores'))
        .catch(error => setError("Error al eliminar el proveedor."));
    }
  };

  const handleOrder = () => {
    navigate(`/crearPedido/`);
  };

  if (error) return <Error />;
  if (!proveedor) return <Loading />;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gray-100">
        <Navbar />
        <div className="flex-grow p-6 overflow-auto">
          <nav className="text-gray-500 mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button onClick={() => navigate('/GestionContactos')} className="text-slate-600 text-2xl font-semibold hover:underline">
                  Gestión de Contactos
                </button>
              </li>
              <FaAngleRight className='w-5 h-5'/>
              <li>
                <button onClick={() => navigate('/ListaProveedores')} className="text-slate-600 text-2xl font-semibold hover:underline">
                  Lista de Proveedores
                </button>
              </li>
              <FaAngleRight className='w-5 h-5'/>
              <li className="font-semibold text-gray-950 text-3xl">{proveedor.nombre}</li>
            </ol>
          </nav>

          {/* Proveedor Details */}
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">{proveedor.nombre}</h1>
              <div className="flex space-x-4">
                <button onClick={handleBack} className="flex items-center px-5 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all">
                  <FaArrowLeft className="mr-2" /> Regresar
                </button>
                <button onClick={handleEdit} className="flex items-center px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                  <FaEdit className="mr-2" /> Editar
                </button>
                <button onClick={handleDelete} className="flex items-center px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                  <FaTrashAlt className="mr-2" /> Eliminar
                </button>
                
              </div>
            </div>
            <div className="space-y-4">
              <p><strong>Dirección:</strong> {proveedor.direccion}</p>
              <p><strong>Teléfono:</strong> {proveedor.telefono}</p>
              <p><strong>Email:</strong> {proveedor.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProveedoresDetalles;
