import { HiOutlineShoppingBag } from "react-icons/hi";
import { useGlobalStore } from "../../store/global.store";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useCartStore } from "../../store/cart.store";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const closeSheet = useGlobalStore((state) => state.closeSheet);
  const cartItems = useCartStore((state) => state.items); // se obtiene el carrito
  const cleanCart = useCartStore((state) => state.cleanCart); // se obtiene la funcion para limpiar el carrito
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart); // se obtiene el total de items en el carrito

  return (
    <div className="flex flex-col h-full font-semibold">
      <div className="flex px-5 py-7 justify-between items-center border-b border-slate-200">
        <span className="flex gap-3 items-center ">
          <HiOutlineShoppingBag size={20} />
          {totalItemsInCart}
          {totalItemsInCart > 1 ? " productos" : " producto"}
        </span>
        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-black" />
        </button>
      </div>

      {totalItemsInCart > 0 ? (
        <>
          {/*contenido de la lista */}
          <div className="p-7 overflow-auto flex-1">
            <ul className="space-y-9">
              {cartItems.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </ul>
          </div>

          {/*acciones de los botones */}

          <div className="mt-4 p-7">
            <Link
              to="/chechout"
              className="w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-3"
            >
              <RiSecurePaymentLine size={24} />
              Continuar con la compra
            </Link>
            <button
              onClick={cleanCart}
              className="mt-3 w-full text-black border border-black rounded-full py-3"
            >
              Limpiar Carrito
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-7">
          <p className="text-sm font-medium tracking-tight">
            Su carro esta vacio
          </p>
          <Link
            to="/medicamentos"
            className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold"
            onClick={closeSheet}
          >
            Empezar a comprar
          </Link>
        </div>
      )}
    </div>
  );
};
