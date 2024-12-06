import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../shared/Breadcrumb";

const NoProducts = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Sidebar con posición fija */}
      <div className="fixed w-64 h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow ml-64 overflow-hidden">
        {/* El contenedor del contenido tiene un margen a la izquierda para no sobreponerse con el Sidebar */}
        <Navbar />
        <section className="flex-grow p-6 lg:px-10 overflow-y-auto">
          <Breadcrumb
            paths={[
              {
                name: "Inventario",
                link: "/inventario",
                className: "text-2xl font-bold text-gray-600",
              },
              { name: "No hay productos", className: "text-3xl text-black" },
            ]}
          />
          <div className="flex items-center justify-center p-6">
            <Card className="max-w-md p-8 shadow-2xl bg-white rounded-xl text-center transform transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <FaExclamationTriangle className="text-yellow-500 text-7xl animate-bounce" />
              </div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-4 font-bold text-gray-800"
              >
                No hay productos disponibles
              </Typography>
              <Typography className="text-gray-600 mb-6 leading-relaxed">
                Actualmente no tenemos productos en esta categoría. Vuelve a
                intentarlo más tarde o explora nuestras otras categorías.
              </Typography>
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => navigate("/categorias")}
                  color="blue"
                  className="text-white font-semibold flex items-center justify-center px-6 py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
                >
                  Ver Otras Categorías
                  <MdOutlineCategory className="ml-2 text-2xl" />
                </Button>
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outlined"
                  color="gray"
                  className="text-gray-700 border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-lg transform hover:scale-105 transition-all"
                >
                  Volver a la Página Principal
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NoProducts;
