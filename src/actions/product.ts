import { supabase } from "../supabase/client";

export const getProducts = async (page: number) => {
  const itemsPerPage = 9;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data: products, error,count } = await supabase
    .from("products")
    .select("*, variants(*)", {count:"exact"})
    .order("created_at", { ascending: false }).range(from,to);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return {products,count};
};

export const getFilteredProducts = async ({
  page = 1,
  brands = [],
}: {
  page: number;
  brands: string[];
}) => {
  const itemsPerPage = 9;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select("*, variants(*)", { count: "exact" })
    //.eq("brand", "prueba")
    .order("created_at", { ascending: false })
    .range(from, to);

  //validacion de filtros
  if (brands.length > 0) {
    query = query.in("brand", brands);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return { data, count };
};

export const getRecentProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return products;
};

export const getRandomProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .limit(20);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  //se randoriza 4 productos

  const randomProducts = products
    .sort(() => 0.5 - Math.random()) //sortea de los 20 productos cargados
    .slice(0, 4);

  return randomProducts;
};

export const getProductByslug = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
};

export const searchProducts = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*,variants(*)")
    .ilike("name", `%${searchTerm}%`); //buscador de productos cuyo nbombre contenga el termino de busqueda

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    return data;
};
