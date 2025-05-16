import { useForm } from "react-hook-form";
import { InputAddress } from "./InputAddress";
import { AddressFormValues, addressSchema } from "../../lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemsCheckout } from "./ItemsCheckout";
import { useCreateOrders } from "../../hooks";
import { useCartStore } from "../../store/cart.store";
import { ImSpinner2 } from "react-icons/im";

export const FormCheckout = () => {
  const {
    //desestructura los props
    register, // función para registrar campos del formulario del validador del formulario addres
    formState: { errors }, //maneja los errores
    handleSubmit, //maneja el envio del formulario
  } = useForm<AddressFormValues>({
    //define los valores del formulario
    resolver: zodResolver(addressSchema), //valida el formulario
  });

  const { mutate: createOrder, isPending } = useCreateOrders();// Hook para crear la orden y saber si está en proceso (isPending)
  const cleanCart = useCartStore((state) => state.cleanCart);// Función del estado global para limpiar el carrito
  const cartItems = useCartStore((state) => state.items);// Obtiene los items del carrito desde el estado global
  const totalAmount = useCartStore((state) => state.totalAmount);// Obtiene el monto total desde el estado global

  const onSubmit = handleSubmit((data) => {
    //maneja el envio del formulario de la informacion del formulario de abajo
    const orderInput = {
      address: data, // datos de dirección ingresados
      cartItems: cartItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    };

    createOrder(orderInput, {
      onSuccess: () => {
        cleanCart();// limpia el carrito si la orden se crea correctamente
      },
    });
  });
// Si la orden se está procesando, muestra pantalla de carga
  if (isPending) {
    return (
      <div className="flex flex-col gap-3 h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin h-10 w-10" />
        <p className="text-sm font-medium">Estamos procesando tu pedido</p>
      </div>
    );
  }
// Renderiza el formulario de checkout
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-normal">Entrega</h3>

          <InputAddress
            register={register}
            errors={errors}
            name="addressLine1"
            placeholder="Direccion de entrega"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="addressLine2"
            placeholder="Direccion adicional (opcional)"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="state"
            placeholder="Estado / Provincia"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="city"
            placeholder="Ciudad"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="postalCode"
            placeholder="Codigo postal (opcional)"
          />

          <select
            className="border border-slate-200 rounded-md p-3"
            {...register("country")}
          >
            <option value="Perú">Perú</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Metodos de envio</p>

          <div className="flex justify-between items-center text-sm border-slate-600 bg-stone-100 py-4 rounded-md px-6">
            <span className="font-normal">Standard</span>
            <span className="font-semibold">Gratis</span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-ss-md rounded-se-md px-6">
              <span>Deposito Bancario</span>
            </div>

            <div className="bg-stone-100 text-[13px] p-5 space-y-0.5 border border-gray-200 rounded-es-md rounded-ee-md">
              <p>Compra a traves de transferencia bancaria</p>
              <p>Banco Pichincha</p>
              <p>Razon social: MedicamentosMartita</p>
              <p>RUC: 123456789</p>
              <p>Tipo de Cuenta: Corriente</p>
              <p>Numero de Cuenta: 123456789</p>
              <p>CCI: 123456789</p>
              <p>
                La informacion sera compartida nuevamente una vez que se haya
                finalizado la compra
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-3xl">Resumen del pedido</h3>

            {/* Aqui se mostrara el resumen del pedido */}
            <ItemsCheckout />
            <button
              type="submit"
              className="bg-black text-white py-4 font-bold tracking-wide rounded-md mt-2"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
