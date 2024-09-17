import api from "@/utils/api";

export const redeemDailyCoins = async () => {
  const response = await api.post("/users/redeem_daily_coins/");
  return response.data;
};
