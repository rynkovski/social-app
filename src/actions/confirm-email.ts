import api from "@/utils/api";

export const confirmEmail = async (key: string) => {
  const response = await api.post(`/auth/account-confirm-email/${key}/`);
  return response.data;
};
