import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks";
import { Loader } from "../../shared/Loader";
import { formatDateShort, formatPrice } from "../../../helpers";
import { Pagination } from "../../shared/Pagination";
import { CellTableProduct } from "./CellTableProduct";

const tableHeaders = [
  "",
  "Nombre",
  "Capacidad",
  "Precio",
  "Stock",
  "Fecha de creación",
  "",
];

export const TableProduct = () => {
  const [openMenuIndex, setopenMenuIndex] = useState<number | null>(null);
  //estado para iterar el cambio de estado de la capacidad de los productos devolviendo cada precio y stock
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: number; //en la llave ira el id del producto
  }>({});

  const [page, setPage] = useState(1);

  const { products, isLoading, totalProducts } = useProducts({ page });

  const handleMenuToggle = (index: number) => {
    if (openMenuIndex === index) {
      //significa que el menu esta abierto
      //al poner nulo se cierra
      setopenMenuIndex(null);
    } else {
      setopenMenuIndex(index);
    }
  };
  const handleVariantChange = (productId: string, variantIndex: number) => {
    //
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantIndex, //se pone entre corchetes xq productId sera la llave dinamica para asignar valores dinamicos
    });
  };
  const handleDeletProduct = (id: string) => {
    console.log(id);
  };
  if (!products || isLoading || !totalProducts) return <Loader />;
  return (
    <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
      <h1 className="font-bold text-xl">Productos</h1>

      <p className="text-sm mt-1 mb-8 font-regular text-gray-500">
        Gestiona tus productos y mira las estadisticas de tus ventas
      </p>

      {/*tabla de los productos */}
      <div className="relative w-full h-full">
        <table className="text-sm w-full caption-bottom overflow-auto">
          <thead className="border-b border-gray-200 pb-3">
            <tr className=" text-sm font-bold">
              {tableHeaders.map((header, index) => (
                <th key={index} className="h-12 px-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              //que lea el productoid sino que sea 0
              const selectedVariantIndex = selectedVariants[product.id] ?? 0;

              const selectedVariant = product.variants[selectedVariantIndex];
              return (
                <tr key={index}>
                  <td className="p-4 align-middle sm:table-cell">
                    <img
                      src={product.images[0] || ""}
                      alt="Imagen Product"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 aspect-square rounded-md object-contain"
                    />
                  </td>
                  <CellTableProduct contenido={product.name} />
                  <td className="p-4 font-medium tracking-tighter">
                    <select
                      onChange={(e) =>
                        handleVariantChange(product.id, Number(e.target.value))
                      }
                      value={selectedVariantIndex}
                      className="border border-gray-300 rounded-md p-0.5 w-full"
                    >
                      {product.variants.map((prod_variant, variantIndex) => (
                        <option key={prod_variant.id} value={variantIndex}>
                          {prod_variant.storage}
                        </option>
                      ))}
                    </select>
                  </td>
                  <CellTableProduct
                    contenido={formatPrice(selectedVariant.price)}
                  />
                  <CellTableProduct
                    contenido={selectedVariant.stock.toString()}
                  />
                  <CellTableProduct
                    contenido={formatDateShort(product.created_at)}
                  />
                  <td className="relative">
                    <button
                      className="text-slate-900"
                      onClick={() => handleMenuToggle(index)}
                    >
                      <FaEllipsis />
                    </button>
                    {openMenuIndex === index && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 bg-white border-gray-200 rounded-md shadow-xl z-10 w-[120px]"
                      >
                        <Link
                          to={`/dashboard/productos/editar/${product.slug}`}
                          className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Editar
                          <HiOutlineExternalLink
                            size={13}
                            className="inline-block"
                          />
                        </Link> 
                        <button
                          onClick={() => handleDeletProduct(product.id)}
                          className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/*contrtoles de la paginacion */}
      <Pagination page={page} setPage={setPage} totalItems={totalProducts} />
    </div>
  );
};
