import { Route, Routes } from "react-router-dom";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import RoomsPage from "../pages/RoomsPage";
import { AdminRoute, ProtectedRoute } from "../services/guard";
import EditRoomPage from "../pages/EditRoomPage";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import FindBookingPage from "../pages/FindBookingPage";
import Bookings from "../pages/Bookings";
import MyProfile from "../pages/MyProfile";
import AllUsers from "../components/AllUsers";
import CreateRoom from "../pages/CreateRoom";
import EditMyProfile from "../pages/EditMyProfile";
import DetailBooking from "../pages/DetailBooking";

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
        path="/profile"
        element={<ProtectedRoute element={<MyProfile />} />}
      />
      <Route
        path="/profile/editar"
        element={<ProtectedRoute element={<EditMyProfile />} />}
      />
      <Route
        path="/reserva/buscar"
        element={<ProtectedRoute element={<FindBookingPage />} />}
      />
      <Route
        path="/reservas"
        element={<ProtectedRoute element={<Bookings />} />}
      />
      
      {/* Rutas de Administrador */}
      <Route
        path="/admin/editar/:roomId"
        element={<AdminRoute element={<EditRoomPage />} />}
      />
      <Route
        path="/habitaciones/crear"
        element={<AdminRoute element={<CreateRoom />} />}
      />
      <Route
        path="/admin/reservas/:confirmationCode"
        element={<AdminRoute element={<DetailBooking />} />}
      />
      <Route
        path="/usuarios"
        element={<AdminRoute element={<AllUsers />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
