import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const UserProfile = ({ userName, isSidebarVisible }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };
  

  return (
    <div className={`flex items-center h-24 p-4 relative bg-[#1D242E] shadow-inner ${isSidebarVisible ? "justify-start" : "justify-center"}`}>
      {/* User Icon */}
      <CiUser className={`h-10 w-10 text-gray-300 ${isSidebarVisible ? "ml-2" : ""}`} />
      
      {/* User Details */}
      {isSidebarVisible && (
        <div className="ml-4">
          <h2 className="font-bold text-base text-white">{userName || "Usuario"}</h2>
          <h3 className="text-yellow-300 text-sm">Administrador</h3>
        </div>
      )}
      <button
        className={`ml-auto text-gray-400 hover:bg-gray-800 p-2 rounded-full ${!isSidebarVisible ? "mx-auto" : ""}`}
        onClick={toggleDropdown}
      >
        <BsThreeDotsVertical className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <div className={`absolute ${isSidebarVisible ? "top-20 right-4" : "top-20 right-0"} bg-white rounded-lg shadow-lg z-10 ${isSidebarVisible ? "w-44" : "w-20"}`}>
          <ul className={`py-2 text-sm text-gray-700 flex flex-col ${isSidebarVisible ? "items-start" : "items-center"}`}>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full">
                <FaUserCircle className="text-lg" />
                {isSidebarVisible && <span>Mi Perfil</span>}
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full">
                <FaSignOutAlt className="text-lg" />
                {isSidebarVisible && <span>Cerrar Sesión</span>}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
