import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { VariantsProduct } from "../../interface";
import { formatPrice } from "../../helpers";

interface Props {
  img: string;
  name: string;
  price: number;
  slug: string;
  colors: { name: string; color: string }[];
  variants: VariantsProduct[];
}

export const CardProduct = ({
  img,
  name,
  price,
  slug,
  colors,
  variants,
}: Props) => {
  const [activeColor, setActiveColor] = useState<{
    name: string;
    color: string;
  }>(colors[0]);
  //Identificar la variante del medicamento segun el color (generico - receta)
  const selectedVariant = variants.find(
    variant => variant.color === activeColor.color
  );

  const stock = selectedVariant?.stock || 0;

  return (
    <div className="flex flex-col gap-6 relative text-center">
      <Link 
            to={`/medicamentos/${slug}`} 
            className="flex relative group overflow-hidden"
        >
        <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
          <img src={img} alt={name} className="object-contain h-full w-full" />
        </div>

        <button
          className="bg-white border border-slate-200 absolute w-full bottom-0 py-3 rounded-3xl 
                flex items-center justify-center gap-1 text-sm font-medium hover:bg-stone-100 translate-y-[100%] 
                transition-all duration-300 group-hover:translate-y-0"
        >
          <FiPlus />
          Añadir
        </button>
      </Link>
      <div className="flex flex-col gap-1 items-center">
        <p className="text-[15px] font-medium">{name}</p>
        <p className="text-[15px] font-medium">{formatPrice(price)}</p>
      </div>
      <div className="absolute top-2 left-2">
        {stock === 0 && <span>Agotado</span>}
      </div>
    </div>
  );
};
