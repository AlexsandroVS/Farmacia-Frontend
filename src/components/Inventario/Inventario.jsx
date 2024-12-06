import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { FaPlus } from "react-icons/fa";
import { LiaBriefcaseMedicalSolid } from "react-icons/lia";
import { MdOutlineCategory, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineMedication } from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import Card from "./Card";
import Loading from "../shared/Loading";

function Inventario() {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalMedicamentos, setTotalMedicamentos] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [productosEscasos, setProductosEscasos] = useState(0);
  const [valorTotalInventario, setValorTotalInventario] = useState(0);
  const [productosAgotados, setProductosAgotados] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPedidos, setTotalPedidos] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch(
          "https://alexsandrovs.pythonanywhere.com/api/v1/productos/"
        );
        const categoriesResponse = await fetch(
          "https://alexsandrovs.pythonanywhere.com/api/v1/categorias/"
        );
        const pedidosResponse = await fetch(
          "https://alexsandrovs.pythonanywhere.com/api/v1/pedidos/"
        );
        const medicamentosResponse = await fetch(
          "https://alexsandrovs.pythonanywhere.com/api/v1/medicamentos/"
        );
  
  
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        const pedidosData = await pedidosResponse.json();
        const medicamentosData = await medicamentosResponse.json();
  
        setTotalProducts(productsData.length);
        setTotalCategories(categoriesData.length);
        setTotalPedidos(pedidosData.length);
        setTotalMedicamentos(medicamentosData.length);
  
        const productosEnEscasez = productsData.filter(
          (producto) => producto.stock < 5
        ).length;
        setProductosEscasos(productosEnEscasez);
  
        const valorTotal = productsData.reduce((total, producto) => {
          return total + producto.precio * producto.stock;
        }, 0);
        setValorTotalInventario(valorTotal);
  
        const productosSinStock = productsData.filter(
          (producto) => producto.stock === 0
        ).length;
        setProductosAgotados(productosSinStock);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <Loading />;
  }

  const cardsData = [
    {
      title: "Productos para la Venta",
      subtitle: "Lista de productos disponibles",
      link: "/ListaMedicinas",
      icon: <AiFillProduct className="h-12 w-12 text-blue-500 mb-2" />,
      value: totalProducts,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      textColor: "text-gray-700",
      bg2color: "bg-blue-500",
      gradientColor: "bg-gradient-to-r from-blue-400 to-blue-500"
    },
    {
      title: "Medicamentos",
      subtitle: "Lista de medicamentos disponibles",
      link: "/ListaMedicamentos",
      icon: <MdOutlineMedication className="h-12 w-12 text-green-500 mb-2" />,
      value: totalMedicamentos,
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      textColor: "text-gray-700",
      bg2color: "bg-green-500",
      gradientColor: "bg-gradient-to-r from-green-300 to-green-400"
    },
    {
      title: "Categorías Disponibles",
      subtitle: "Lista de categorías de productos",
      link: "/Categorias",
      icon: <MdOutlineCategory className="h-12 w-12 text-green-500 mb-2" />,
      value: totalCategories,
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      textColor: "text-gray-700",
      bg2color: "bg-green-500",
      gradientColor: "bg-gradient-to-r from-green-400 to-green-500"
    },
    {
      title: "Productos en Escasez",
      subtitle: "Productos con bajo nivel de stock",
      link: "/Abastecer",
      icon: <IoWarningOutline className="h-12 w-12 text-red-500 mb-2" />,
      value: productosEscasos,
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      textColor: "text-gray-700",
      bg2color: "bg-red-500",
      gradientColor: "bg-gradient-to-r from-red-400 to-red-500"
    },
    {
      title: "Valor Total del Inventario",
      subtitle: "Valor estimado de todos los productos",
      link: "#",
      icon: <FaMoneyBillWave className="h-12 w-12 text-yellow-500 mb-2" />,
      value: `S/.${valorTotalInventario.toFixed(2)}`,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      textColor: "text-gray-700",
      bg2color: "bg-yellow-500",
      gradientColor: "bg-gradient-to-r from-yellow-400 to-yellow-500"
    },
    {
      title: "Productos Agotados",
      subtitle: "Productos sin stock disponible",
      link: "/Agotado",
      icon: (
        <MdOutlineRemoveShoppingCart className="h-12 w-12 text-red-500 mb-2" />
      ),
      value: productosAgotados,
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      textColor: "text-gray-700",
      bg2color: "bg-red-500",
      gradientColor: "bg-gradient-to-r from-red-400 to-red-500"
    },
    {
      title: "Pedidos",
      subtitle: "Lista de pedidos de proveedores",
      link: "/pedidos",
      icon: <FaPlus className="h-12 w-12 text-purple-500 mb-2" />,
      value: totalPedidos, // Usar el estado totalPedidos
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      textColor: "text-gray-700",
      bg2color: "bg-purple-500",
      gradientColor: "bg-gradient-to-r from-purple-400 to-purple-500"
    }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar className="fixed w-64" /> 
      <div className="flex flex-col h-full flex-grow  bg-gray-50">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <section className="flex-grow p-4 lg:px-8 overflow-auto ml-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">Inventario</h2>
              <p className="text-gray-500 text-sm">
                Lista de productos disponibles para la venta
              </p>
            </div>
          </div>
  
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                link={card.link}
                icon={card.icon}
                value={card.value}
                bgColor={card.bgColor}
                borderColor={card.borderColor}
                textColor={card.textColor}
                bg2color={card.bg2color}
                gradientColor={card.gradientColor}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
  
}

export default Inventario;
