import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useGlobalStore } from "../../store/global.store";
import { IoMdClose } from "react-icons/io";
import { formatPrice } from "../../helpers";
import { searchProducts } from "../../actions";
import { Product } from "../../interface";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const closeSheet = useGlobalStore((state) => state.closeSheet);

  
  const navigate = useNavigate();
  //funcion para navegar a la pagina del producto 
  const handleShearch = async (e: React.FormEvent) => {
    e.preventDefault();
    //para quitar espacios innecesarios
    if (searchTerm.trim()) {
      if (searchTerm.trim()) {
        const products = await searchProducts(searchTerm);
        setSearchResults(products); //se setea el producto de la base de datos
      }
    } 
  }; 

  return (
    <>
      <div className="flex py-5 px-7 gap-10 items-center border-b border-slate-200">
        <form
          className="flex gap-3 items-center flex-1"
          onSubmit={handleShearch}
        >
          <HiOutlineSearch size={22} />
          <input
            type="text"
            placeholder="¿Que busca?"
            className="outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-black" />
        </button>
      </div>

      {/*mostrara el resultado de la busqueda */}
      <div className="p-4">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product) => (
              <li className="py-4 group " key={product.id}>
                <button onClick={() =>{
                  navigate(`/medicamentos/${product.slug}`);
                  closeSheet();
                }} className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-25 w-25 object-contain p-2 bg-slate-100 rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold group-hover:underline">
                      {product.name}
                    </p>
                    <p className="text-[13px] text-gray-600">
                      {product.variants[0].storage}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {formatPrice(product.variants[0].price)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600"> No se encontro el producto</p>
        )}
      </div>
    </>
  );
};
