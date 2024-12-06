const TablaResumen = ({ reporte }) => (
    <section className="bg-white shadow-md rounded-xl overflow-hidden mb-6 p-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total Facturado</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total IGV</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total Subtotal</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Gasto Pedidos</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Ganancia Neta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 text-gray-800">S/.{parseFloat(reporte.total_facturado).toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">S/.{parseFloat(reporte.total_igv).toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">S/.{parseFloat(reporte.total_subtotal).toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">S/.{parseFloat(reporte.total_pedidos).toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">
              S/.{((parseFloat(reporte.total_facturado) - parseFloat(reporte.total_pedidos))- parseFloat(reporte.total_igv)).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
  
  export default TablaResumen;
  