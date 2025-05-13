//usado para formularios o peticiones post put / peticiones delete, 

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { singUp } from "../../actions"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRegister = () => {
    const navigate = useNavigate(); // instancia de useNavigate para redirigir al usuario
    const queryClient = useQueryClient();// instancia de queryClient para invalidar la cache

    const { mutate,isPending } = useMutation({
        mutationFn: singUp, // funcion para registrar al usuario
        onSuccess: () => {
            //cuando la mutacion es exitosa aqui se redirige al usuario a la pagina de inicio
            queryClient.invalidateQueries({ queryKey: ["user"] }) // invalidar la cache de la consulta de usuario
            navigate("/"); // redirige a la pagina de inicio
        },
        onError: (errors) => {
            //cuando la mutacion falla aqui se maneja el error
            toast.error(errors.message,{
                // configuracion de la notificacion del error
                position: "bottom-right",
                duration: 3000,
                style: {
                    backgroundColor: "#f44336",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                },
            }); 
        },

    })
    return{
        mutate,
        isPending,
    }

}