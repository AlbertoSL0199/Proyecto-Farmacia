import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../actions";

export const useProducts = ({page =1}:{page?:number}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products",page],
    queryFn: () => getProducts(page),
    staleTime: 1000 * 60 * 5,
  });
  return { products: data?.products, isLoading ,totalProducts:data?.count ?? 0};
};
