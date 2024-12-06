// CardDetails.js
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const CardDetails = ({ title, total, group, titleClass = "text-lg font-medium", totalClass = "text-2xl font-semibold text-blue-700" }) => {
  return (
    <div className="flex flex-col w-[400px] h-[150px] p-4 bg-gradient-to-br from-gray-100 to-gray-200 mt-4 mb-4 mx-auto rounded-lg shadow-lg  transform transition-all hover:scale-105">
      <div className="flex justify-between items-center w-full mb-2">
        <p className={`${titleClass} text-black font-semibold text-xl`}>{title}</p>
        <div className="flex items-center text-gray-700">
          <p className="text-sm mr-1"></p>
          <RiArrowDropDownLine className="h-6 w-6" />
        </div>
      </div>
      <hr className="border-t-2 border-gray-400 w-full mt-2" />
      <section className="flex justify-between items-center w-full mt-4">
        <div className="flex flex-col items-start">
          <h1 className={`${totalClass} mb-1 `}>{total}</h1>
          <p className="text-gray-950 text-lg">{group}</p>
        </div>
      </section>
    </div>
  );
};

export default CardDetails;
