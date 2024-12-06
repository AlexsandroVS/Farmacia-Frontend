import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import axios from "axios";

function CrearProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioSinIgv, setPrecioSinIgv] = useState("");
  const [stock, setStock] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [proveedor, setProveedor] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [imagen, setImagen] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las categorías y proveedores de la API
    const fetchData = async () => {
      try {
        const [categoriasRes, proveedoresRes] = await Promise.all([
          axios.get(
            "https://alexsandrovs.pythonanywhere.com/api/v1/categorias/"
          ),
          axios.get(
            "https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/"
          ),
        ]);
        setCategorias(categoriasRes.data);
        setProveedores(proveedoresRes.data);
      } catch (error) {
        console.error(
          "Error al cargar categorías o proveedores:",
          error.message
        );
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio_sin_igv", precioSinIgv);
    formData.append("stock", stock);
    formData.append("fecha_vencimiento", fechaVencimiento);
    formData.append("presentacion", presentacion);
    formData.append("categoria", categoria);
    formData.append("proveedor", proveedor);
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const response = await axios.post(
        "https://alexsandrovs.pythonanywhere.com/api/v1/productos/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Producto creado:", response.data);

      // Redirigir a la lista de productos
      navigate("/ListaMedicinas");

      // Limpiar los campos del formulario
      setNombre("");
      setDescripcion("");
      setPrecioSinIgv("");
      setStock("");
      setFechaVencimiento("");
      setPresentacion("");
      setCategoria("");
      setProveedor("");
      setImagen(null);
    } catch (error) {
      console.error(
        "Error al crear el producto:",
        error.response?.data || error.message
      );
      // Aquí podrías mostrar un mensaje de error si lo deseas
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo */}

      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-grow flex flex-col h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 overflow-y-auto">
        <Navbar />
        <div className="p-8 max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 font-poppins text-center">
            Crear Nuevo Producto
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-2xl shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Nombre:
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Descripción:
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Precio sin IGV */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Precio sin IGV:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={precioSinIgv}
                  onChange={(e) => setPrecioSinIgv(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Stock */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Stock:
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Fecha de vencimiento */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Fecha de Vencimiento:
                </label>
                <input
                  type="date"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Presentación */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Presentación:
                </label>
                <input
                  type="text"
                  value={presentacion}
                  onChange={(e) => setPresentacion(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Categoría */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Categoría:
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Seleccione una categoría
                  </option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Proveedor */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Proveedor:
                </label>
                <select
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Seleccione un proveedor
                  </option>
                  {proveedores.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Imagen */}
              <div className="mb-4">
                <label className="block text-gray-900 text-lg font-semibold mb-2">
                  Imagen:
                </label>
                <input
                  type="file"
                  onChange={(e) => setImagen(e.target.files[0])}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="py-3 px-6 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
              >
                Crear Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearProducto;
