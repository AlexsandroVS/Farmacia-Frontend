import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { motion } from "framer-motion";
import Breadcrumb from "../shared/Breadcrumb";
import Introduccion from "./Introduccion";
import Navegacion from "./Navegacion";
import CrearPedido from "./CrearPedido";
import GestionarProductos from "./GestionarProductos";
import SoporteContacto from "./SoporteContacto";

function SoporteTecnico() {
    return (
      <div className="flex h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
        <Sidebar />
        <div className="flex flex-col flex-grow overflow-hidden">
          <Navbar />
          <section className="flex-grow p-6 lg:px-10 overflow-y-auto">
            {/* Breadcrumb */}
            <Breadcrumb
              paths={[
                { name: "Inicio", link: "/", className: "text-2xl font-bold text-gray-600" },
                { name: "Soporte Técnico", className: "text-3xl text-black" },
              ]}
            />
  
            <motion.section
              className="bg-white shadow-lg rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-8 text-center">
                Guía de Soporte Técnico
              </h1>
  
              <div className="space-y-8 px-8 py-8 text-gray-700">
                <Introduccion />
                <Navegacion />
                <CrearPedido />
                <GestionarProductos />
                <SoporteContacto />
              </div>
            </motion.section>
          </section>
        </div>
      </div>
    );
  }
  
  export default SoporteTecnico;