import api from "@/utils/api";

export const postConfirmMeeting = async (id: number) => {
  const response = await api.post(`/meetings/${id}/confirm/`);
  return response.data;
};
