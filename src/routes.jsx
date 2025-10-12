import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/vista-admin/Dashboard";
import Productos from "./pages/vista-admin/Productos";
import Usuarios from "./pages/vista-admin/Usuarios";
import Catalogo from "./pages/Catalogo";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
    );
}
