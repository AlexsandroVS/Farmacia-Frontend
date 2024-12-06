import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Footer = ({ isSidebarVisible }) => (
  <div className="flex-grow flex items-center justify-center bg-black h-4 p-4">
    {isSidebarVisible && (
      <div className="flex items-center">
        <h1 className="text-lg text-white">Desarrollado por Darkness</h1>
        <FaRegCopyright className="text-white ml-2 text-lg hover:text-yellow-500 transition-colors" />
      </div>
    )}
  </div>
);

export default Footer;
