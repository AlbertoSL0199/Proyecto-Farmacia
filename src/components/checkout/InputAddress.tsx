import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddressFormValues } from "../../lib/validator";

interface Props {
  // Define any props you need here
  register: UseFormRegister<AddressFormValues>;
  errors: FieldErrors<AddressFormValues>;

  name: keyof AddressFormValues;
  className?: string;
  placeholder: string;
}

export const InputAddress = ({
  //desestructura los props
  register,
  errors,
  name,
  className,
  placeholder,
}: Props) => {
  return (
    <>
      <div
        className={`border border-slate-200 rounded-md overflow-hidden py-2 ${
          errors[name] && "border-red-500"
        } ${className}`}
      >
        <input
          type="text"
          className="w-full px-3 py-1 text-sm focus:outline-none"
          placeholder={placeholder}
          {...register(name)} //registra el input
        />
      </div>
      {errors[name] && (
        <p className="text-red-500">{errors[name].message}</p> //verifica si hay errores
      )}
    </>
  );
};
