import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart.store";
import { FormCheckout } from "../components/checkout/FormCheckout";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";
import { useUser } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { useEffect } from "react";
import { supabase } from "../supabase/client";

export const CheckOutPage = () => {
  const totalItems = useCartStore((state) => state.totalItemsInCart); //obtiene el total de items en el carrito
  // const totalItems = 0; //para pruebas

  //validar autenticidad de usuario logeado
  const { isLoading } = useUser();
  const navigate = useNavigate(); //redirecciona links

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        //si no hay sesion proteccion de rutas
        //verifica si la sesion del usuario esta autenticada o cierre sesion
        //si no hay sesion redirecciona a la pagina de login
        navigate("/login");
      }
    });
  }, [navigate]);
  if (isLoading) return <Loader />;
  return (
    <div style={{ minHeight: "calc(100vh - 100px)" }}>
      <header className="h-[100px] bg-white text-black flex flex-col items-center justify-center px-10 border-b border-slate-200">
        <Link
          to="/"
          className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start"
        >
          Medicamentos
          <span className="text-cyan-600">Martina</span>
        </Link>
      </header>

      <main className="w-full h-full flex relative">
        {totalItems === 0 ? ( //verifica si el carrito esta vacio
          //si el carrito esta vacio muestra un mensaje
          <div
            style={{ height: "calc(100vh - 100px)" }}
            className="flex flex-col items-center justify-center gap-5 w-full"
          >
            <p className="text-sm font-medium tracking-tight">
              Su carro esta vacio
            </p>
            <Link
              to="/medicamentos"
              className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold"
            >
              Empezar a comprar
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full md:w-1/2 p-10 ">
              {/*muestra el formulario de checkout*/}
              <FormCheckout />
            </div>

            <div
              style={{ minHeight: "calc(100vh - 100px)" }}
              className="bg-stone-100 w-1/2 sticky top-0 right-0 p-10 hidden md:block"
            >
              {/*elementos del carrito */}
              <ItemsCheckout />
            </div>
          </>
        )}
      </main>
    </div>
  );
};
