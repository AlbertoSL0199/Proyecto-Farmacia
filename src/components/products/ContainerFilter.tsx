import { Separator } from "../shared/Separator";

const availableBrands = [
  /*debe de tener el mismo nombre que en la base de datos
      establecer por tipos
    */
  "Alergia",
  "Antitabaco",
  "Control de Peso",
  "Cuidado Bucal",
  "Dolor y Fiebre",
  "Lubricantes",
  "Picaduras Repelentes Insectos",
  "Vitaminas",
];

interface Props {
  selecteBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
}

export const ContainerFilter = ({ selecteBrands, setSelectedBrands }: Props) => {
  const handleBrandChange = (brand: string) => {
    if (selecteBrands.includes(brand)) {
      setSelectedBrands(selecteBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selecteBrands, brand]);
    }
  };

  return (
    <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1">
      <h3 className="font-semibold text-2xl mb-4">Filtros</h3>
      {/*separador */}
      <Separator />
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-medium text-black">Categorías</h3>

        <div className="flex flex-col gap-2">
          {availableBrands.map((brand) => (
            <label key={brand} className="inline-flex items-center">
              <input
                type="checkbox"
                className="text-black border-black focus:ring-black accent-black"
                checked={selecteBrands.includes(brand)}
                onChange={()=> handleBrandChange(brand)}
              />
              <span className="ml-2 text-black text-sm cursor-pointer">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
