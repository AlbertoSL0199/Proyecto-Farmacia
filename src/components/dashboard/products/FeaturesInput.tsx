import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { ProductFormValues } from "../../../lib/validator";
import { useState } from "react";

interface Props {
  control: Control<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export const FeaturesInput = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const handelAddFeature = () => {
    if (newFeature.trim() === "") return;

    append({ value: newFeature });
    setNewFeature("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handelAddFeature();
    }
  };

  const [newFeature, setNewFeature] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold tracking-tight capitalize text-slate-900">
        Caracteristicas:
      </label>
      <ul className="space-y-3 pl-5">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="bg-slate-500 h-2 w-2 rounded-full" />
              <span className="text-sm text-slate-600 font-medium">
                {field.value}
              </span>
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-red-500 font-bold pr-2 hover:scale-110"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Medicamento hecho para ..."
        autoComplete="off"
        className={`border border-gray-300 py-1.5 text-sm rounded-md px-3 font-medium tracking-tighter text-slate-600 outline focus:outline-none ${
          errors.features ? "border-red-500" : ""
        }`}
        value={newFeature}
        onChange={(e) => setNewFeature(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {
        errors.features && (
            <p className="text-red-500 text-xs mt-1">
                {errors.features.message}
            </p>
        )
      }
    </div>
  );
};
