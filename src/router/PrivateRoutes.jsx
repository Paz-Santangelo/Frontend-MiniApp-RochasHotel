import { Route, Routes } from "react-router-dom";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import RoomsPage from "../pages/RoomsPage";
import { AdminRoute, ProtectedRoute } from "../services/guard";
import EditRoomPage from "../pages/EditRoomPage";
import FindBookingPage from "../pages/FindBookingPage";
import Bookings from "../pages/Bookings";
import MyProfile from "../pages/MyProfile";
import AllUsers from "../components/AllUsers";
import CreateRoom from "../pages/CreateRoom";
import EditMyProfile from "../pages/EditMyProfile";
import DetailBooking from "../pages/DetailBooking";
import UserHomeComponent from "../pages/UserHomeComponent";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/detalles/:roomId" element={<RoomDetailsPage />} />
      <Route path="/habitaciones" element={<RoomsPage />} />

      {/* Rutas Protegidas */}
      <Route
        path="/perfil"
        element={<ProtectedRoute element={<MyProfile />} />}
      />
      <Route
        path="/perfil/editar"
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
      <Route
        path="/"
        element={<ProtectedRoute element={<UserHomeComponent />} />}
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

export default PrivateRoutes;
