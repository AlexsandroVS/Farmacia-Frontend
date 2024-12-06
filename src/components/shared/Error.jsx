import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "@material-tailwind/react";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = ({ message = "Ocurrió un error inesperado.", backLink = "/" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-100 to-red-200 items-center justify-center">
      <Card className="p-6 max-w-md bg-white shadow-2xl rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-6xl" />
        </div>
        <Typography variant="h4" color="red" className="mb-4 font-bold">
          Error
        </Typography>
        <Typography className="text-gray-600 mb-6">{message}</Typography>
        <Button
          onClick={() => navigate(backLink)}
          color="red"
          className="text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Regresar
        </Button>
      </Card>
    </div>
  );
};

export default Error;
