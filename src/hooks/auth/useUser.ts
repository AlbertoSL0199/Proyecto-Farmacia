import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../actions";

export const useUser = () => {
  const { data, isLoading } = useQuery({ // useQuery para obtener la sesion
    queryKey: ["user"],// clave de la consulta
    queryFn: getSession, // funcion que se ejecuta para obtener la sesion
    retry: false, // no reintentar la consulta si falla
    refetchOnWindowFocus: true, // volver a consultar al enfocar la ventana
  });

  return {
    session: data?.session, // sesion del usuario
    isLoading,
  };
};
