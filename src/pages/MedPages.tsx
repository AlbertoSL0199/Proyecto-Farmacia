import { useState } from "react";
import { CardProduct } from "../components/products/CardProduct";
import { ContainerFilter } from "../components/products/ContainerFilter";
import { prepareProducts } from "../helpers";
import { useFilteredProducts,  } from "../hooks";
import { Pagination } from "../components/shared/Pagination";

export const MedPages = () => {
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const {
    data: products = [],
    isLoading,
    totalProducts,
  } = useFilteredProducts({
    page,
    brands: selectedBrands,
  });

  const preparedProducts = prepareProducts(products);

  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12">Medicamentos</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/*filtros de la pagina */}
        <ContainerFilter  
          setSelectedBrands={setSelectedBrands}
          selecteBrands={selectedBrands}
        />

        {/* colocar la carga de pagina para que no aparezca en toda la pagina */}
        {isLoading ? (
          <div className="col-span-2 flex items-center justify-center h-[500px]">
            <p className="text-2xl">Cargando... </p>
          </div>
        ) : (
          <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-3">
              {preparedProducts.map((product) => (
                <CardProduct
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  colors={product.colors}
                  img={product.images[0]}
                  slug={product.slug}
                  variants={product.variants}
                />
              ))}
            </div>
            {/* toda la pagina */}
            <Pagination
              totalItems={totalProducts}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
};
