import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar"; // Asegúrate de tener tu Sidebar
import Navbar from "../shared/Navbar"; // Asegúrate de tener tu Navbar
import Loading from "../shared/Loading"; // Componente para mostrar mientras carga la factura
import Breadcrumb from "../shared/Breadcrumb"; // Importa el Breadcrumb

const VerFactura = () => {
  const { id } = useParams(); // Obtener el id de la factura desde la URL
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener los detalles de la factura desde la API
  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const response = await axios.get(`https://alexsandrovs.pythonanywhere.com/api/v1/facturas/${id}/`);
        const facturaData = response.data;

        // Asegúrate de que los valores de subtotal, igv y total sean números
        facturaData.subtotal = parseFloat(facturaData.subtotal) || 0;
        facturaData.igv = parseFloat(facturaData.igv) || 0;
        facturaData.total = parseFloat(facturaData.total) || 0;

        setFactura(facturaData); // Aquí guardamos los datos de la factura
      } catch (error) {
        console.error("Error al obtener los detalles de la factura:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactura();
  }, [id]);

  if (loading) {
    return <Loading />; // Mostrar el componente de carga mientras se obtienen los datos
  }

  if (!factura) {
    return <div>No se encontró la factura</div>; // Si no se encuentra la factura
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Navbar />
        <section className="flex-grow p-8 lg:px-12 overflow-y-auto transition-transform duration-300 ease-in-out">
          <Breadcrumb
           className = "mb-5 text-xl"
            paths={[
              { name: "Lista de Facturas", link: "/facturas" },
              { name: `Detalle de Factura Nro° ${factura.id}` }
            ]}
          />
          
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 transition-all duration-500 ease-in-out transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Factura #{factura.id}</h2>
            <div className="text-lg mb-4">
              <p className="text-gray-700 mb-2"><strong>Empleado:</strong> {factura.empleado_nombre}</p>
              <p className="text-gray-700 mb-2"><strong>Cliente:</strong> {factura.cliente}</p>
              <p className="text-gray-700 mb-2"><strong>Fecha:</strong> {factura.fecha}</p>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="w-full md:w-1/3">
                <p className="text-xl font-semibold text-gray-900"><strong>Total:</strong> {factura.total.toFixed(2)}</p>
              </div>
              <div className="w-full md:w-1/3">
                <p className="text-xl font-semibold text-gray-900"><strong>Subtotal:</strong> {factura.subtotal .toFixed(2)}</p>
              </div>
              <div className="w-full md:w-1/3">
                <p className="text-xl font-semibold text-gray-900"><strong>IGV (18%):</strong> {factura.igv.toFixed(2)}</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detalles de los productos:</h3>
            <table className="min-w-full table-auto mb-8">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">Producto</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">Cantidad</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">Precio Unitario</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">Subtotal</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {factura.detalles.map((detalle, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100 transition-colors duration-200">
                    <td className="px-6 py-4">{detalle.producto}</td>
                    <td className="px-6 py-4">{detalle.cantidad}</td>
                    <td className="px-6 py-4">{parseFloat(detalle.precio_unitario).toFixed(2)}</td>
                    <td className="px-6 py-4">{parseFloat(detalle.subtotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerFactura;
