import React from "react";

function Navegacion() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Navegación en el Sistema</h2>
      <p className="mt-2 text-lg">
        El sistema cuenta con un menú de navegación lateral (Sidebar), que te permite acceder rápidamente
        a las diferentes secciones del sistema. Las secciones más comunes incluyen:
      </p>
      <ul className="list-disc pl-6">
        <li className="text-lg">Inventario: Consulta y gestiona los productos disponibles en la tienda.</li>
        <li className="text-lg">Pedidos: Crea, visualiza y edita pedidos de los clientes.</li>
        <li className="text-lg">Clientes: Administra los datos de los clientes y sus compras.</li>
      </ul>
      <p className="mt-2 text-lg">
        Además, en la parte superior de la pantalla encontrarás una barra de búsqueda y un icono de perfil que
        te permitirá gestionar tu cuenta.
      </p>
    </div>
  );
}

export default Navegacion;
