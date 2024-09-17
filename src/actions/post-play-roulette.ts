import { Roulette, TBetRoulette } from "@/types/casino.types";
import api from "@/utils/api";

type Props = {
  bet_amount: number;
  bet: TBetRoulette;
  number?: number;
};
export const postPlayRoulette = async (data: Props): Promise<Roulette> => {
  const response = await api.post("/casino/roulette/", data);
  return response.data;
};
