import { useQueries } from "@tanstack/react-query";
import { getRandomProducts, getRecentProducts } from "../../actions";

export const useHomeProducts = () => {
  const results = useQueries({
    queries: [
      //arreglo de objetos de las querys para las funciones de la homepage
      {
        queryKey: ["recentProducts"],
        queryFn: getRecentProducts,
      },
      {
        queryKey: ["popularProducts"],
        queryFn: getRandomProducts,
      },
    ],
  });
 //desestructuras los resultados 
  const [recentProductsResult,popularProductsResult] =results;

  const isLoading = recentProductsResult.isLoading || popularProductsResult.isLoading;
  const isError = recentProductsResult.isError || popularProductsResult.isError;
   
  return {
    recentProductsResult : recentProductsResult.data || [],
    popularProductsResult: popularProductsResult.data || [],
    isLoading,
    isError
  };
};
