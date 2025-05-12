import { LuMinus, LuPlus } from "react-icons/lu";
import { Separator } from "../components/shared/Separator";
import { formatPrice } from "../helpers";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { ProductDescription } from "../components/one-product/ProductDescription";
import { GridImages } from "../components/one-product/GridImages";
import { useProduct } from "../hooks/products/useProduct";
import { use, useEffect, useMemo, useState } from "react";
import { VariantsProduct } from "../interface";
import { Tag } from "../components/shared/Tag";
import { Loader } from "../components/shared/Loader";
import { useCounterStore } from "../store/counter.store";
import { useCartStore } from "../store/cart.store";
import toast from "react-hot-toast";

interface Acc {
  [key: string]: {
    storages: string[];
  };
}

export const MedPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const [currentSlug, setCurrentSlug] = useState(slug); //para obtener el slug de la url

  const { product, isLoading, isError } = useProduct(currentSlug || "");

  const [selectedColor, setselectedColor] = useState<string | null>(null);

  const [selectedStorage, setselectedStorage] = useState<string | null>(null);

  const [selectedVariant, setselectedVariant] =
    useState<VariantsProduct | null>(null);

  //obtener el stock
  const isOutOfStock = selectedVariant?.stock === 0;

  //establecemos un contador para enviar la cantidad al carrito de compras
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const addItem = useCartStore((state) => state.addItem); //agregar el item al carrito

  const navigate = useNavigate();

  //funcion para agregar al carrito
  const addToCart = () => {
    if (selectedVariant) {
      //si hay stock, se agrega el item al carrito
      addItem({
        variantId: selectedVariant.id,
        productId: product?.id || "",
        name: product?.name || "",
        image: product?.images[0] || "",
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: count,
      });
      toast.success("Producto añadido al carrito ", {
        position: "bottom-right",
      });
    }
  };

  //funcion para comprar ahora
  const buyNow = () => {
    if (selectedVariant) {
      //si hay stock, se agrega el item al carrito
      addItem({
        variantId: selectedVariant.id,
        productId: product?.id || "",
        name: product?.name || "",
        image: product?.images[0] || "",
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: count,
      });

      navigate("/checkout");
    }
  };

  useEffect(() => {
    //para evitar que se vuelva a cargar el producto
    setCurrentSlug(slug);
    setselectedColor(null);
    setselectedStorage(null);
    setselectedVariant(null);
  }, [slug]);
  //agrupar variantes por capacidad
  const colors = useMemo(() => {
    return (
      product?.variants.reduce((acc: Acc, variant: VariantsProduct) => {
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
      }, {} as Acc) || {}
    );
  }, [product?.variants]);

  //obtener primer item predeterminado
  const availableColors = Object.keys(colors);
  //primario
  useEffect(() => {
    if (!selectedColor && availableColors.length > 0) {
      setselectedColor(availableColors[0]);
    }
  }, [availableColors, selectedColor]);

  useEffect(() => {
    //agregar el primer item de para agregar al carrito
    if (selectedColor && colors[selectedColor] && !selectedStorage) {
      setselectedStorage(colors[selectedColor].storages[0]);
    }
  }, [selectedColor, colors, selectedStorage]);

  //obtener la variante seleccionada
  useEffect(() => {
    if (selectedColor && selectedStorage) {
      const variant = product?.variants.find(
        (variant) =>
          variant.color === selectedColor && variant.storage === selectedStorage
      );

      setselectedVariant(variant as VariantsProduct);
    }
  }, [selectedColor, selectedStorage, product?.variants]);
  if (isLoading) {
    return <Loader />;
  }
  if (!product || isError)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p>Producto no encontrado</p>
      </div>
    );

  return (
    <>
      <div className="h-fit px-15 flex flex-col md:flex-row gap-16 mt-8">
        {/* INSERTAR LA GALERIA DE IMAGENES  */}
        <GridImages images={product.images} />

        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className=" flex gap-5 items-center">
            <span className=" tracking-wide text-lg font-semibold">
              {formatPrice(selectedVariant?.price || product.variants[0].price)}
            </span>

            <div className="relative">
              {/* para saber si esta agotado */}
              {isOutOfStock && <Tag contenTag="agotado" />}
            </div>
          </div>

          <Separator />

          {/* caracteristicas del producto */}
          <ul className="space-y-2 ml-7 my-10">
            {product.features.map((feature) => (
              <li className="text-sm flex items-center gap-2 tracking-tight font-medium">
                <span className="bg-black w-[6px] h-[6px] rounded-full" />
                {feature}
              </li>
            ))}
          </ul>

          {/* opciones de capacidad ml o mg */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">Opciones disponible</p>
            {selectedColor && (
              <div className="flex gap-3">
                <select
                  value={selectedStorage || ""}
                  onChange={(e) => setselectedStorage(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1"
                >
                  {colors[selectedColor].storages.map((storage) => (
                    <option value={storage} key={storage}>
                      {storage}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {/*comprar */}
          {isOutOfStock ? (
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
                  <button onClick={decrement} disabled={count === 1}>
                    <LuMinus size={15} />
                  </button>
                  <span className="text-slate-500 text-sm">{count}</span>
                  <button onClick={increment}>
                    <LuPlus size={15} />
                  </button>
                </div>
              </div>

              {/*Acciones de los botonjes */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={addToCart}
                  className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full 
              transition-all duration-300 hover:bg-[#e2e2e2]"
                >
                  Agregar al carro
                </button>
                <button
                  onClick={buyNow}
                  className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full"
                >
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
      <ProductDescription content={product.description} />
    </>
  );
};
