import { Route, Routes } from "react-router-dom";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import RoomsPage from "../pages/RoomsPage";
import { AdminRoute, ProtectedRoute } from "../services/guard";
import EditRoomPage from "../pages/EditRoomPage";
import FindBookingPage from "../pages/FindBookingPage";
import AllUsersPage from "../pages/AllUsersPage";
import MyProfilePage from "../pages/MyProfilePage";
import EditMyProfilePage from "../pages/EditMyProfilePage";
import BookingsPage from "../pages/BookingsPage";
import UserHomeComponentPage from "../pages/UserHomeComponentPage";
import CreateRoomPage from "../pages/CreateRoomPage";
import DetailBookingPage from "../pages/DetailBookingPage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/detalles/:roomId" element={<RoomDetailsPage />} />
      <Route path="/habitaciones" element={<RoomsPage />} />

      {/* Rutas Protegidas */}
      <Route
        path="/perfil"
        element={<ProtectedRoute element={<MyProfilePage />} />}
      />
      <Route
        path="/perfil/editar"
        element={<ProtectedRoute element={<EditMyProfilePage />} />}
      />
      <Route
        path="/reserva/buscar"
        element={<ProtectedRoute element={<FindBookingPage />} />}
      />
      <Route
        path="/reservas"
        element={<ProtectedRoute element={<BookingsPage />} />}
      />
      <Route
        path="/"
        element={<ProtectedRoute element={<UserHomeComponentPage />} />}
      />
      
      {/* Rutas de Administrador */}
      <Route
        path="/admin/editar/:roomId"
        element={<AdminRoute element={<EditRoomPage />} />}
      />
      <Route
        path="/admin/habitaciones/crear"
        element={<AdminRoute element={<CreateRoomPage />} />}
      />
      <Route
        path="/admin/reservas/:confirmationCode"
        element={<AdminRoute element={<DetailBookingPage />} />}
      />
      <Route
        path="/admin/usuarios"
        element={<AdminRoute element={<AllUsersPage />} />}
      />
    </Routes>
  );
};

export default PrivateRoutes;
