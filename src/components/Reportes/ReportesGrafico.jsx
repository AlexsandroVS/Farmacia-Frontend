  import React, { useEffect, useState } from "react";
  import { Bar } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import Sidebar from "../Sidebar/Sidebar";
  import Navbar from "../shared/Navbar";
  import Breadcrumb from "../shared/Breadcrumb";

  // Registrar los componentes de Chart.js
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const ReportesGraficos = () => {
    const [gananciasMensuales, setGananciasMensuales] = useState([]);
    const [error, setError] = useState(null);
    const [year, setYear] = useState(2024); // Año seleccionable

    const obtenerGananciasPorMes = async (year, month) => {
      try {
        const response = await fetch(
          `https://alexsandrovs.pythonanywhere.com/api/v1/reporte-mensual/${year}/${month}/`
        );
        const data = await response.json();
        return parseFloat(data.total_facturado); // Extraemos solo el total facturado
      } catch (error) {
        console.error("Error al obtener las ganancias:", error);
        return 0;
      }
    };

    useEffect(() => {
      const cargarGanancias = async () => {
        const ganancias = [];
        for (let month = 1; month <= 12; month++) {
          const ganancia = await obtenerGananciasPorMes(year, month);
          ganancias.push(ganancia);
        }
        setGananciasMensuales(ganancias);
      };

      cargarGanancias();
    }, [year]);

    if (error) return <div>{error}</div>;
    if (gananciasMensuales.length === 0) return <div>Cargando gráficos...</div>;

    const labels = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const dataVentas = gananciasMensuales;

    const data = {
      labels: labels,
      datasets: [
        {
          label: `Ganancias Mensuales en ${year}`,
          data: dataVentas,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Ganancias del Año ${year}`,
          font: {
            size: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.raw} S/.`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return `${value} S/.`;
            },
            font: {
              size: 16,
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 16,
            },
          },
        },
      },
    };

    return (
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar className="h-full fixed" />
        <div className="flex flex-col flex-1 overflow-auto"> {/* Ajustar el espacio del sidebar */}
          {/* Navbar */}
          <Navbar className="fixed top-0 left-0 right-0 bg-white shadow z-10" />
          <main className="p-6 bg-gray-100 min-h-screen pt-10"> 
            {/* Breadcrumb */}
            <Breadcrumb
              paths={[
                { name: "Reportes", link: "/reportes" },
                { name: "Ganancias Mensuales", link: "/reportes/ganancias" },
              ]}
            />

            <div className="mb-4 flex items-center space-x-4">
              <label htmlFor="year" className="font-semibold text-lg">Selecciona el Año:</label>
              
              {/* Controles para seleccionar el año */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setYear(year - 1)}
                  className="p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-xl">-</span>
                </button>
                <select
                  id="year"
                  className="p-2 border bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                >
                  {Array.from({ length: 30 }, (_, index) => 2000 + index).map((yearOption) => (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setYear(year + 1)}
                  className="p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              Reporte de Ganancias Mensuales
            </h2>

            {/* Gráfico */}
            <div className="overflow-x-auto mb-8">
              <div className="w-full lg:w-2/3 xl:w-3/4 mx-auto">
                <Bar data={data} options={options} />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  export default ReportesGraficos;
