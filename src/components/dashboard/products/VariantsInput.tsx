import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { ProductFormValues } from "../../../lib/validator";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
  control: Control<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
}
const headersVariants = ["Stock", "Precio", "Capacidad", ""];

export const VariantsInput = ({ control, errors, register }: Props) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "variants",
  });

  const removeVariant = (index: number) => {
    remove(index);
  };

  const addVariant = () => {
    append({
      stock: 0,
      price: 0,
      storage: "",
    });
  };

  const getFirstError = (
    variantErros: FieldErrors<ProductFormValues["variants"][number]>
  ) => {
    if (variantErros) {
      const keys = Object.keys(variantErros) as (keyof typeof variantErros)[];
      if (keys.length > 0) {
        return variantErros[keys[0]]?.message;
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="grid grid-cols-4 gap-4 justify-start">
          {headersVariants.map((header, index) => (
            <p key={index} className="text-xs font-medium text-sky-800">
              {header}
            </p>
          ))}
        </div>
        {fields.map((fields, index) => (
          <div key={fields.id}>
            <div className="grid grid-cols-4 gap-4 items-center">
              <input
                type="number"
                placeholder="Stock"
                {...register(`variants.${index}.stock`, {
                  valueAsNumber: true,
                })}
                className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"
              />

              <input
                type="number"
                step="0.05"
                placeholder="Precio"
                {...register(`variants.${index}.price`, {
                  valueAsNumber: true,
                })}
                className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"
              />

              <input
                type="text"
                placeholder="Capacidad del medicamento"
                {...register(`variants.${index}.storage`)}
                className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="p-1"
                >
                  <IoIosCloseCircleOutline size={20} />
                </button>
              </div>
            </div>

            {errors.variants && errors.variants[index] && (
              <p className="text-red-500 text-xs mt-1">
                {getFirstError(errors.variants[index])}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        typeof="button"
        onClick={addVariant}
        className="px-4 py-2 text-slate-800 rounded-md text-sm font-semibold tracking-tight flex items-center gap-1 self-center hover:bg-slate-100"
      >
        <IoIosAddCircleOutline size={16} />
        Añadir Variante
      </button>
      {fields.length === 0 && errors.variants && (
        <p className="text-red-500 text-xs mt-1">
          Debes añadir al menos una variante
        </p>
      )}
    </div>
  );
};
