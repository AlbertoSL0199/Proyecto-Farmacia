import { Link } from "react-router-dom";

export const OrdersPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className=" flex gap-2">
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] flex justify-center items-center mt-1">
          30
        </span>
      </div>

      {[0].length === 0 ? (
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Pedido #1</h2>
            <p className="text-sm text-gray-500">Fecha: 01/01/2023</p>
            <p className="text-sm text-gray-500">Estado: Enviado</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Pedido #2</h2>
            <p className="text-sm text-gray-500">Fecha: 02/01/2023</p>
            <p className="text-sm text-gray-500">Estado: Enviado</p>
          </div>
        </div>
      )}
    </div>
  );
};
