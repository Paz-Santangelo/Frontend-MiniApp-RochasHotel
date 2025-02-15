import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import RoomsPage from "../pages/RoomsPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/contacto" element={<ContactUs />} />
      <Route path="/registrate" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/detalles/:roomId" element={<RoomDetailsPage />} />
      <Route path="/habitaciones" element={<RoomsPage />} />
    </Routes>
  );
};

export default PublicRoutes;
