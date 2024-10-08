import { RegisterInput } from "@/types/authorization.types";
import api from "@/utils/api";

export const register = async (data: RegisterInput) => {
  const response = await api.post("/auth/register/", data);
  return response.data;
};
