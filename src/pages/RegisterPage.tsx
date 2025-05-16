import { Link, Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister, useUser } from "../hooks";
import { LuLoader } from "react-icons/lu";
import { Loader } from "../components/shared/Loader";
import { UserRegisterFormValues, userRegisterSchema } from "../lib/validator";


export const RegisterPage = () => {
  /*
        nuevas herramientas a usar 
        zod, react-hook-form

    */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormValues>({
    resolver: zodResolver(userRegisterSchema), //esquema de validacion para el formulario
    // inicializa el formulario
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const { mutate, isPending } = useRegister(); // instancia de useRegister para registrar al usuario
  const { session, isLoading } = useUser(); // instancia de useUser para obtener la sesion del usuario y obtener proteccion de carga ya que esta autenticado

  const onRegister = handleSubmit((data) => {
    // aqui se envia la data al servidor
    const { email, password, name, phone } = data; // destructura la data

    mutate({ email, password, name, phone }); // llama a la funcion de registro registra las var4iables (el body de la peticion)

  });

  if (isLoading) return <Loader />; // muestra un loading y su icono si la peticion esta en curso
  if (session) return <Navigate to="/" />; // redirecciona a la pagina de inicio si el usuario ya esta logueado
  // si no hay sesion, muestra el formulario de inicio de sesion

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
      <h1 className="text-4xl font-bold capitalize">Registrate</h1>
      <p className="text-sm font-medium">
        Por favor, rellene los siguientes campos:
      </p>

      {isPending ? (
        // muestra un loading y su icono si la peticion esta en curso
        <div className="w-full h-full flex justify-center mt-20">
          <LuLoader className="animate-spin" size={60} />
        </div>
      ) : (
        // muestra el formulario si la peticion no esta en curso
        <>
          <form
            onSubmit={onRegister}
            className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]"
          >
            <input
              type="text"
              placeholder="Nombre Completo"
              {...register("name")} // registra el input
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <input
              type="text"
              placeholder="Celular"
              {...register("phone")} // registra el input
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            />

            <input
              type="email"
              placeholder="Ingresa tu correo electronico"
              {...register("email")} // registra el input
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password")} // registra el input
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
              Registrarme
            </button>
          </form>

          <p className="text-sm text-stone-800">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="underline ml-2">
              Inicia Sesion
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
