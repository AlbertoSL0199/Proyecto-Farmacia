import { useQuery } from "@tanstack/react-query";
import { getOrdersByCustomerId } from "../../actions";

export const useOrders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersByCustomerId,
    retry: false
  });
  return {
    data,
    isLoading,
  };
};
