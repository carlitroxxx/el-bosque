import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Index />} />
        </Routes>
    );
}
