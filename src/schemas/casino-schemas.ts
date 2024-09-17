import { z } from "zod";

export const highCardSchema = z.object({
  bet_amount: z.coerce
    .number()
    .int()
    .positive({ message: "Bet amount must be positive" })
    .lte(500, { message: "Bet cannot exceed 500 coins" }),
});
