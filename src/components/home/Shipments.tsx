import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdAddBusiness, MdLocalShipping } from "react-icons/md";

export const Shipments = () => {
  return (
    <div className="grid space-x-5 grid-cols-2 gap-8 mb-1 self-center lg:grid-cols-3 lg:gap-50">
      <Link to="/envios">
        <div className="flex items-center gap-6">
          <MdLocalShipping size={40} className="text-slate-600" />
          <div className="space-y-1">
            <p className="font-semibold">Envio Gratis</p>
            <p className="text-sm">En todos nuestros medicamentos</p>
          </div>
        </div>
      </Link>

      <Link to="/envios">
        <div className="flex items-center gap-6">
          <MdAddBusiness size={40} className="text-slate-600" />
          <div className="space-y-1">
            <p className="font-semibold">Soporte 24/7</p>
            <p className="text-sm">
              Atencion Medica especializada todos los dias
            </p>
          </div>
        </div>
      </Link>
      <Link to="/envios">
        <div className="flex items-center gap-6">
          <BiWorld size={40} className="text-slate-600" />
          <div className="space-y-1">
            <p className="font-semibold">Garantia</p>
            <p className="text-sm">Todos los medicamentos al 100%</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
