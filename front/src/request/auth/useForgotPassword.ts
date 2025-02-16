import { useMutation } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";

export const useForgotPassword = () => {
  const { toast } = useToast();

  return useMutation(
    async (email: string) => {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          title: "E-mail de recuperação enviado",
          message: "Verifique seu e-mail para redefinir a senha",
          type: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao enviar e-mail de recuperação",
          message: error.response?.data?.message || "Erro desconhecido",
          type: "error",
        });
      },
    }
  );
};
