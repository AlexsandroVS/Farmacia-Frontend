import React from 'react';

const TablaPedidos = ({ pedidos, eliminarPedido }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Pedidos por Crear</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-slate-200  text-gray-600">
            <tr>
              <th className="py-3 px-4 text-lg font-semibold">Producto</th>
              <th className="py-3 px-4 text-lg font-semibold">Cantidad</th>
              <th className="py-3 px-4 text-lg font-semibold">Precio Compra</th>
              <th className="py-3 px-4 text-lg font-semibold">Total</th>
              <th className="py-3 px-4 text-lg font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{pedido.productoNombre}</td>
                  <td className="py-2 px-4">{pedido.cantidad}</td>
                  <td className="py-2 px-4">{pedido.precioCompra}</td>
                  <td className="py-2 px-4">{pedido.totalPedido}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => eliminarPedido(index)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-lg  text-gray-500">
                  No hay pedidos agregados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPedidos;
