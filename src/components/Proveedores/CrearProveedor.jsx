import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import axios from "axios";

function CrearProveedor() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProveedor = {
      nombre,
      direccion,
      telefono,
      email,
    };

    try {
      await axios.post("https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/", newProveedor);

      // Restablece los campos del formulario
      setNombre("");
      setDireccion("");
      setTelefono("");
      setEmail("");

      // Redirige a la lista de proveedores
      navigate("/ListaProveedores");

    } catch (error) {
      // Aquí podrías manejar el error de manera adecuada si lo deseas
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar fijo */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 z-10">
        <Sidebar />
      </div>

      {/* Contenedor principal, desplazable */}
      <div className="flex-grow ml-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 overflow-y-auto">
        <Navbar />
        <div className="p-8 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 font-poppins text-center">
            Crear Nuevo Proveedor
          </h2>
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl transition duration-300 transform hover:-translate-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">Nombre:</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">Dirección:</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">Teléfono:</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)} 
                className="py-3 px-6 bg-gray-500 text-white text-lg rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-3 px-6 bg-blue-500 text-white text-lg rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
              >
                Crear Proveedor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearProveedor;
