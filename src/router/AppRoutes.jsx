import { Route, Routes } from "react-router-dom";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import RoomsPage from "../pages/RoomsPage";
import { AdminRoute, ProtectedRoute } from "../services/guard";
import DashboardPage from "../pages/DashboardPage";
import EditRoomPage from "../pages/EditRoomPage";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/contacto" element={<ContactUs />} />
      <Route path="/registrate" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/detalles/:roomId" element={<RoomDetailsPage />} />
      <Route path="/habitaciones" element={<RoomsPage />} />
      {/* Rutas Protegidas */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<DashboardPage />} />}
      />
      {/* Rutas de Administrador */}
      <Route
        path="/admin/editar/:roomId"
        element={<AdminRoute element={<EditRoomPage />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
