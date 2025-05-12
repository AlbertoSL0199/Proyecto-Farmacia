import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/home/Banner";
import { Sheet } from "../components/shared/Sheet";
import { Newsletter } from "../components/home/Newsletter";
import { Shipments } from "../components/home/Shipments";
import { useGlobalStore } from "../store/global.store";
import { NavBarMobile } from "../components/shared/NavBarMobile";

//se expresa en todas las paginas
//outlet renderiza
export const RootLayout = () => {
  /* saber la ruta por consola */
  const { pathname } = useLocation();
  //
  const isSheetOpen = useGlobalStore((state) => state.isSheetOpen);
  const activeNavMobile = useGlobalStore((state) => state.activeNavMobile);
  return (
    <div className="h-screen flex flex-col font-prueba">
      <Shipments />
      <Navbar />

      {pathname === "/" && <Banner />}
      <main className="containe flex-1">
        <Outlet />
      </main>

      {pathname === "/" && <Newsletter />}

      {isSheetOpen && <Sheet />}

      {/* renderizar la barra de navegacion en formato cell */}
      {activeNavMobile && <NavBarMobile/>}
      
      <Footer />
    </div>
  );
};
