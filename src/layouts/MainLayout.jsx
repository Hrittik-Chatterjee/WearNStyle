import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default MainLayout;
