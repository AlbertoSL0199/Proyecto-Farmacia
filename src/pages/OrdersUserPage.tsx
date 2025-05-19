import { Link } from "react-router-dom";
import { useOrders } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { TableOrders } from "../components/orders/TableOrders";

export const OrdersPage = () => {

  const {data:orders , isLoading} = useOrders();

  if(isLoading || !orders) return <Loader/>
  return (
    <div className="flex flex-col gap-6 h-full items-center">
      <div className=" flex gap-2">
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] flex justify-center items-center mt-1">
          {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        //verifica si la lista de pedidos esta vacia
        //si la lista de pedidos esta vacia muestra un mensaje
        <>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">No tienes pedidos</h2>
            <p className="text-sm text-gray-500">
              No has realizado ningun pedido
            </p>
            <Link to="/medicamentos" className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 px-8 rounded-full ">
              Empezar a comprar
            </Link>
          </div>
        </>
      ) : (
        <TableOrders orders={orders}/>
      )}
    </div>
  );
};
