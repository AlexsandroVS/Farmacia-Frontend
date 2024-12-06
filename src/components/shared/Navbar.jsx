import React, { useEffect, useState } from "react";
import { FaSearch, FaSun } from "react-icons/fa";
import { useSearch } from "./SearchContext";

function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-[#1D242E] to-slate-600 p-4 h-20 shadow-lg transition-all duration-300 ease-in-out text-white">
      <div className="flex items-center relative w-full sm:w-1/2 max-w-[400px] ml-4">
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Busca aquí..."
          className="w-full h-12 p-3 pl-12 rounded-full bg-white text-gray-700 border-none shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <div className="flex items-center space-x-6 mr-4">
        <FaSun className="text-yellow-300 w-8 h-8 transition-transform duration-200 hover:scale-110" />
        <span className="text-md sm:text-lg font-semibold">¡Buen día!</span>
        <div className="text-sm sm:text-lg font-light">{currentDateTime}</div>
      </div>
    </div>
  );
}

export default Navbar;
