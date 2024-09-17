import api from "@/utils/api";

export const postQuestRedeem = async () => {
  const response = await api.post("/quests/redeem/");
  return response.data;
};
