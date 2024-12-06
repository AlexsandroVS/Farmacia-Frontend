const TablaResumenCliente = ({ reporte }) => (
    <section className="bg-white shadow-md rounded-xl overflow-hidden mb-6 p-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total Comprado</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total Subtotal</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total Igv</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Ganancia Neta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 text-gray-800">S/.{parseFloat(reporte.total_facturado).toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">S/.{parseFloat(reporte.total_subtotal).toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">S/.{parseFloat(reporte.total_igv).toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">
              S/.{((parseFloat(reporte.total_comprado) - parseFloat(reporte.gasto_pedidos))).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
  
  export default TablaResumenCliente;
  