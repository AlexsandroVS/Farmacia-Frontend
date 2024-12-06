// Card.js
import React from "react";
import { Link } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";

const Card = ({
  title,
  subtitle,
  link,
  icon,
  value,
  bgColor,
  borderColor,
  textColor,
  gradientColor, 
}) => {
  return (
    <Link
      to={link}
      className={`border-4 ${borderColor} ${bgColor} mt-2 w-72 h-80 flex flex-col rounded-lg cursor-pointer shadow-lg hover:shadow-2xl transform transition-all duration-200 hover:scale-105`}
    >
      <div className="flex items-center justify-center mt-6">
        {icon}
      </div>
      <h1 className={`font-bold text-4xl ${textColor} text-center mt-4`}>
        {value}
      </h1>
      <p className="text-center text-gray-600 text-lg mt-2">{subtitle}</p>
      <div className="flex-grow"></div>
      <div
        className={`border-t-4 ${borderColor} h-14 flex items-center justify-center ${gradientColor} rounded-b-lg`}
      >
        <p className="text-white font-bold text-lg">Ver Completo</p>
        <FaAnglesRight className="text-white ml-2 text-xl" />
      </div>
    </Link>
  );
};

export default Card;
