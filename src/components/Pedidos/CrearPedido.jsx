import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../shared/Loading";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import TablaPedidos from "./TablaPedidos";
import Breadcrumb from "../shared/Breadcrumb";

const CrearPedido = () => {
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pedidoActual, setPedidoActual] = useState({
    producto: "",
    proveedor: "",
    estado: "Pendiente",
    cantidad: 0,
    precioCompra: 0,
    fechaPedido: "",
  });

  // Calcular el total del pedido
  const totalPedido = (pedidoActual.cantidad * pedidoActual.precioCompra).toFixed(2);

  // Fetch inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proveedoresRes, productosRes] = await Promise.all([
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/proveedores/"),
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/"),
        ]);
        setProveedores(proveedoresRes.data);
        setProductos(productosRes.data);
      } catch {
        setError("Error al cargar datos de proveedores o productos.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPedidoActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarPedido = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    const { producto, proveedor, cantidad, precioCompra, fechaPedido } = pedidoActual;

    if (!producto || !proveedor || cantidad <= 0 || precioCompra <= 0 || !fechaPedido) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    const productoNombre = productos.find((prod) => prod.id === parseInt(producto))?.nombre || "";

    setPedidos((prev) => [
      ...prev,
      { ...pedidoActual, productoNombre, totalPedido },
    ]);

    setPedidoActual({
      producto: "",
      proveedor: "",
      estado: "Pendiente",
      cantidad: 0,
      precioCompra: 0,
      fechaPedido: "",
    });
  };

  const enviarPedidos = async () => {
    if (pedidos.length === 0) {
      alert("No hay pedidos para enviar.");
      return;
    }
  
    setLoading(true);
    setError(""); // Limpiar el mensaje de error antes de enviar los pedidos
    try {
      const pedidosValidos = pedidos.map((pedido) => ({
        producto_id: parseInt(pedido.producto, 10),
        proveedor_id: parseInt(pedido.proveedor, 10),
        estado: pedido.estado,
        cantidad: parseInt(pedido.cantidad, 10),
        precio_compra: parseFloat(pedido.precioCompra).toFixed(2),
        total_pedido: parseFloat(pedido.totalPedido).toFixed(2),
        fecha_pedido: pedido.fechaPedido,
      }));
  
      // Enviar los pedidos a la API
      await Promise.all(
        pedidosValidos.map((pedido) =>
          axios.post("https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/", pedido)
        )
      );
  
      setPedidos([]); // Limpiar la lista de pedidos después de enviar
      alert("Pedidos creados con éxito.");
    } catch (error) {
      // Solo mostrar el mensaje de error si hay un problema
      setError("No se pudieron crear los pedidos. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  

  const FormField = ({ label, children }) => (
    <div className="space-y-2">
      <label className="block text-lg font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );

  const Button = ({ onClick, text, disabled }) => (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold disabled:bg-gray-300"
      disabled={disabled}
    >
      {text}
    </button>
  );

  if (loading) return <Loading />;

  const breadcrumbPaths = [
    { name: "Inicio", link: "/" },
    { name: "Pedidos", link: "/pedidos", className: "text-2xl font-bold text-gray-600" },
    { name: "Crear Pedido", className: "text-3xl text-black" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="p-8">
          <Breadcrumb paths={breadcrumbPaths} />

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          <form
            onSubmit={agregarPedido}
            className="bg-white p-6 rounded-lg shadow-lg space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Producto">
                <select
                  name="producto"
                  value={pedidoActual.producto}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.nombre}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Cantidad">
                <input
                  type="number"
                  name="cantidad"
                  value={pedidoActual.cantidad}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormField>

              <FormField label="Precio Compra">
                <input
                  type="number"
                  name="precioCompra"
                  value={pedidoActual.precioCompra}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Proveedor">
                <select
                  name="proveedor"
                  value={pedidoActual.proveedor}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione un proveedor</option>
                  {proveedores.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Fecha Pedido">
                <input
                  type="date"
                  name="fechaPedido"
                  value={pedidoActual.fechaPedido}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormField>

              <FormField label="Estado">
                <select
                  name="estado"
                  value={pedidoActual.estado}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completado">Completado</option>
                </select>
              </FormField>
            </div>

            <Button text="Agregar Pedido" />
          </form>

          <TablaPedidos
            pedidos={pedidos}
            eliminarPedido={(index) => setPedidos((prev) => prev.filter((_, i) => i !== index))}
          />

          <Button text="Enviar Pedidos" onClick={enviarPedidos} disabled={pedidos.length === 0} />
        </div>
      </div>
    </div>
  );
};

export default CrearPedido;
