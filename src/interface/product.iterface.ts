import { JSONContent } from "@tiptap/react";

export interface Color {
  name: string;
  color: string;
  price: number;
}

export interface VariantsProduct {
    id: string;
    stock: number;
    price: number;
    storage: string;
    color: string;
    color_name: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  features: string[];
  description: JSONContent;
  images: string[];
  created_at: string;
  variants: VariantsProduct[];
}
export interface PreparedProducts {
  id: string;
  name: string;
  brand: string;
  slug: string;
  features: string[];
  description: JSONContent;
  images: string[];
  created_at: string;
  price: number;
  colors: {
    name: string;
    color: string;
  }[],
  variants: VariantsProduct[];
}
