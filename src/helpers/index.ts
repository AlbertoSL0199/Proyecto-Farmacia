import { Color, Product, VariantsProduct } from "../interface";

//funcion para formatear los precios
export const formatPrice =(price:number) => {
    return new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
};



//funcion para preparar los productos
export const prepareProducts = (products: Product[]) => {
  return products.map((product) => {
    //agrupar las variantes
    const colors = product.variants.reduce((acc: Color[ ], variant: VariantsProduct) => {
      const existingColor = acc.find((item) => item.color === variant.color);

      if (existingColor) {
        existingColor.price = Math.min(existingColor.price, variant.price);
      } //mantenemos el precio minimo
      else {
        acc.push({
          color: variant.color,
          price: variant.price,
          name: variant.color_name,
        });
      }
      return acc;
    }, []);

    //obtener el precio mas bajo de las variantes agrupadas
    const price = Math.min(...colors.map(item => item.price));

    //devolver el producto formateado 
    return{
        ...product,
        price,
        colors : colors.map(({name,color}) => ({name,color})),
        variants: product.variants

    }
  });
};

//funcion para formatear la fecha a formato  dia mes año
export const formatDateLong = (date: string) : string =>{
  const dateObject = new Date (date);

  return dateObject.toLocaleDateString("es-ES", {
    year:"numeric",
    month: "long",
    day: "numeric",
  } )
}

//funcion para formatear la fecha a formato  dd/mm/yyyy
export const formatDateShort = (date: string) : string =>{
  const dateObject = new Date (date);

  return dateObject.toLocaleDateString("es-ES", {
    year:"numeric",
    month: "2-digit",
    day: "numeric",
  } )
}

//funcion para obtener el estado del pedido en español
export const getStatus = (status: string) : string => {
  //se podria obiar al ingresar datos en español
  switch (status){
    case "Pending":
      return "Pendiente"; 
    case "Paid":
      return "Pagado"; 
    case "Shipped":
      return "Enviado"; 
    case "Delivered":
      return "Entregado"; 
    default: return status;
  }
}

//funcion para generar el slug
export const generateSlug =( name:string ):string => {
  return name
    .toLowerCase()
    //acepta letras a-z, numeros y remplaza los espacios con -
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/(^-|-$)+/g,"");
}