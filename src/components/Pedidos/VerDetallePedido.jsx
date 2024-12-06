import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';  // Importar Sidebar
import Navbar from '../shared/Navbar';    // Importar Navbar

const VerDetallePedido = () => {
  const { id } = useParams();  // Obtener el ID del pedido desde la URL
  const navigate = useNavigate();  // Usado para redirigir al usuario después de la actualización
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estado, setEstado] = useState("");  // Estado para actualizar el pedido

  // Obtener el detalle del pedido cuando se monta el componente
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/${id}/`);
        setPedido(response.data);  // Guardamos el pedido en el estado
        setEstado(response.data.estado);  // Cargar el estado actual del pedido
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('No se pudo obtener el detalle del pedido.');
        console.error("Error al obtener el pedido:", error);
      }
    };

    fetchPedido();
  }, [id]);

  const handleEstadoChange = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Actualizamos el estado del pedido
    const updatedPedido = {
      ...pedido,  // Mantén los otros datos del pedido
      estado: estado,  // Solo actualizamos el estado
    };
  
    try {
      // Enviar PUT para actualizar el estado del pedido
      const response = await axios.put(`https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/${id}/`, updatedPedido);
      
      if (response.status === 200) {
        // Si el estado del pedido es "Completado", actualizamos el stock del producto
        if (estado === "Completado") {
          const updatedProducto = {
            ...pedido.producto,
            stock: pedido.producto.stock + pedido.cantidad,  // Aumentamos el stock del producto
          };
  
          // Enviar PUT para actualizar el producto
          await axios.put(`https://alexsandrovs.pythonanywhere.com/api/v1/productos/${pedido.producto.id}/`, updatedProducto);
  
          alert("Pedido y stock actualizado exitosamente");
        } else {
          alert("Pedido actualizado exitosamente");
        }
        setPedido(response.data);  // Actualiza el pedido con la respuesta del backend
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError("Hubo un error al actualizar el estado del pedido.");
      console.error("Error al actualizar el pedido:", error);
    }
  };
  

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100">
          <Navbar />
          <div className="p-8">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100">
          <Navbar />
          <div className="p-8 text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Detalle del Pedido</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">Pedido #{pedido.id}</h3>
              <p className="text-gray-500">Fecha: {pedido.fecha_pedido}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">Detalles del Producto</h4>
              <p className="text-gray-500">Producto: {pedido.producto.nombre}</p>
              <p className="text-gray-500">Cantidad: {pedido.cantidad}</p>
              <p className="text-gray-500">Precio de Compra: {pedido.precio_compra}</p>
              <p className="text-gray-500">Total: {pedido.total_pedido}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">Proveedor</h4>
              <p className="text-gray-500">{pedido.proveedor.nombre}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">Estado del Pedido</h4>
              <p className="text-gray-500">{pedido.estado}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">Actualizar Estado</h4>
              <form onSubmit={handleEstadoChange} className="space-y-4">
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completado">Completado</option>
                </select>
                <button
                  type="submit"
                  className={`w-full bg-blue-600 text-white p-3 rounded-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Actualizando...' : 'Actualizar Estado'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerDetallePedido;
