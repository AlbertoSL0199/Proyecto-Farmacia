import { Brands } from "../components/home/Brands";
import { ProductGrid } from "../components/home/ProductGrid";
import { popularCelulares, recentCelulares } from "../data/initialData";
import { prepareProducts } from "../helpers";

export const HomePage = () => {
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
