import { motion } from "framer-motion";

const TablaProveedores = ({ proveedores }) => (
  <section className="bg-white shadow-md rounded-xl overflow-hidden mb-6 p-4">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Proveedores</h3>
    <table className="min-w-full table-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-gray-700 font-semibold">Nombre</th>
          <th className="px-6 py-4 text-left text-gray-700 font-semibold">Total Pedidos</th>
          <th className="px-6 py-4 text-left text-gray-700 font-semibold">Monto Total (S/.)</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.map((proveedor, index) => (
          <motion.tr
            key={index}
            className="bg-white border-b transition-all hover:bg-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <td className="px-6 py-4 text-gray-800">{proveedor.nombre}</td>
            <td className="px-6 py-4 text-gray-800">{proveedor.total_pedidos}</td>
            <td className="px-6 py-4 text-gray-800">
              {parseFloat(proveedor.monto_total).toFixed(2)}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default TablaProveedores;
