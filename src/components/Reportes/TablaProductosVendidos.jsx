const TablaProductosVendidos = ({ reporte, searchQuery }) => {
    const filteredProductos = searchQuery
      ? reporte.productos_vendidos.filter((producto) =>
          producto.producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : reporte.productos_vendidos;
  
    return (
      <section className="bg-white shadow-md rounded-xl overflow-hidden mb-6 p-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Productos Vendidos</h3>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700 font-semibold">Producto</th>
              <th className="px-6 py-4 text-left text-gray-700 font-semibold">Cantidad Vendida</th>
              <th className="px-6 py-4 text-left text-gray-700 font-semibold">Precio Unitario</th>
              <th className="px-6 py-4 text-left text-gray-700 font-semibold">IGV</th>
              <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto, index) => {
              const totalVendido = parseFloat(producto.total_vendido);
              const precio = parseFloat(producto.producto.precio);
              const igv = totalVendido * precio * 0.18;
              const total = totalVendido * precio + igv;
              return (
                <tr key={index} className="bg-white border-b transition-all hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-800">{producto.producto.nombre}</td>
                  <td className="px-6 py-4 text-gray-800">{producto.total_vendido}</td>
                  <td className="px-6 py-4 text-gray-800">{precio.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-800">{igv.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-800">{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  };
  
  export default TablaProductosVendidos;
  