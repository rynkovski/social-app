import api from "@/utils/api";
type Props = {
  quest: number;
};
export const postQuestStart = async (data: Props) => {
  const response = await api.post("/quests/start/", data);
  return response.data;
};
