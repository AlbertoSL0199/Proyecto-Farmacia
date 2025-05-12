import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";
import { Link, NavLink } from "react-router-dom";
import { navbarmobilinks } from "../../constants/links";
import { useClicks } from "../../actions/useClicks";

export const NavBarMobile = () => {
  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile
  );
  const {
    ref: menuRef,
    handleClose,
    closing, 
  } = useClicks({
    onClose: () => setActiveNavMobile(false),
    delay: 300,
  });

  return (
    <div
      ref={menuRef}
      className={`fixed bg-white text-black h-screen w-3/4 md:w-[400px]  shadow-lg animate-slide-in-left z-20 flex justify-center py-20
     ${closing ? "animate-slide-out-left" : "animate-slide-in-left"}`}
    >
      {/* boton para cerrar la barra de navegacion */}
      <button className="absolute top-5 right-5 " onClick={handleClose}>
        {/*icono de cerrar en la barra de navegacion */}
        <IoMdClose size={30} className="text-black" />
      </button>

      {/*contenido de la barra de navegacion*/}
      <div className="flex flex-col gap-5">
        <Link
          className=" font-bold tracking-tighter transition-all"
          to="/"
          onClick={handleClose}
        >
          <p>
            Medicamentos
            <span className="text-cyan-600">Martina</span>
          </p>
        </Link>
        <nav className="flex tracking-tighter flex-col items-start gap-4">
          {/*links de la barra de navegacion  */}
          {navbarmobilinks.map((item) => (
            <NavLink
              className={({ isActive }) => `${
                isActive ? "text-cyan-600 underline" : ``
              }
                        transition-all duration-300 font-light hover:text-cyan-600 hover:underline
                    `}
              to={item.href}
              key={item.id}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
