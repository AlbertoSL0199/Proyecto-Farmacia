import { LuMinus, LuPlus } from "react-icons/lu";
import { Separator } from "../components/shared/Separator";
import { formatPrice } from "../helpers";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { ProductDescription } from "../components/one-product/ProductDescription";
import { GridImages } from "../components/one-product/GridImages";
import { useProduct } from "../hooks/products/useProduct";
import { useMemo } from "react";
import { VariantsProduct } from "../interface";

interface Acc {
  [key: string]: {
    storages: string[];
  };
}

export const MedPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { product, isLoading, isError } = useProduct(slug || "");

  if (!product || isError)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p>Producto no encontrado </p>
      </div>
    );

  //agrupar variantes por capacidad
/*
  const colors = useMemo(() => {
    return product?.variants.reduce(
       (acc: Acc, variant: VariantsProduct) => {
      const { color, storage } = variant;

      if (!acc[color]) {
        acc[color] = {
          storages: [],
        };
      }
      if (!acc[color].storages.includes(storage)) {
        acc[color].storages.push(storage);
      }
      return acc;
    },
    {} as Acc
  ) || {};
  }, [product?.variants]);
  */
  return (
    <>
      <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
        {/* INSERTAR LA GALERIA DE IMAGENES  */}
        <GridImages
          images={
            [
              /*product.images*/
            ]
          }
        />

        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className=" flex gap-5 items-center">
            <span className=" tracking-wide text-lg font-semibold">
              {formatPrice(
                0 /*selectedVariant?.price || product.variants[0].price */
              )}
            </span>

            <div className="relative">
              {/* para saber si esta agotado */}

              <span> Agothhado</span>
            </div>
          </div>

          <Separator />

          {/* caracteristicas del producto */}
          <ul className="space-y-2 ml-7 my-10">
            <li className="text-sm flex items-center gap-2 tracking-tight font-medium">
              <span className="bg-black w-[5px] h-[5px] rounded-full" />
              {/* hace circulo  */}
              20 piezas
            </li>
          </ul>

          {/* opciones de capacidad ml o mg */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">Opciones disponible</p>
            <div className="flex gap-3">
              <select className="border border-gray-300 rounded-lg px-3 py-1">
                <option value="">20 piezas</option>
              </select>
            </div>
          </div>
          {/*comprar */}
          {false ? (
            <button
              className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full"
              disabled
            >
              Agotado
            </button>
          ) : (
            <>
              {/* contador */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Cantidad:</p>
                <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                  <button>
                    <LuMinus size={15} />
                  </button>
                  <span className="text-slate-500 text-sm">1</span>
                  <button>
                    <LuPlus size={15} />
                  </button>
                </div>
              </div>

              {/*Acciones de los botonjes */}
              <div className="flex flex-col gap-3">
                <button
                  className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full 
              transition-all duration-300 hover:bg-[#e2e2e2]"
                >
                  Agregar al carro
                </button>
                <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full">
                  Comprar ahora
                </button>
              </div>
            </>
          )}
          <div className="flex pt-2">
            <div className="flex flex-col gap-1 flex-1 items-center">
              <CiDeliveryTruck size={35} />
              <p className="text-xs font-semibold"> Envio Gratis</p>
            </div>
            <Link
              to="#"
              className="flex flex-col gap-1 flex-1 items-center justify-center"
            >
              <BsChatLeftText size={30} />
              <p className="flex flex-col items-center text-xs">
                <span className="font-semibold">¿Necesitas ayuda?</span>
                Contactanos aaqui
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/*descripcion */}
      <ProductDescription />
    </>
  );
};
