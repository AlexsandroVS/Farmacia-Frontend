import React from "react";

function SoporteContacto() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Soporte Técnico</h2>
      <p className="mt-2 text-lg">
        Si encuentras algún problema técnico con el sistema o necesitas asistencia adicional, por favor contáctanos
        a través de cualquiera de los siguientes canales:
      </p>
      <ul className="list-disc pl-6">
        <li className="text-lg">Correo electrónico:{" "}
          <a href="mailto:alexsandro.valeriano1@gmail.com" className="text-blue-500 hover:underline">
              alexsandro.valeriano1@gmail.com
          </a>
        </li>
        <li className="text-lg">Teléfono de soporte: +51 982 946 083</li>
      </ul>
      <p className="mt-2 text-lg">
        Nuestro equipo estará disponible para ayudarte con cualquier duda o inconveniente relacionado con el sistema.
      </p>
    </div>
  );
}

export default SoporteContacto;
