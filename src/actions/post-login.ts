import { LoginInput } from "@/types/authorization.types";
import api from "@/utils/api";

export const login = async (data: LoginInput) => {
  const response = await api.post("/auth/login/", data);
  return response.data;
};
