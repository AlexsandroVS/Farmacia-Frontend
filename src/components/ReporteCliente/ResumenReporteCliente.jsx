const ResumenReporteCliente = ({ reporte }) => (
    <div className="mb-4">
      <p><strong>Total Facturado:</strong> S/. {reporte.total_facturado}</p>
      <p><strong>Total IGV:</strong> S/. {reporte.total_igv}</p>
      <p><strong>Total Subtotal:</strong> S/. {reporte.total_subtotal}</p>
    </div>
  );
  
  export default ResumenReporteCliente;
  