import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <Link to='/' className={`text-2xl font-bold tracking-tighter transition-all`}>
        <p className="hidden lg:block">
            Medicamentos
            <span className="text-cyan-600"> Martina</span>
        </p>
        <p className="flex text-4xl lg:hidden">            
            <span className="-skew-x-6"> M</span>
            <span className="text-cyan-600 -skew-x-6"> M</span>
        </p>
    </Link>
  );
}

