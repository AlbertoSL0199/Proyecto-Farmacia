import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { IoChevronBack } from "react-icons/io5";
import { formatDateLong, formatPrice } from "../helpers";

const tableHeaders = ["Producto", "Cantidad", "Total"];

export const OrderUserPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading } = useOrder(Number(id!));

  const navigate = useNavigate();

  if (isLoading || !order) return <Loader />;

  return (
    <div >
      <div className="flex flex-col justify-between items-center gap-5 md:flex-row md:gap-0">
        <button
          onClick={() => navigate(-1)}
          className="border rounded-full py-2 border-slate-200 px-5 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest hover:bg-sky-100 transition-all"
        >
          <IoChevronBack size={16} />
          Volver a los pedidos
        </button>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">Pedido #{id}</h1>
          <p className="text-sm">{formatDateLong(order.created_at)}</p>
        </div>
        <div></div>
        <div></div>
        <div className="flex flex-col mt-10 mb-3 gap-15">
          <table className="text-sm w-full caption-bottom overflow-auto">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="h-12 text-center uppercase tracking-wide text-stone-600 font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((product, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 font-medium tracking-tighter flex gap-3 items-center">
                    <img
                      className="h-20 w-20 object-contain rounded-lg"
                      src={product.productImages}
                      alt={product.productName}
                    />
                    <div className="space-y-2">
                      <h3>{product.productName}</h3>
                      <p className="text-xs">{product.storage} </p>
                      <p className="text-xs">{formatPrice(product.price)} </p>
                    </div>
                  </td>
                  <td className="p-4 font-medium tracking-tighter text-center">
                    {product.quantity}
                  </td>
                  <td className="p-4 font-medium tracking-tighter text-center">
                    {formatPrice(product.quantity * product.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-3 text-slate-600 text-sm self-end w-1/2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatPrice(order.total_amount)}</p>
            </div>
            <div className="flex justify-between">
              <p>Envio (Standar)</p>
              <p>{formatPrice(0)}</p>
            </div>
            <div className="flex justify-between text-black font-semibold">
              <p>Total</p>
              <p>{formatPrice(order.total_amount)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Dirección</h2>

        <div className="border rounded-2xl border-stone-300 p-5 flex flex-col gap-5">
          <div className="space-y-1">
            <h3>Cliente: </h3>
            <p className="font-medium">{order.customer.full_name}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <h3 className="font-medium text-base">Dirección de envío</h3>
            <p> {order.address.addressLine1} </p>
            <p>{order.address.addressLine2 && order.address.addressLine2}</p>
            <p> {order.address.city} </p>
            <p> {order.address.state} </p>
            <p> {order.address.postalCode} </p>
            <p> {order.address.country} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
