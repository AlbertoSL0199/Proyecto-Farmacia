import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { sociaLinks } from "../../constants/links";

export const Footer = () => {
  return(
  <footer className="py-16 bg-gray-950 px-12 flex justify-between gap-10 text-slate-200 text-sm flex-wrap mt-10 md:flex-nowrap">
    <Link 
        to='/' 
        className={`text-2xl font-bold tracking-tighter transition-all text-white flex-1`}
        >
            Medicamentos Martina
    </Link>
    <div className="flex flex-col gap-4 flex-1">
        <p className="font-semibold uppercase tracking-tighter">
            Suscribete
        </p>
        <p className="text-xs font-medium">
            Recibe promociones exclusivas
        </p>
        <div className="border border-gray-800 flex items-center gap-2 px-3 py-3 rounded-full">
            <input 
                type="email" 
                placeholder="Correo electronico"
                className="pl-2 bg-gray-950 text-slate-200 w-full focus:outline-none"
            />
            <button className="text-slate-200">
                <BiChevronRight size={20}/>
            </button>
        </div>
    </div>
    <div className="flex flex-col gap-4 flex-1">
        <p className="font-semibold uppercase tracking-tighter">
            Politicas
        </p>
        <nav className="flex flex-col gap-2 text-xs font-medium space-x-2">
            <Link to='/medicamento'>Productos </Link> 
            <Link to='#' className="text-slate-300 hover:text-white">
                Politicas de privacidad 
            </Link>
            <Link to='#' className="text-slate-300 hover:text-white">
                Terminos de uso 
            </Link>
        </nav>
    </div>

    <div className="flex flex-col gap-4 flex-1">
        <p className="font-semibold uppercase tracking-tighter">
            Siguenos
        </p>
        <p className="text-xs leading-6">
            No te pierdas los descuentos en medicamentos que tenemos para ti.
        </p>
        <div className="flex">
            {
                sociaLinks.map((Link) => (
                    <a 
                        key={Link.id}
                        href={Link.href}
                        target="_blank"    
                        rel="noreferrer"
                        className="text-slate-300 border border-gray-800 w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-white hover:text-gray-950"
                    >
                        {Link.icon}
                    </a>
                ))
            }
        </div>        

    </div>
  </footer>
); 
};
 

