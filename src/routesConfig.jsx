// Importaciones de Productos
import ListaProductos from "./components/Inventario/ListaProductos";
import CrearProducto from "./components/Producto/CrearProducto";
import EditarProducto from "./components/Producto/EditarProducto";
import VerDetalleProducto from "./components/Producto/VerDetalleProducto";

// Importaciones de Categorías
import CrearCategoria from "./components/Categorias/CrearCategoria";
import Categorias from "./components/Categorias/Categorias";
import EditarCategoria from "./components/Categorias/EditarCategoria";
import VerDetalleCategoria from "./components/Categorias/VerDetalleCategoria";
import ProductosPorCategoria from "./components/Categorias/ProductosPorCategoria";

// Importaciones de Contactos
import CrearEmpleado from "./components/Contactos/CrearEmpleado"
import ListaEmpleados from "./components/Contactos/ListaEmpleados";
import EmpleadoDetail from "./components/Contactos/EmpleadoDetail";
import EditarEmpleado from "./components/Contactos/EditarEmpleado";
import GestionContactos from "./components/Contactos/GestionContactos";

// Importaciones de Proveedores
import CrearProveedor from "./components/Proveedores/CrearProveedor";
import ListaProveedores from "./components/Proveedores/ListaProveedores";
import ProvedoresDetalles from "./components/Proveedores/ProvedoresDetalles";
import EditarProveedor from "./components/Proveedores/EditarProveedor";

// Importaciones de Pedidos
import ListarPedidos from "./components/Pedidos/ListarPedidos";
import CrearPedido from "./components/Pedidos/CrearPedido";
import EditarPedido from "./components/Pedidos/EditarPedido";
import VerDetallePedido from "./components/Pedidos/VerDetallePedido";

// Importaciones de Facturas
import ListaFacturas from "./components/Facturas/ListaFacturas";
import CrearFactura from "./components/Facturas/CrearFactura";
import VerFactura from "./components/Facturas/VerFactura";

// Importaciones de Inventario
import Inventario from "./components/Inventario/Inventario";
import Escasez from "./components/Inventario/Escasez";
import Agotado from "./components/Inventario/Agotado";

// Importaciones de Dashboard
import Dashboard from "./components/Dashboard/Dashboard";
import ProximoVence from "./components/Dashboard/ProximoVence";
import ProveedoresTop from "./components/Dashboard/ProveedoresTop";

// Importaciones de Medicamentos
import CrearMedicamento from "./components/Medicamentos/CrearMedicamento";
import ListaMedicamentos from "./components/Medicamentos/ListaMedicamentos";
import VerDetallesMedicamento from "./components/Medicamentos/VerDetallesMedicamento";

// Importaciones de Reportes
import ReporteGeneral from "./components/Reportes/ReporteGeneral";

import ReportesGraficos from "./components/Reportes/ReportesGrafico";
import ListaFacturasClientes from "./components/Facturas/ListaFacturasClientes";
import VerFacturaCliente from "./components/Facturas/VerFacturaCliente";
import ReporteGeneralCliente from "./components/ReporteCliente/ReporteGeneralCliente";
import ReportesGraficosClientes from "./components/ReporteCliente/ReportesGraficosClientes";
import ProductosMasVendidos from "./components/Dashboard/ProductosMasVendidos";
import ProductosRiesgoEscasez from "./components/Dashboard/ProductosRiesgoEscasez";
import SoporteTecnico from "./components/SoporteTecnico/SoporteTecnico";

// Importaciones de Graficos y eso

export const protectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/soporte", component: <SoporteTecnico /> },
  { path: "/facturas", component: <ListaFacturas /> },
  { path: "/productos-top", component: <ProductosMasVendidos /> },
  { path: "/productos-escazes", component: <ProductosRiesgoEscasez /> },
  { path: "/facturas/clientes", component: <ListaFacturasClientes /> },
  { path: "/reportes", component: <ReporteGeneral /> },
  { path: "/reportes/clientes", component: <ReporteGeneralCliente /> },
  { path: "/reportes/clientes/grafico", component: <ReportesGraficosClientes /> },
  { path: "/ListaEmpleados", component: <ListaEmpleados /> },
  { path: "/empleado/:id", component: <EmpleadoDetail /> },
  { path: "/editarEmpleado/:id", component: <EditarEmpleado /> },
  { path: "/ListaProveedores", component: <ListaProveedores /> },
  { path: "/DetallesProveedor/:id", component: <ProvedoresDetalles /> },
  { path: "/editarProveedor/:id", component: <EditarProveedor /> },
  { path: "/GestionContactos", component: <GestionContactos /> },
  { path: "/inventario", component: <Inventario /> },
  { path: "/pedidos", component: <ListarPedidos /> },
  { path: "/crearPedido", component: <CrearPedido /> }, 
  { path: "/editarPedido/:id", component: <EditarPedido /> }, 
  { path: "/verDetallePedido/:id", component: <VerDetallePedido /> }, 
  { path: "/ListaMedicinas", component: <ListaProductos /> },
  { path: "/verDetalleProducto/:id", component: <VerDetalleProducto /> },
  { path: "/Categorias", component: <Categorias /> },
  { path: "/CrearMedicamento", component: <CrearMedicamento /> },
  { path: "/editar/:id", component: <EditarProducto /> },
  { path: "/CrearCategoria", component: <CrearCategoria /> },
  { path: "/CrearProducto", component: <CrearProducto /> },
  { path: "/Abastecer", component: <Escasez /> },
  { path: "/Agotado", component: <Agotado /> },
  { path: "/VerDetallesCategorias/:id", component: <VerDetalleCategoria /> },
  { path: "/editarCategoria/:id", component: <EditarCategoria /> },
  { path: "/ListaMedicamentos", component: <ListaMedicamentos /> },
  { path: "/CrearProveedor", component: <CrearProveedor /> },
  { path: "/productosPorCategoria/:id", component: <ProductosPorCategoria /> },
  { path: "/VerDetallesMedicamentos/:id", component: <VerDetallesMedicamento /> },
  { path: "/crearEmpleado", component: <CrearEmpleado /> },
  { path: "/ProximosAVencer", component: <ProximoVence /> },
  { path: "/ProveedoresTop", component: <ProveedoresTop /> },
  { path: "/CrearFactura", component: <CrearFactura /> },
  { path: "/verfactura/:id", component: <VerFactura /> },
  { path: "/facturas/clientes/verfactura/:id", component: <VerFacturaCliente /> },
  { path: "/reportes/graficos", component: <ReportesGraficos />}
];
