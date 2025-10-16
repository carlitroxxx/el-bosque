import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/vista-admin/Dashboard";
import Productos from "./pages/vista-admin/Productos";
import Usuarios from "./pages/vista-admin/Usuarios";
import Catalogo from "./pages/Catalogo";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import Detalle1 from "./pages/Detalle1"
import Detalle2 from "./pages/Detalle2"
import Contacto from "./pages/Contacto";
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Carrito from "./pages/Carrito"

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/detalle1" element={<Detalle1 />} />
            <Route path="/detalle2" element={<Detalle2 />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<Carrito />} />
        </Routes>
    );
}
