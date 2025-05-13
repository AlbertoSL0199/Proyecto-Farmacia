import { Link, NavLink } from "react-router-dom";
import { navbarlinks } from "../../constants/links";
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart.store";
import { useUser } from "../../hooks";
import { LuLoader } from "react-icons/lu";
export const Navbar = () => {
  //setea la funcion de abrir la barra de navegacion
  const openSheet = useGlobalStore((state) => state.openSheet);
  //definimos la funcion para el boton de la barra de navegacion
  const setActiveNavMovile = useGlobalStore(
    (state) => state.setActiveNavMobile
  );
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart); // se obtiene el total de items en el carrito

  const { session, isLoading } = useUser(); // se obtiene la sesion del usuario
  const userId = session?.user.id; // se obtiene el id del usuario

  return (
    <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
      <Logo />
      <nav className="space-x-5 hidden md:flex">
        {navbarlinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) => `${
              isActive ? "text-cyan-600 underline" : ``
            }
                        transition-all duration-300 font-medium hover:text-cyan-600 hover:underline
                    `}
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      <div className="flex gap-5 items-center">
        <button onClick={() => openSheet("search")}>
          <HiOutlineSearch size={25} />
        </button>
        {isLoading ? ( // muestra un loading y su icono si la peticion esta en curso
          <LuLoader className="animate-spin" size={60} />
        ) : session ? ( // muestra el icono de usuario si la sesion esta activa
          <div className="relative">
            <Link
              to="/account"
              className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
            >
              R
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <HiOutlineUser size={25} />
          </Link>
        )}
        <button className="relative" onClick={() => openSheet("cart")}>
          <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
            {totalItemsInCart}
          </span>
          <HiOutlineShoppingBag size={25} />
        </button>
      </div>
      <button className="md:hidden" onClick={() => setActiveNavMovile(true)}>
        <FaBarsStaggered size={25} />
      </button>
    </header>
  );
};
