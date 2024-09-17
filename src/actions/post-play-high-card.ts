import { HighCard } from "@/types/casino.types";
import api from "@/utils/api";

type Props = {
  bet_amount: number;
  bet: "low" | "high" | "equal";
};
export const postPlayHighCard = async (data: Props): Promise<HighCard> => {
  const response = await api.post("/casino/high_card/", data);
  return response.data;
};
