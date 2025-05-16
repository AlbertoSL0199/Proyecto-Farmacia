import { useQuery } from "@tanstack/react-query";
import { getOrdersById } from "../../actions";

export const useOrder = (orderId: number) => {
    //si orderId es null el enable lo convierte en falso no activa la funcion

  const { data, isLoading,isError } = useQuery({
    queryKey: ["order",orderId],
    queryFn: () => getOrdersById(orderId),
    enabled: !!orderId,
    retry: false,
  });
  return {
    data,
    isLoading,
    isError,
  };
};
