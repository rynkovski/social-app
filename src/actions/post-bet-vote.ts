import { MetaBet } from "@/types/bets.types";
import api from "@/utils/api";
type Props = {
  amount: number;
  vote: string;
};
export const postBetVote = async ({
  id,
  data,
}: {
  id: number;
  data: Props;
}): Promise<MetaBet> => {
  const response = await api.post(`/bets/${id}/vote/`, data);
  return response.data;
};
