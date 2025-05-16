import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ICartItem } from "../components/shared/CartItem";

export interface CartState {
  items: ICartItem[];
  totalItemsInCart: number; //total de items en el carrito
  totalAmount: number; //monto total del carrito

  addItem: (items: ICartItem) => void; //para que agregue los items al carrito
  removeItem: (variantId: string) => void; //para que remueva los items al carrito
  updateQuantity: (variantId: string, quantity: number) => void; //para que incremente la cantidad de los items al carrito
  cleanCart: () => void; //para que limpie el carrito
}

const storeApi: StateCreator<CartState> = (set) => ({
  //inicializar al carrito
  items: [],
  totalItemsInCart: 0,
  totalAmount: 0,

  //funciones para agregar, eliminar y limpiar el carrito
  cleanCart: () => set({ items: [], totalItemsInCart: 0, totalAmount: 0 }),

  addItem: (item) => {
    set((state) => {
      // se verifica si el item a agregar al carro ya existe
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.variantId === item.variantId // se busca el item en el carrito
      );
      //definimos una variable para el nuevo item
      let updatedItems;

      // si existe se actualiza la cantidad y el monto total
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((cartItem, index) =>
          index === existingItemIndex // se verifica si el item es el mismo que el que se va a agregar
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity } // se actualiza la cantidad
            : // si no es el mismo item se deja igual
              cartItem
        );
      } else {
        // si no existe se agrega el nuevo item al carrito
        updatedItems = [...state.items, item]; // se agrega el nuevo item
      }

      // se calcula total de items en el carrito
      const newTotalItems = updatedItems.reduce(
        (total, cartItem) => total + cartItem.quantity, // se suma la cantidad de los items
        0 // se inicializa en 0
      );
      // se calcula el monto total del carrito
      const newTotalAmount = updatedItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity, // se multiplica el precio por la cantidad
        0
      );
      // se actualiza el estado del carrito
      return {
        items: updatedItems, // se actualiza el carrito
        totalItemsInCart: newTotalItems, // se actualiza el total de items
        totalAmount: newTotalAmount, // se actualiza el monto total
      };
    });
  },
  removeItem: (variantId) => {
    set((state) => {
      // se filtra el carrito para eliminar el item
      const updatedItems = state.items.filter(
        (cartItem) => cartItem.variantId !== variantId // se verifica si el item es diferente al que se va a eliminar
      );
      // se calcula total de items en el carrito
      const newTotalItems = updatedItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
      // se calcula el monto total del carrito
      const newTotalAmount = updatedItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );
      // se actualiza el estado del carrito
      return {
        items: updatedItems,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    });
  },
  updateQuantity: (variantId, quantity) => {
    set((state) => {
      // se actualiza la cantidad del item
      const updatedItems = state.items.map(
        (cartItem) =>
          cartItem.variantId === variantId // se verifica si el item es el mismo que el que se va a actualizar
            ? { ...cartItem, quantity } // se actualiza la cantidad
            : cartItem // si no es el mismo item se deja igual
      );
      // se calcula total de items en el carrito
      const newTotalItems = updatedItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
      // se calcula el monto total del carrito
      const newTotalAmount = updatedItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );
      // se actualiza el estado del carrito
      return {
        items: updatedItems,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    });
  },
});

export const useCartStore = create<CartState>()(
  devtools(
    persist(storeApi, { name: "cart_store" }) // persistencia del carrito en el local storage
  )
);
