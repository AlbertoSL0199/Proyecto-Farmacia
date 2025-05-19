import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "../actions";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared/Loader";

export const ClientLayout = () => {
  const { session, isLoading: isLoadingSession } = useUser(); //obtiene la sesion del usuario
  

  const navigate = useNavigate(); 

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) { //si no hay sesion proteccion de rutas
        //verifica si la sesion del usuario esta autenticada o cierre sesion
        //si no hay sesion redirecciona a la pagina de login
        navigate("/login");
      }
    });
  }, [navigate]); 

  if (isLoadingSession) {//verifica si la sesion del usuario esta cargando
    return <Loader/>; //muestra un mensaje de carga
  }

  const handleLogout = async () => {
    //cierra la sesion del usuario
    await signOut();
  };

  return (
    <div className="flex flex-col px-15">
      {
        //menu de navegacion
      }
      <nav className="flex justify-center gap-10 text-sm font-medium">
        <NavLink
          to="/account/pedidos"
          className={(
            { isActive } // define el path para la ruta de los pedidos
          ) => `${isActive ? "underline" : "hover:underline"}`}
        >
          Pedidos
        </NavLink>

        <button className="hover:underline" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </nav>

      <main className="containe  flex-1">
        <Outlet/>
      </main>
    </div>

  );
};
