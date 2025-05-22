import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductFormValues, productSchema } from "../../../lib/validator";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SectionFormProducts } from "./SectionFormProducts";
import { InputForm } from "./InputForm";
import { FeaturesInput } from "./FeaturesInput";
import { useEffect } from "react";
import { generateSlug } from "../../../helpers";
import { VariantsInput } from "./VariantsInput";
import { UploaderImages } from "./UploaderImages";
import { Editor } from "./Editor";

interface Props {
  titleForm: string;
}
export const FormProducts = ({ titleForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });
  const navigate = useNavigate(); //linkear
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const watchName = watch("name");

  useEffect(() => {
    if (!watchName) return;

    const generatedSlug = generateSlug(watchName);
    setValue("slug", generatedSlug, { shouldValidate: true });
  }, [watchName, setValue]);
  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:scale-105"
          >
            <IoIosArrowBack
              size={18}
              className="transition-all group-hover:scale-125"
            />
          </button>
          <h2 className="font-bold tracking-tight text-2xl capitalize">
            {titleForm}
          </h2>
        </div>
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1"
        onSubmit={onSubmit}
      >
        <SectionFormProducts
          titleSection="Detalles del Producto"
          className=" lg:col-span-2 lg:row-span-2"
        >
          <InputForm
            type="text"
            placeholder="Ejemplo: Medicamento 1"
            label="nombre"
            name="name"
            register={register}
            errors={errors}
            required={true}
          />
          <FeaturesInput control={control} errors={errors} />
        </SectionFormProducts>

        <SectionFormProducts>
          <InputForm
            type="text"
            placeholder="medicamento_1"
            label="Slug"
            name="slug"
            register={register}
            errors={errors}
          />
          <InputForm
            type="text"
            placeholder="Escriba la Categoria"
            label="Categoria"
            name="brand"
            register={register}
            errors={errors}
            required
          />
        </SectionFormProducts>

        <SectionFormProducts
          titleSection="Variantes del Producto"
          className="lg:col-span-2 h-fit"
        >
          <VariantsInput
            control={control}
            errors={errors}
            register={register}
          />
        </SectionFormProducts>

        <SectionFormProducts titleSection="Imagenes del producto">
          <UploaderImages errors={errors} setValue={setValue} watch={watch} />
        </SectionFormProducts>

        <SectionFormProducts
          titleSection="Descripción del Producto"
          className="col-span-full "
        >
          <Editor setValue={setValue} errors={errors} />
        </SectionFormProducts>

        <div className=" flex gap-3 absolute top-0 right-0">
          <button
            className="btn-secondary-outline"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button className="btn-primary" type="submit">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};
