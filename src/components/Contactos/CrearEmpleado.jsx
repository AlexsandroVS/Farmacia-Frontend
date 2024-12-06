import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CrearEmpleado() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    correo: "",
    telefono: "",
    identificacion: "",
    cargo: "",
    fecha_contratacion: "",
    salario: "",
    username: "",
    password: "",
    is_superuser: true,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos con la estructura que mencionaste
      await axios.post("https://alexsandrovs.pythonanywhere.com/api/v1/empleados/", {
        persona: {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          direccion: formData.direccion,
          correo: formData.correo,
          telefono: formData.telefono,
          identificacion: formData.identificacion,
        },
        cargo: formData.cargo,
        fecha_contratacion: formData.fecha_contratacion,
        salario: formData.salario,
        usuario: {
          username: formData.username,
          password: formData.password,
          is_superuser: formData.is_superuser,
        },
      });
      navigate("/ListaEmpleados"); // Redirigir a la lista de empleados
    } catch (error) {
      console.error("Error al crear empleado:", error);
      setError("Hubo un problema al crear el empleado.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full bg-gray-100">
        <Navbar />
        <section className="flex-grow p-6 bg-slate-50 overflow-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Crear Empleado</h1>
            <p className="text-gray-600">Completa el formulario para agregar un nuevo empleado.</p>
          </div>

          {error && <div className="bg-red-100 text-red-500 p-4 rounded mb-4">{error}</div>}

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="flex flex-col">
                  <label htmlFor="nombre" className="text-gray-700 font-medium">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Apellidos */}
                <div className="flex flex-col">
                  <label htmlFor="apellidos" className="text-gray-700 font-medium">Apellidos</label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Dirección */}
                <div className="flex flex-col">
                  <label htmlFor="direccion" className="text-gray-700 font-medium">Dirección</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Correo */}
                <div className="flex flex-col">
                  <label htmlFor="correo" className="text-gray-700 font-medium">Correo</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Teléfono */}
                <div className="flex flex-col">
                  <label htmlFor="telefono" className="text-gray-700 font-medium">Teléfono</label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Identificación */}
                <div className="flex flex-col">
                  <label htmlFor="identificacion" className="text-gray-700 font-medium">Identificación</label>
                  <input
                    type="text"
                    id="identificacion"
                    name="identificacion"
                    value={formData.identificacion}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Cargo */}
                <div className="flex flex-col">
                  <label htmlFor="cargo" className="text-gray-700 font-medium">Cargo</label>
                  <input
                    type="text"
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Fecha de Contratación */}
                <div className="flex flex-col">
                  <label htmlFor="fecha_contratacion" className="text-gray-700 font-medium">Fecha de Contratación</label>
                  <input
                    type="date"
                    id="fecha_contratacion"
                    name="fecha_contratacion"
                    value={formData.fecha_contratacion}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Salario */}
                <div className="flex flex-col">
                  <label htmlFor="salario" className="text-gray-700 font-medium">Salario</label>
                  <input
                    type="number"
                    step="0.01"
                    id="salario"
                    name="salario"
                    value={formData.salario}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Usuario - Username */}
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-gray-700 font-medium">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Usuario - Password */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>              
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Crear Empleado
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CrearEmpleado;