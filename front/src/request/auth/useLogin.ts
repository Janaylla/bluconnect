import { useMutation } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";

export const useLogin = () => {
  const { toast } = useToast();

  return useMutation(
    async (data: { email: string; password: string }) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast({
          title: "Login realizado com sucesso",
          message: "Você foi autenticado com sucesso",
          type: "success",
        });
        console.log(data);
        //Guarda o token no localStorage
        localStorage.setItem("token", data.access_token);
        window.location.href = "/";

      },
      onError: (error: any) => {
        toast({
          title: "Erro ao fazer login",
          message: error.response?.data?.message || "Erro desconhecido",
          type: "error",
        });
      },
    }
  );
};
