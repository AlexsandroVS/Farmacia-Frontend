import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import ProveedorCard from './ProveedorCard'; 
import axios from 'axios';
import { useSearch } from "../shared/SearchContext"; 

function ListaProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch(); // Accede al valor de búsqueda global
  const navigate = useNavigate();

  // Función para obtener proveedores desde la API
  const fetchProveedores = async () => {
    try {
      const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
      setError("Hubo un problema al cargar los datos de proveedores.");
    } finally {
      setLoading(false);
    }
  };

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    fetchProveedores();
  }, []);

  // Redirige a la página de detalles del proveedor
  const handleDetailsClick = (id) => {
    navigate(`/DetallesProveedor/${id}`);
  };

  // Redirige a la página para crear un nuevo proveedor
  const handleCreateClick = () => {
    navigate('/CrearProveedor');
  };

  // Filtra los proveedores basados en el término de búsqueda global
  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
    proveedor.direccion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gray-100">
        <Navbar />

        <section className="flex-grow p-6 bg-slate-50 overflow-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Lista de Proveedores</h1>
            <p className="text-gray-600">Información detallada de todos los proveedores</p>
          </div>

          {/* Botón para crear proveedor */}
          <button
            onClick={handleCreateClick}
            className="mb-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Crear Proveedor
          </button>

          {/* Mostrar estado de carga, error o lista de proveedores */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">Cargando proveedores...</div>
          ) : error ? (
            <div className="bg-red-100 text-red-500 p-4 rounded">{error}</div>
          ) : filteredProveedores.length === 0 ? (
            <div className="text-center text-gray-500">No hay proveedores disponibles.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProveedores.map((proveedor) => (
                <ProveedorCard
                  key={proveedor.id}
                  id={proveedor.id}
                  nombre={proveedor.nombre}
                  direccion={proveedor.direccion}
                  contacto={proveedor.contacto}
                  activo={proveedor.activo}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ListaProveedores;
