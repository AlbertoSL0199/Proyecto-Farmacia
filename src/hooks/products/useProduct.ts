import { useQuery } from "@tanstack/react-query";
import { getProductByslug } from "../../actions";

export const useProduct = (slug: string) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductByslug(slug),
    retry: false,
  });
  return {
    product,
    isLoading,
    isError,
  };
};
