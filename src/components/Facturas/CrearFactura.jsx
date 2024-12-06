import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Breadcrumb from "../shared/Breadcrumb";

const CrearFactura = () => {
  const [productos, setProductos] = useState([]); // Lista de productos disponibles
  const [personas, setPersonas] = useState([]); // Lista de personas desde la API
  const [persona, setPersona] = useState(""); // Persona seleccionada
  const [cliente, setCliente] = useState(""); // Nombre del cliente como string
  const [productosSeleccionados, setProductosSeleccionados] = useState([]); // Productos seleccionados en la factura
  const [total, setTotal] = useState(0); // Total de la factura
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]); // Estado para la fecha actual
  const navigate = useNavigate();

  // Obtener productos y personas desde la API al cargar el componente
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [productosRes, personasRes] = await Promise.all([
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/productos/"),
          axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/personas/"),
        ]);
        setProductos(productosRes.data);
        setPersonas(personasRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchDatos();
  }, []);

  // Calcular el total automáticamente al cambiar los productos seleccionados
  useEffect(() => {
    const nuevoTotal = productosSeleccionados.reduce(
      (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, [productosSeleccionados]);

  // Agregar un nuevo producto vacío a la lista
  const agregarProducto = () => {
    setProductosSeleccionados([
      ...productosSeleccionados,
      { id: "", cantidad: 1 },
    ]);
  };

  // Actualizar la información de un producto seleccionado
  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...productosSeleccionados];
    if (campo === "id") {
      const productoSeleccionado = productos.find(
        (producto) => producto.id === parseInt(valor)
      );
      if (productoSeleccionado) {
        nuevosProductos[index] = {
          ...nuevosProductos[index],
          id: productoSeleccionado.id,
          precio: productoSeleccionado.precio,
        };
      }
    } else {
      nuevosProductos[index][campo] = valor;
    }
    setProductosSeleccionados(nuevosProductos);
  };

  // Manejar el envío del formulario para crear la factura
  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!persona || isNaN(persona)) {
      alert("Por favor, selecciona una persona válida.");
      return;
    }
  
    try {
      const factura = {
        empleado: persona, // Ahora se usa persona
        cliente,
        fecha, // Fecha seleccionada
        detalles: productosSeleccionados.map((producto) => ({
          producto: parseInt(producto.id, 10),
          cantidad: parseInt(producto.cantidad, 10),
        })),
      };
  
  
      await axios.post("https://alexsandrovs.pythonanywhere.com/api/v1/facturas/", factura);
      navigate("/facturas");
    } catch (error) {
      console.error("Error al crear la factura:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Navbar />
        <section className="p-6 lg:px-10 flex-grow overflow-y-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            paths={[
              { name: "Inicio", link: "/" },
              { name: "Facturas", link: "/facturas" },
              { name: "Crear Factura", link: "" }, // Página actual
            ]}
          />

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Crear Factura
          </h1>
          <form
            onSubmit={manejarSubmit}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            {/* Selección de persona */}
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold mb-2">
                Persona
              </label>
              <select
                value={persona}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue) {
                    setPersona(parseInt(selectedValue, 10)); // Asegura que sea un número
                  } else {
                    setPersona(""); // Restaura a un estado válido
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Seleccionar persona</option>
                {personas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {/* Aquí usas nombre de persona */}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo de texto para el cliente */}
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold mb-2">
                Nombre del Cliente
              </label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Ingresar nombre del cliente"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Campo de fecha */}
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Selección de productos */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Productos
              </h2>
              {productosSeleccionados.map((producto, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <select
                    value={producto.id}
                    onChange={(e) =>
                      actualizarProducto(index, "id", e.target.value)
                    }
                    className="flex-grow px-4 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Seleccionar producto</option>
                    {productos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} - S/.{Number(p.precio || 0).toFixed(2)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) =>
                      actualizarProducto(
                        index,
                        "cantidad",
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    placeholder="Cantidad"
                    className="w-24 px-4 py-2 border rounded-lg text-right"
                    required
                  />
                </div>
              ))}
              <motion.button
                type="button"
                onClick={agregarProducto}
                className="text-green-600 hover:text-green-800 font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                + Agregar producto
              </motion.button>
            </div>

            {/* Total de la factura */}
            <div className="text-right text-xl font-bold text-gray-800 mb-6">
              Total: S/.{total.toFixed(2)}
            </div>

            {/* Botón para guardar la factura */}
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-shadow duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guardar Factura
            </motion.button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CrearFactura;
