import React from "react";

const TablaProductosVendidosCliente = ({ reporte, searchQuery }) => {
  const productos = reporte?.productos_vendidos || []; // Asegúrate de que 'productos_vendidos' esté definido

  // Filtrar productos según el query de búsqueda (con manejo de undefined)
  const productosFiltrados = productos.filter((producto) =>
    producto.producto?.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-white shadow-md rounded-xl overflow-hidden mb-6 p-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Nombre del Producto</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Cantidad Vendida</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Precio Unitario</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total Vendido</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.producto.id}>
              <td className="px-6 py-4 text-gray-800">{producto.producto.nombre}</td>
              <td className="px-6 py-4 text-gray-800">{producto.total_vendido}</td>
              <td className="px-6 py-4 text-gray-800">S/.{parseFloat(producto.producto.precio).toFixed(2)}</td>
              <td className="px-6 py-4 text-gray-800">
                S/.{(producto.total_vendido * parseFloat(producto.producto.precio)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TablaProductosVendidosCliente;
