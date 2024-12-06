import React from "react";

function CrearPedido() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">¿Cómo Crear un Pedido?</h2>
      <p className="mt-2 text-lg">
        Para crear un nuevo pedido, sigue estos pasos:
      </p>
      <ol className="list-decimal pl-6">
        <li className="text-lg">Dirígete a la sección "Pedidos" en el menú lateral.</li>
        <li className="text-lg">Haz clic en el botón "Agregar Pedido" para iniciar un nuevo pedido.</li>
        <li className="text-lg">Completa la información del proveedor, productos y cantidades.</li>
        <li className="text-lg">Verifica los detalles y haz clic en "Confirmar" para registrar el pedido.</li>
      </ol>
      <p className="mt-2 text-lg">
        Los pedidos registrados estarán disponibles en la lista de pedidos, donde podrás editarlos o eliminarlos si es necesario.
      </p>
    </div>
  );
}

export default CrearPedido;
