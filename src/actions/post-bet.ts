import { BetAdd } from "@/types/bets.types";
import api from "@/utils/api";
type Props = BetAdd & {
  ratio_1: number;
  ratio_2: number;
  created_at: string;
};
export const postBet = async (data: BetAdd): Promise<Props> => {
  const response = await api.post("/bets/", data);
  return response.data;
};
