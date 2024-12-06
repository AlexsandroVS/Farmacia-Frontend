import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarPedido = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [fechaPedido, setFechaPedido] = useState("");
  const [totalPedido, setTotalPedido] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedido = async () => {
      const response = await axios.get(
        `https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/${id}/`
      );
      setPedido(response.data);
      setFechaPedido(response.data.fecha_pedido);
      setTotalPedido(response.data.total_pedido);
      setEstado(response.data.estado);
      setProveedor(response.data.proveedor?.id || "");  // Asegúrate de que proveedor sea un ID
    };
    fetchPedido();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedPedido = {
      fecha_pedido: fechaPedido,
      total_pedido: totalPedido,
      estado: estado,
      proveedor_id: proveedor,
      producto_id: pedido.producto.id,
    };
  
    try {
      const response = await axios.put(
        `https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/${id}/`,
        updatedPedido
      );
      navigate("/pedidos");
    } catch (error) {
      // Verifica si el error es específico para el estado completado
      if (estado === "completado") {
        console.log("El estado completado no genera un error visual.");
      } else {
        console.error("Error al actualizar el pedido", error);
      }
    }
  };
  

  if (!pedido) return <div>Cargando...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={fechaPedido}
          onChange={(e) => setFechaPedido(e.target.value)}
        />
        <input
          type="number"
          value={totalPedido}
          onChange={(e) => setTotalPedido(e.target.value)}
        />
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
        <input
          type="number"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Pedido"}
        </button>
      </form>
    </div>
  );
};

export default EditarPedido;
