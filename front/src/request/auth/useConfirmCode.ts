import { useMutation } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
export const useConfirmCode = () => {
  const { toast } = useToast();

  return useMutation(
    async (data: {
      resetCode: string;
      email: string;
    }) => {
      const response = await api.post("/auth/confirm-code", data);
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Código confirmado",
          message: "Você pode agora redefinir sua senha",
          type: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao confirmar código",
          message: error.response?.data?.message || "Erro desconhecido",
          type: "error",
        });
      },
    }
  );
};
