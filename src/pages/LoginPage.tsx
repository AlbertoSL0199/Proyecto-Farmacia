import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLogin, useUser } from "../hooks";
import { LuLoader } from "react-icons/lu";
import { Loader } from "../components/shared/Loader";

export const LoginPage = () => {
  const { mutate, isPending } = useLogin(); // instancia de useLogin para iniciar sesion
  const {session, isLoading} = useUser(); // instancia de useUser para obtener la sesion del usuario y obtener proteccion de carga
  const [email, setEmail] = useState("sofen83830@neuraxo.com"); // estado del email
  const [password, setPassword] = useState("TokyoGhoul010599"); // estado de la contraseña
  const onLogin = (e: React.FormEvent) => {
    e.preventDefault(); // previene el comportamiento por defecto del formulario
    mutate({ email, password }); // llama a la funcion de inicio de sesion
  };
  if (isLoading) return <Loader/>; // muestra un loading y su icono si la peticion esta en curso 
  if (session) return <Navigate to="/" />; // redirecciona a la pagina de inicio si el usuario ya esta logueado
  // si no hay sesion, muestra el formulario de inicio de sesion
  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
      <h1 className="text-4xl font-bold capitalize">Iniciar Sesión</h1>
      <p className="text-sm font-medium">!Que bueno verte de nuevo!</p>

      {isPending ? (
        // muestra un loading y su icono si la peticion esta en curso
        <div className="w-full h-full flex justify-center mt-20">
          <LuLoader className="animate-spin" size={60} />
        </div>
      ) : (
        <>
          <form
            onSubmit={onLogin}
            className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]"
          >
            <input
              type="email"
              value={email} // valor del email
              onChange={(e) => setEmail(e.target.value)} // actualiza el estado del email
              placeholder="Ingresa tu correo electronico"
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            />

            <input
              type="password"
              value={password} // valor de la contraseña
              onChange={(e) => setPassword(e.target.value)} // actualiza el estado de la contraseña
              placeholder="Ingresa tu contraseña"
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            />

            <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
              Iniciar Sesion
            </button>
          </form>

          <p className="text-sm text-stone-800">
            ¿No tienes una cuenta?
            <Link to="/registro" className="underline ml-2">
              Registrate
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
