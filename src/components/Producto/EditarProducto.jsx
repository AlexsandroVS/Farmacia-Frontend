import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loading from "../shared/Loading";
import Navbar from "../shared/Navbar";
import axios from "axios";

const EditarProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productoResponse, categoriasResponse, proveedoresResponse] =
          await Promise.all([
            axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/productos/${id}/`),
            axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/categorias/"),
            axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/"),
          ]);
        setProducto(productoResponse.data);
        setCategorias(categoriasResponse.data);
        setProveedores(proveedoresResponse.data);
      } catch (error) {
        setError("No se pudo obtener la información. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ target }) => {
    if (target.files.length > 0) {
      setImagen(target.files[0]); // Actualiza con la nueva imagen
    } else {
      setImagen(null); // No sobrescribas la imagen existente
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Agregar datos del producto al FormData
    Object.keys(producto).forEach((key) => {
      if (key === "fecha_vencimiento") {
        formData.append(key, new Date(producto[key]).toISOString().split("T")[0]);
      } else if (key !== "imagen") { // Excluye la imagen del producto existente
        formData.append(key, producto[key]);
      }
    });
  
    // Solo incluir la imagen en FormData si se seleccionó una nueva
    if (imagen) {
      formData.append("imagen", imagen);
    }
  
    try {
      await axios.put(`https://alexsandrovs.pythonanywhere.com/api/v1/productos/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/verDetalleProducto/${id}`);
    } catch (error) {
      const errorMsg =
        error.response?.data ||
        "No se pudo actualizar el producto. Intenta nuevamente.";
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
        value={producto[name]}
        onChange={handleChange}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-md transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );

  const renderTextarea = (label, name, required = true) => (
    <div className="mb-4">
      <label className="block text-gray-950 text-xl font-bold font-lexend">
        {label}:
      </label>
      <textarea
        name={name}
        value={producto[name]}
        onChange={handleChange}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-md transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );

  const renderSelect = (label, name, options) => (
    <div className="mb-4">
      <label className="block text-gray-950 text-xl font-bold font-lexend">
        {label}:
      </label>
      <select
        name={name}
        value={producto[name]}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-md transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
      >
        {options.map(({ id, nombre }) => (
          <option key={id} value={id}>
            {nombre}
          </option>
        ))}
      </select>
    </div>
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!producto) return <div>No se encontró el producto.</div>;

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-grow flex flex-col h-full overflow-auto">
        <Navbar />
        <div className="p-8 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-950 font-poppins">
            Editar Producto
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderInput("Nombre", "nombre")}
              {renderTextarea("Descripción", "descripcion")}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput("Presentación", "presentacion")}
                {renderInput("Precio", "precio_sin_igv", "number")}
                {renderInput("Stock", "stock", "number")}
                {renderInput(
                  "Fecha de Vencimiento",
                  "fecha_vencimiento",
                  "date"
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-950 text-xl font-bold font-lexend">
                  Imagen:
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-md transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <img
                  src={imagen ? URL.createObjectURL(imagen) : producto.imagen}
                  alt="Imagen del producto"
                  className="mt-2 h-32 object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderSelect("Categoría", "categoria", categorias)}
                {renderSelect("Proveedor", "proveedor", proveedores)}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-3 px-6 rounded mt-4 hover:bg-blue-700 transition duration-200"
                >
                  Actualizar Producto
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

export default EditarProducto;
