import { LuMinus, LuPlus } from "react-icons/lu";
import { formatPrice } from "../../helpers";
import { useCartStore } from "../../store/cart.store";

export interface ICartItem {
  variantId: string;
  productId: string;
  name: string;
  storage: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  item: ICartItem;
}

export const CartItem = ({ item }: Props) => {
  const removeITem = useCartStore((state) => state.removeItem); //eliminar el item del carrito
  const updateQuantity = useCartStore((state) => state.updateQuantity); //actualizar la cantidad del item en el carrito

  //establecemos un contador para enviar la cantidad al carrito de compras
  const increment = () => {
    updateQuantity(item.variantId, item.quantity + 1);
    //actualizamos la cantidad del item en el carrito
  };

  //funcion para decrementar la cantidad del item
  const decrement = () => {
    //si la cantidad es mayor a 1, se decrementa la cantidad
    if (item.quantity > 1) {
      updateQuantity(item.variantId, item.quantity - 1);
    }
  };
  return (
    <li className="flex justify-between items-center gap-12 border-b border-slate-200 pb-5">
      <div className="flex">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex justify-between ">
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm font-medium text-gray-600 mt-1">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex gap-3">
          <p className=" text-[13px] text-gray-600">{item.storage}</p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-5 px-2 py-1 border border-slate-200 w-fit rounded-full">
            <button onClick={decrement} disabled={item.quantity === 1}>
              <LuMinus size={15} />
            </button>
            <span className="text-slate-500 text-sm">{item.quantity}</span>
            <button onClick={increment}>
              <LuPlus size={15} />
            </button>
          </div>
          <button
            className="underline font-medim text-[10px]"
            onClick={() => removeITem(item.variantId)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};
