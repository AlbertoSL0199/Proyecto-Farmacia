import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../../actions";
import { useNavigate } from "react-router-dom"; //hacer redirecciones
import toast from "react-hot-toast";

export const useCreateOrders = () => {
  const queryClient = useQueryClient(); // Obtiene la instancia del cliente de queries para manipular el cache manualmente
  const navigate = useNavigate(); //redirecciona links

  const { mutate, isPending } = useMutation({
    // Configura una mutación con React Query
    mutationFn: createOrder, // Esta es la función que se ejecutará cuando se llame a mutate()
    onSuccess: (data) => {
      // Esta función se ejecuta automáticamente si la mutación fue exitosa
      //recibe la data de createOrder anexada a la bd cuando la peticion sea exitosa ejecutara la invalidacion de querys
      // para forzar un refetch y mantener datos actualizados
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      //redirecciona
      navigate(`/checkout/${data.id}/thank-you`);
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  // Retorna la función mutate (para disparar la mutación) y isPending (estado de carga)

  return {
    mutate,
    isPending,
  };
};
