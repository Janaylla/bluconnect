import { useMutation } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";

export const useResetPassword = () => {
  const { toast } = useToast();

  return useMutation(
    async (data: {
      resetCode: string; newPassword: string,
      email: string;
    }) => {
      const response = await api.post("/auth/reset-password", data);
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Senha redefinida com sucesso",
          message: "Você pode agora fazer login com sua nova senha",
          type: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao redefinir senha",
          message: error.response?.data?.message || "Erro desconhecido",
          type: "error",
        });
      },
    }
  );
};
