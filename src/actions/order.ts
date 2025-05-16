import { OrderInput } from "../interface";
import { supabase } from "../supabase/client";

export const createOrder = async (order: OrderInput) => {
  //obtener el usuario autenticado + cliente de tabla customer
  const { data, error: errorUser } = await supabase.auth.getUser(); //obtiene el usuario autenticado
  if (errorUser) {
    console.error(errorUser); //maneja el error
    throw new Error(errorUser.message); //lanza el error
  }

  const userId = data.user.id; //obtiene el id del usuario autenticado
  const { data: customer, error: errorCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", userId)
    .single(); //obtiene el cliente de la tabla customer

  if (errorCustomer) {
    console.error(errorCustomer); //maneja el error
    throw new Error(errorCustomer.message); //lanza el error
  }

  const customerId = customer.id; //obtiene el id del cliente

  //Verificar el stock de los productos
  for (const item of order.cartItems) {
    const { data: variantData, error: variantError } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single(); //obtiene el producto de la tabla products

    if (variantError) {
      console.error(variantError); //maneja el error
      throw new Error(variantError.message); //lanza el error
    }

    if (variantData.stock < item.quantity) {
      throw new Error("No hay suficiente stock para el producto");
    }
  }

  //guardar la direccion de envio
  const { data: addressData, error: addressError } = await supabase
    .from("addresses")
    .insert({
      //se insertan los datos de la direccion exactamente como se encuentran en la tabla
      address_line1: order.address.addressLine1,
      address_line2: order.address.addressLine2,
      state: order.address.state,
      city: order.address.city,
      postal_code: order.address.postalCode,
      country: order.address.country,
      customer_id: customerId,
    })
    .select() //obtiene la direccion de envio
    .single(); //obtiene la direccion de envio de la tabla addresses
  if (addressError) {
    console.error(addressError); //maneja el error
    throw new Error(addressError.message); //lanza el error
  }

  //guardar la orden
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      //se insertan los datos de la orden exactamente como se encuentran en la tabla
      customer_id: customerId,
      addres_id: addressData.id,
      total_amount: order.totalAmount,
      status: "Pending",
    })
    .select() //obtiene la orden de la tabla orders
    .single(); //obtiene la orden de la tabla orders

  if (orderError) {
    console.error(orderError); //maneja el error
    throw new Error(orderError.message); //lanza el error
  }

  //guardar los items de la orden
  const orderItems = order.cartItems.map((item) => ({
    //retorna de forma implicita los items de la orden_items
    order_id: orderData.id,
    variant_id: item.variantId,
    quantity: item.quantity,
    price: item.price,
  }));

  //insertar los items de la orden en la tabla order_items
  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems); //inserta los items de la orden en la tabla order_items

  if (orderItemsError) {
    console.error(orderItemsError); //maneja el error
    throw new Error(orderItemsError.message); //lanza el error
  }

  //actualizar el stock de los productos_variants
  for (const item of order.cartItems) {
    //obtiene el stock de los productos_variants actualizados
    const { data: variantData } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId) //verifica si el id del producto es igual al id del producto
      .single(); //obtiene el producto de la tabla products

    if (!variantData) {
      throw new Error("No se encontro la variante"); //lanza el error
    }

    const newStock = variantData.stock - item.quantity; //calcula el nuevo stock
    //actualiza el stock de los productos_variants
    const { error: updateStockError } = await supabase
      .from("variants")
      .update({ stock: newStock }) //actualiza el stock de los productos_variants
      .eq("id", item.variantId); //verifica si el id del producto es igual al id del producto

    if (updateStockError) {
      console.error(updateStockError); //maneja el error
      throw new Error("No se actualizo el stock de la variante"); //lanza el error
    }
  }

  return orderData; //retorna la orden
};

export const getOrdersByCustomerId = async () => {
  //llamar ordenes individuales por cada cliente
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const { data: customer, error: errorCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", data.user.id)
    .single(); //obtiene el cliente de la tabla customer

  if (errorCustomer) {
    console.error(errorCustomer); //maneja el error
    throw new Error(errorCustomer.message); //lanza el error
  }

  const customerId = customer.id; //obtiene el id del cliente

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at")
    .eq("customer_id", customerId)
    .order("created_at", {
      ascending: false,
    });

  if (ordersError) {
    console.error(ordersError); //maneja el error
    throw new Error(ordersError.message); //lanza el error
  }

  return orders;
};

export const getOrdersById = async (orderId: number) => {
  //llamar ordenes individuales por cada cliente
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const { data: customer, error: errorCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", data.user.id)
    .single(); //obtiene el cliente de la tabla customer

  if (errorCustomer) {
    console.error(errorCustomer); //maneja el error
    throw new Error(errorCustomer.message); //lanza el error
  }

  const customerId = customer.id; //obtiene el id del cliente

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      "* , addresses(*), customers(full_name, email),order_items(quantity,price, variants(storage, products(name,images)))"
    )
    .eq("customer_id", customerId)
    .eq("id", orderId)
    .single();

  if (orderError) {
    console.error(orderError); //maneja el error
    throw new Error(orderError.message); //lanza el error
  }

  return {
    //datos del cliente
    customer: {
      email: order?.customers?.email,
      full_name: order.customers?.full_name,

    },
    total_amount: order.total_amount,
    status: order.status,
    address: {
      addressLine1: order.addresses?.address_line1,
      addressLine2: order.addresses?.address_line2,
      city: order.addresses?.city,
      state: order.addresses?.state,
      postalCode: order.addresses?.postal_code,
      country: order.addresses?.country,
    },
    orderItems : order.order_items.map(item => ({
        quantity: item.quantity,
        price: item.price,
        storage: item.variants?.storage,
        productName: item.variants?.products?.name,
        productImages: item.variants?.products?.images[0],
    }))
  };
};
