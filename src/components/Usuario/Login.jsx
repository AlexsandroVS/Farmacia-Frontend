import React, { useState, useEffect } from "react";
import backg from "../../assets/backg.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance"; // Asegúrate de que la ruta sea correcta
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from '../../AuthContext';

const Login = () => {
  
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { login, auth } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);  // Establece el estado de autenticación
      navigate("/dashboard");  // Redirige automáticamente al Dashboard
    }
  }, [login, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await authenticateUser();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const authenticateUser = async () => {
    try {
      // Solicita el token con las credenciales del usuario
      const response = await axiosInstance.post("/token/", {
        username: form.username,
        password: form.password,
      });
  
      const { access } = response.data;
  
      // Guarda el token temporalmente
      localStorage.setItem("token", access);
  
      // Verifica si el usuario es superusuario
      const superuserResponse = await axiosInstance.get("/auth/check-superuser/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (!superuserResponse.data.is_superuser) {
        // Si no es superusuario, muestra un error y elimina el token
        setError("Acceso denegado. Solo los empleados pueden acceder.");
        localStorage.removeItem("token");
        return;
      }
  
      // Almacena el estado de autenticación y redirige al dashboard
      login(access);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Usuario o contraseña incorrectos";
      setError(errorMessage);
      console.error("Error en la autenticación:", error.response ? error.response.data : error.message);
    }
  };
  
  
  

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backg})` }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full"></div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="usuario">
              Usuario
            </label>
            <div className="flex items-center border rounded-md border-gray-300">
              <span className="flex items-center pl-2 text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                name="username"
                id="usuario"
                value={form.username}
                onChange={handleChange}
                className="flex-1 p-2 border-none focus:ring focus:ring-blue-300 rounded-md"
                placeholder="Introduzca su Usuario"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contraseña">
              Contraseña
            </label>
            <div className="flex items-center border rounded-md border-gray-300">
              <span className="flex items-center pl-2 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                id="contraseña"
                value={form.password}
                onChange={handleChange}
                className="flex-1 p-2 border-none focus:ring focus:ring-blue-300 rounded-md"
                placeholder="Introduce tu contraseña"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
