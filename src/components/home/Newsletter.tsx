export const Newsletter = () => {
    return(
        <div className="relative bg-gray-500 text-white py-20">
            <div
            className="absolute inset-0 bg-cover bg-center opacity-70 h-full"
            style={{backgroundImage:'url(/public/banner.jpg)'}}
        />
            <div className="containe z-10 relative p-5 md:p-0">
                <div className="w-full text-black bg-white p-12 space-y-5 md:w-[50%] lg:w-[40%]">
                    <p className="text-xs uppercase font-semibold">
                        Suscribete para recibir promociones exclusivas
                    </p>
                    <p className="text-xs font-medium w-[80%] leading-5">
                        Introduce tu correo para recibir ofertas
                    </p>
                    <form className="flex flex-col gap-5 xl:flex-row">
                        <input 
                            type="email" 
                            className="border border-slate-200 focus:outline-none rounded-full py-3 px-5 w-full text-xs font-medium"
                            placeholder="Correo Electronico"    
                        />
                        <button
                            className="bg-black text-white font-semibold rounded-full uppercase tracking-wider py-3 text-xs xl:px-5"
                        >Suscribete</button>
                    </form>
                </div>

            </div>
        </div>        
    );
  };