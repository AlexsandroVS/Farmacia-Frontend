import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../shared/Loading";
import { FaAngleRight, FaAnglesRight, FaTrash } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";
import { motion } from "framer-motion"; 
import { useSearch } from "../shared/SearchContext"; 

const Categorias = () => {
  const { searchQuery, setSearchQuery } = useSearch(); 
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false); 
  const [categoryToDelete, setCategoryToDelete] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("https://alexsandrovs.pythonanywhere.com/api/v1/categorias/");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleSort = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }, []);

  // Filtrar y ordenar categorías
  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCategorias = [...filteredCategorias].sort((a, b) => {
    const aValue = a.nombre.toLowerCase();
    const bValue = b.nombre.toLowerCase();
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleDelete = async (categoriaId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/categorias/${categoriaId}`);
      setCategorias(categorias.filter((categoria) => categoria.id !== categoriaId)); // Remove category from list
      setShowModal(false); // Close modal after deletion
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const handleShowModal = (categoria) => {
    setCategoryToDelete(categoria);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryToDelete(null);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        {/* Pasar setSearchQuery al Navbar */}
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <motion.section
          className="flex-grow p-6 bg-white shadow rounded-lg mx-4 my-2 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <motion.button
                onClick={() => navigate("/inventario")}
                className="text-gray-600 text-2xl flex items-center font-bold transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="mb-2">Inventario</h1>
                <FaAngleRight className="text-black mx-3 p-1" />
                <h1 className="text-3xl mb-3 text-gray-800">
                  Categorías ({sortedCategorias.length})
                </h1>
              </motion.button>
            </div>

            <motion.button
              onClick={() => navigate("/CrearCategoria")}
              className="bg-red-600 hover:bg-red-700 text-xl w-60 h-12 text-white font-semibold py-2 px-5 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              Agregar Categoría
            </motion.button>
          </div>

          <section className="p-4 bg-gray-50 shadow-md rounded-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xl font-semibold text-gray-950">
                    <p className="text-2xl">
                      Nombre de Categoría
                      <button onClick={handleSort} className="ml-1">
                        <RxCaretSort className="inline-block text-3xl font-bold text-black transform transition-transform hover:rotate-180" />
                      </button>
                    </p>
                  </th>
                  <th className="px-4 py-3 text-right text-2xl font-semibold text-gray-950">
                    <p className="mr-14">Acción</p>
                  </th>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Divider />
                  </td>
                </tr>
              </thead>
              <tbody>
                {sortedCategorias.map((categoria) => (
                  <motion.tr
                    key={categoria.id}
                    className="bg-white border-b border-gray-300 hover:bg-gray-200 transition-all duration-200"
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-4 py-3 text-gray-700 text-lg">{categoria.nombre}</td>
                    <td className="px-4 py-3 text-right flex justify-end items-center">
                      <motion.button
                        onClick={() =>
                          navigate(`/productosPorCategoria/${categoria.id}`)
                        }
                        className="ml-auto mr-10 text-gray-950 hover:text-red-600 text-xl font-semibold flex items-center justify-end transition-all duration-200 transform hover:scale-105"
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                      >
                        Ver Productos <FaAnglesRight className="ml-2" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleShowModal(categoria)}
                        className="ml-3 text-gray-950 hover:text-red-600 text-xl font-semibold flex items-center justify-end transition-all duration-200 transform hover:scale-105"
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTrash />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </section>
        </motion.section>
      </div>
    </div>
  );
};

const Divider = () => <div className="h-1 w-full bg-red-200 my-2"></div>;

export default Categorias;
