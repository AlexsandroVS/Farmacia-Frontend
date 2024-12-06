import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import UserProfile from "./UserProfile";
import MenuItem from "./MenuItem";
import Footer from "./Footer";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard, MdGroup, MdInventory, MdOutlineSettings, MdOutlineShowChart, MdOutlineHelpCenter } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarVisible(false); 
      } else {
        setSidebarVisible(true); 
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/current-managament/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserName(response.data.nombre || response.data.username);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleSidebar = () => setSidebarVisible((prevState) => !prevState);

  const menuItems = [
    { icon: <MdOutlineSpaceDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <MdInventory />, label: "Inventario", path: "/inventario" },
    { icon: <RiBillLine />, label: "Facturas", path:"/facturas"},
    { icon: <MdOutlineShowChart />, label: "Reportes", path: "/reportes" },
    { icon: <MdGroup />, label: "Gestión de Contactos", path: "/GestionContactos" },
    { icon: <MdOutlineSettings />, label: "Configuración" },
    { icon: <MdOutlineHelpCenter />, label: "Soporte Técnico", path: "/soporte"},
  ];

  return (
    <div className="flex">
      <div
        className={`sidebar ${isSidebarVisible ? "w-72" : "w-20"} bg-[#283342] text-white flex flex-col h-screen transition-all duration-300`}
      >
        {/* Header / Logo */}
        <nav className="flex items-center bg-[#181e27] h-20 shadow-lg px-4">
          {isSidebarVisible && (
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full border-2 border-yellow-300"
            />
          )}
          <h1
            className={`text-lg font-bold ml-4 transition-opacity ${
              isSidebarVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            PharmaVida
          </h1>
        </nav>

        {/* User Profile */}
        <UserProfile userName={userName} isSidebarVisible={isSidebarVisible} />

        {/* Menu Items */}
        <div className="flex-grow overflow-auto space-y-1 mt-4">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.path ? () => navigate(item.path) : null}
              isActive={location.pathname === item.path}
              isSidebarVisible={isSidebarVisible}
            />
          ))}
        </div>

        {/* Footer */}
        <Footer isSidebarVisible={isSidebarVisible} />
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="bg-[#181e27] ml-5 mt-52 p-5 rounded-r-md shadow-lg absolute -left-5 top-1/2 transform -translate-y-1/2 hover:bg-[#283342]"
      >
        <FaAngleLeft
          className={`text-white transition-transform duration-300 ${
            isSidebarVisible ? "" : "rotate-180"
          }`}
        />
      </button>
    </div>
  );
};

export default Sidebar;
