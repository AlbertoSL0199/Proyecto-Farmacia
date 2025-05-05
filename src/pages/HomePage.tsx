import { Brands } from "../components/home/Brands";
import { ProductGrid } from "../components/home/ProductGrid";
import { popularCelulares, recentCelulares } from "../data/initialData";
import { prepareProducts } from "../helpers";
import { useProducts } from "../hooks";

export const HomePage = () => {
  const { products, isLoading } = useProducts();

  const preparedRecentProducts = prepareProducts(recentCelulares);
  const preparedPopularProducts = prepareProducts(popularCelulares);

  return (
    <div>
      <ProductGrid
        title="Nuevos Medicamentos"
        products={preparedRecentProducts}
      />

      <ProductGrid
        title="Medicamentos Destacados "
        products={preparedPopularProducts}
      />
      <Brands />
    </div>
  );
};
