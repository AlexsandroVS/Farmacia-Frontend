import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ReportePorMes = () => {
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReporte = async () => {
    if (!mes || !anio) {
      setError("Por favor, ingresa tanto el mes como el año.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = `https://alexsandrovs.pythonanywhere.com/api/v1/reporte-mensual/${anio}/${mes}/`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("No se pudo obtener el reporte.");

      const data = await response.json();
      setReporte(data);
    } catch (error) {
      setError("Error al obtener el reporte.");
      console.error("Detalles del error:", error);
    } finally {
      setLoading(false);
    }
  };

  const descargarReportePDF = () => {
    const url = `https://alexsandrovs.pythonanywhere.com/api/v1/reporte-mensual-pdf/${anio}/${mes}/`;
    window.open(url, "_blank");
  };
  

  const Table = ({ headers, data, renderRow }) => (
    <motion.table
      className="w-full border-collapse border border-gray-200 shadow-sm rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <thead className="bg-gray-200 text-gray-700 font-semibold">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 border">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </motion.table>
  );

  useEffect(() => {
    setReporte(null);
    setError("");
  }, [mes, anio]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Reporte Mensual
      </h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="mes" className="block text-gray-700 font-semibold">
            Mes:
          </label>
          <input
            type="number"
            id="mes"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Ej. 11"
          />
        </div>

        <div>
          <label htmlFor="anio" className="block text-gray-700 font-semibold">
            Año:
          </label>
          <input
            type="number"
            id="anio"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
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

      {loading && <p className="text-center text-blue-600 mt-4">Cargando...</p>}
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}

      {reporte && (
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Resumen del Reporte
            </h2>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
              <p>
                <strong>Facturado:</strong> S/.{reporte.total_facturado}
              </p>
              <p>
                <strong>IGV:</strong> S/.{reporte.total_igv}
              </p>
              <p>
                <strong>Subtotal:</strong> S/.{reporte.total_subtotal}
              </p>
              <p>
                <strong>Total Pedidos:</strong> {reporte.total_pedidos_count}
              </p>
              <p>
                <strong>Ganancia Neta:</strong> S/.
                {(
                  parseFloat(reporte.total_facturado) -
                  parseFloat(reporte.total_pedidos_mes || 0)
                ).toFixed(2)}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Productos Vendidos
            </h3>
            <Table
              headers={[
                "Producto",
                "Cantidad Vendida",
                "Precio Unitario",
                "IGV",
              ]}
              data={reporte.productos_vendidos}
              renderRow={(item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{item.producto.nombre}</td>
                  <td className="px-4 py-2 border">{item.total_vendido}</td>
                  <td className="px-4 py-2 border">
                    S/.{parseFloat(item.producto.precio).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    {(
                      parseFloat(item.producto.precio) -
                      parseFloat(item.producto.precio_sin_igv)
                    ).toFixed(2)}
                  </td>
                </tr>
              )}
            />
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Proveedores
            </h3>
            <Table
              headers={["Proveedor", "Total Pedidos"]}
              data={reporte.proveedores}
              renderRow={(proveedor, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{proveedor.nombre}</td>
                  <td className="px-4 py-2 border">
                    S/.{parseFloat(proveedor.total_pedidos_mes).toFixed(2)}
                  </td>
                </tr>
              )}
            />
          </section>
        </div>
      )}

      <button
        onClick={descargarReportePDF}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors mt-4"
      >
        Descargar PDF
      </button>
    </div>
  );
};

export default ReportePorMes;
