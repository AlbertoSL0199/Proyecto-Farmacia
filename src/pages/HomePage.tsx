import { Brands } from "../components/home/Brands";
import { ProductGrid } from "../components/home/ProductGrid";
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton";
import { prepareProducts } from "../helpers";
import { useHomeProducts } from "../hooks";

export const HomePage = () => {
  const { recentProductsResult, popularProductsResult, isLoading } =
    useHomeProducts();

  const preparedRecentProducts = prepareProducts(recentProductsResult);
  const preparedPopularProducts = prepareProducts(popularProductsResult);

  return (
    <div>
      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductGrid
          title="Nuevos Medicamentos"
          products={preparedRecentProducts}
        />
      )},

      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductGrid
          title="Medicamentos Destacados "
          products={preparedPopularProducts}
        />
      )}

      <Brands />
    </div>
  );
};
