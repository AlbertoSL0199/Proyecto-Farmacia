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
