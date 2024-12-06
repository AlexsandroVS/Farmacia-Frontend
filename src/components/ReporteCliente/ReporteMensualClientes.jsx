import React, { useState, useEffect } from "react";
import axios from "axios";

const ReporteMensualClientes = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Año actual por defecto
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mes actual por defecto
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReporte = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/reporte-mensual-cliente/${year}/${month}/`);
      setReporte(response.data);
    } catch (err) {
      setError("Error al cargar el reporte.");
    } finally {
      setLoading(false);
    }
  };

  const descargarReportePDF = () => {
    const url = `https://alexsandrovs.pythonanywhere.com/api/v1/reporte_mensual_pdf/${year}/${month}/`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (year && month) {
      fetchReporte();
    }
  }, [year, month]);

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <section className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Reporte Mensual - {reporte.nombre_mes} {reporte.year}
      </h2>

      {/* Selección de Mes y Año */}
      <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="mes" className="block text-gray-700 font-semibold mb-2">Mes:</label>
            <input
              type="number"
              id="mes"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Ej. 12"
              min="1"
              max="12"
            />
          </div>
          <div>
            <label htmlFor="anio" className="block text-gray-700 font-semibold mb-2">Año:</label>
            <input
              type="number"
              id="anio"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Ej. 2024"
            />
          </div>
        </div>
        <button
          onClick={fetchReporte}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Obtener Reporte
        </button>
      </div>

      {/* Botón para Descargar el Reporte en PDF */}
      <div className="text-center mb-6">
        <button
          onClick={descargarReportePDF}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Descargar Reporte en PDF
        </button>
      </div>

      {/* Datos del Reporte */}
      <ResumenReporteCliente reporte={reporte} />
      {reporte.productos_vendidos && reporte.productos_vendidos.length > 0 ? (
        <TablaProductosVendidosCliente reporte={reporte} />
      ) : (
        <p className="text-center text-gray-600 mt-4">No se encontraron productos vendidos para este mes.</p>
      )}
    </section>
  );
};

// Componente Resumen
const ResumenReporteCliente = ({ reporte }) => (
  <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
    <p className="text-lg font-semibold text-gray-800 mb-2"><strong>Total Facturado:</strong> S/. {reporte.total_facturado}</p>
    <p className="text-lg font-semibold text-gray-800 mb-2"><strong>Total IGV:</strong> S/. {reporte.total_igv}</p>
    <p className="text-lg font-semibold text-gray-800 mb-2"><strong>Total Subtotal:</strong> S/. {reporte.total_subtotal}</p>
  </div>
);

// Componente Tabla Productos Vendidos Cliente
const TablaProductosVendidosCliente = ({ reporte }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold mb-4">Productos Vendidos</h3>
    <table className="w-full table-auto border-collapse shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">Producto</th>
          <th className="border px-4 py-2 text-left">Cantidad Vendida</th>
          <th className="border px-4 py-2 text-left">Precio Unitario</th>
          <th className="border px-4 py-2 text-left">IGV</th>
        </tr>
      </thead>
      <tbody>
        {reporte.productos_vendidos.map((producto, index) => (
          <tr key={index} className="border-b hover:bg-gray-50">
            <td className="border px-4 py-2">
              <div className="flex items-center">
                <span>{producto.producto.nombre}</span>
              </div>
            </td>
            <td className="border px-4 py-2">{producto.total_vendido}</td>
            <td className="border px-4 py-2">S/. {parseFloat(producto.producto.precio).toFixed(2)}</td>
            <td className="border px-4 py-2">
              S/. {(
                parseFloat(producto.producto.precio) - parseFloat(producto.producto.precio_sin_igv)
              ).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReporteMensualClientes;
