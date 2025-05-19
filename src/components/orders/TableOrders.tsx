import { useNavigate } from "react-router-dom";
import { formatDateLong, formatPrice, getStatus } from "../../helpers";
import { OrderItemSingle } from "../../interface";

interface Props {
  orders: OrderItemSingle[];
}

const tableHeaders = ["ID", "Fecha", "Estado", "Total"];

export const TableOrders = ({ orders }: Props) => {
  const navigate = useNavigate(); //redireccionar
  return (
    <div className="relative w-full h-full">
      <table className="text-sm w-full caption-bottom overflow-auto">
        <thead className="border-b border-gray-200 pb-3 ">
          <tr className="text-sm font-bold">
            {tableHeaders.map((header, index) => (
              <th key={index} className="h-12 px-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {/* al ultimo tr border0*/}
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => navigate(`/account/pedidos/${order.id}`)}
              className="cursor-pointer hover:bg-gray-300 transition-colors duration-200"
            >
              <td className="p-4 font-medium tracking-tighter">{order.id}</td>
              <td className="p-4 font-medium tracking-tighter">
                {formatDateLong(order.created_at)}
              </td>
              <td className="p-4 font-medium tracking-tighter">
                {getStatus(order.status)}
              </td>
              <td className="p-4 font-medium tracking-tighter">
                {formatPrice(order.total_amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
