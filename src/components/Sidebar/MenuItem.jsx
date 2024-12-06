import React from "react";

const MenuItem = ({ icon, label, onClick, isActive, isSidebarVisible }) => (
  <div
    className={`flex items-center h-[56px] px-4 cursor-pointer rounded-md transition-all duration-200
      ${isActive ? "bg-[#1D242E] text-white shadow-inner" : "hover:bg-[#1D242E] hover:text-white"} 
      ${isSidebarVisible ? "space-x-4" : "justify-center"}`}
    onClick={onClick}
  >
    <div className="text-white">
      {icon && React.cloneElement(icon, { className: `${isSidebarVisible ? "w-6 h-6" : "w-8 h-8"}` })}
    </div>
    {isSidebarVisible && <span className="text-base font-medium text-white">{label}</span>}
  </div>
);

export default MenuItem;
