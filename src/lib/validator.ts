import { z } from "zod";
import type { JSONContent } from "@tiptap/core";

const isContentEmpty = (value: JSONContent): boolean => {
  if (!value || !Array.isArray(value.content) || value.content.length == 0) {
    return true;
  }
  return !value.content.some(
    //generamos comprobaciones
    (node) =>
      node.type === "paragraph" &&
      node.content &&
      Array.isArray(node.content) &&
      node.content.some(
        (textNode) =>
          textNode.type === "text" &&
          textNode.type &&
          textNode.text?.trim() !== ""
      )
  );
};

// Definicion del esquema de validacion para el registro de usuario
export const userRegisterSchema = z.object({
  // definicion del esquema de validacion
  email: z.string().email({ message: "Correo electronico no valido" }), // valida el correo electronico
  password: z
    .string()
    .min(12, { message: "La contraseña debe tener al menos 12 caracteres" }), // valida la contraseña
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }), // valida el nombre
  phone: z.string().optional(), // valida el telefono
});

export const addressSchema = z.object({
  // definicion del esquema de validacion
  addressLine1: z
    .string()
    .min(1, { message: "La direccion es requerida" })
    .max(100, { message: "La direccion no debe exceder los 100 caracteres" }), // valida la direccion

  addressLine2: z
    .string()
    .max(100, { message: "La direccion no debe exceder los 100 caracteres" })
    .optional(), // valida la direccion
  city: z
    .string()
    .min(1, { message: "La ciudad es requeridas" }) // valida la ciudad
    .max(50, { message: "La ciudad no debe exceder los 50 caracteres" }),
  state: z
    .string()
    .min(1, { message: "El estado es requerida" }) // valida el estado
    .max(50, { message: "El estado  no debe exceder los 50 caracteres" }),
  postalCode: z
    .string()
    .max(10, { message: "El codigo postal no debe exceder los 10 caracteres" })
    .optional(), // valida el codigo postal
  country: z.string().min(1, { message: "El pais es requerido" }), // valida el pais
});

export const productSchema = z.object({
  // definicion del esquema de validacion
  name: z.string().min(1, { message: "El nombre del producto es obligatorio" }),
  brand: z
    .string()
    .min(1, { message: "La categoria del producto es obligatoria" }),
  slug: z
    .string()
    .min(1, { message: "El slug del producto es requerido" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalido"),
  features: z.array(
    z.object({
      value: z
        .string()
        .min(1, { message: "La caracteristica no pueden estar vacia" }),
    })
  ),
  description: z.custom<JSONContent>((value) => !isContentEmpty(value), {
    message: "La descripción no puede estar vacia",
  }),
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
        stock: z.number().min(1, "El stock debe ser mayor a 0"),
        price: z.number().min(0.01, "El precio debe ser mayor a 0"),
        storage: z.string().min(1, "La capacidad del producto es requerida"),
      })
    )
    .min(1, "Debe haber al menos una variante"),

  images: z
    .array(z.any())
    .min(1, { message: "Debe haber al menos una imagen" }),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>; // infiere el tipo de dato del esquema de validacion
export type AddressFormValues = z.infer<typeof addressSchema>; // infiere el tipo de dato del esquema de validacion
export type ProductFormValues = z.infer<typeof productSchema>; // infiere el tipo de dato del esquema de validacion
