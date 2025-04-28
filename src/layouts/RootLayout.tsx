import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/home/Banner";
import { Newsletter } from "../components/home/Newsletter";
import { Shipments } from "../components/home/Shipments";

//se expresa en todas las paginas
//outlet renderiza
export const RootLayout = () => {
  /* saber la ruta por consola */
  const { pathname } = useLocation();

  return (
    <div className="h-screen flex flex-col font-prueba">
      <Shipments />

      <Navbar />

      {pathname === "/" && <Banner />}
      <main className="containe my-8 flex-1">
        <Outlet />
      </main>

      {pathname === "/" && <Newsletter />}
      <Footer />
    </div>
  );
};
