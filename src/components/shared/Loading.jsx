// Loading.js
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg text-gray-600">Cargando productos...</span>
      </div>
    </div>
  );
}

export default Loading;
