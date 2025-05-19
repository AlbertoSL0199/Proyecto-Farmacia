import { supabase } from "../supabase/client";

interface IAuthLogi {
  // interface for login
  email: string;
  password: string;
}
interface IAuthRegister {
  // interface for register
  name: string;
  phone?: string;
  email: string;
  password: string;
}

export const singUp = async ({
  name,
  phone,
  email,
  password,
}: IAuthRegister) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      // register user
      email,
      password,
    });

    if (error) {
      // check for error
      throw new Error("Error al registrar el usuario");
    }
    const userId = data.user?.id; // get user id
    if (!userId) {
      throw new Error("Error al obtener el id del usuario"); // check for user id
    }

    //autenticar al usuario
    const { error: sigInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (sigInError) {
      console.log(sigInError);
      throw new Error("Correo electronico o contraseña incorrectos");
    }

    // insertar los datos del usuario en la tabla customers
    const { error: customerError } = await supabase.from("customers").insert({
      //colocar los datos del usuario las como la tabla customers
      user_id: userId,
      full_name: name,
      phone,
      email,
    });

    if (customerError) {
      console.log(customerError);
      throw new Error("Error al registrar los datos del usuario");
    }

    // insertar el rol del cliente (customer)
    const { error: roleError } = await supabase.from("user_role").insert({
      user_id: userId,
      role: "customer",
    });
    if (roleError) {
      console.log(roleError);
      throw new Error("Error al registrar al usuario");
    }

    return data;
  } catch (error) {
    console.log(error);
    // Manejo de errores
    throw new Error("Error al registrar el usuario");
  }
};

export const signIn = async ({ email, password }: IAuthLogi) => {
  try {
    // Iniciar sesión con el correo electrónico y la contraseña
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      throw new Error("Correo electronico o contraseña incorrectos");
    }
    return data;
  } catch (error) {
    console.log(error);
    // Manejo de errores
    throw new Error("Error al iniciar sesión");
  }
};

export const signOut = async () => {
  try {
    // Cerrar sesión
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      throw new Error("Error al cerrar sesión");
    }
  } catch (error) {
    console.log(error);
    // Manejo de errores
    throw new Error("Error al cerrar sesión");
  }
};
export const getSession = async () => {
  try {
    // Obtener la sesión actual
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
      throw new Error("Error al obtener la sesión");
    }
    return data;
  } catch (error) {
    console.log(error);
    // Manejo de errores
    throw new Error("Error al obtener la sesión");
  }
};

export const getUserData = async (userId: string) => {
  
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error) {
      console.log(error);
      throw new Error("Error al obtener el usuario");
    }
    return data;
};
