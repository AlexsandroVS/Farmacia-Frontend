import React from "react";

function GestionarProductos() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">¿Cómo Gestionar Productos?</h2>
      <p className="mt-2 text-lg">
        En la sección "Inventario", puedes gestionar todos los productos de tu tienda. A continuación te explicamos
        cómo agregar, editar o eliminar productos:
      </p>
      <ol className="list-decimal pl-6">
        <li className="text-lg">Haz clic en la opción "Inventario" en el menú lateral.</li>
        <li className="text-lg">Para agregar un nuevo producto, haz clic en el botón "Agregar Producto" y llena los detalles como nombre, precio, y stock.</li>
        <li className="text-lg">Para editar un producto existente, haz clic en el botón de editar junto al producto que deseas modificar.</li>
        <li className="text-lg">Para eliminar un producto, selecciona el producto y haz clic en el botón "Eliminar".</li>
      </ol>
      <p className="mt-2 text-lg">
        Asegúrate de que toda la información esté correctamente ingresada para evitar problemas con el inventario y las ventas.
      </p>
    </div>
  );
}

export default GestionarProductos;
