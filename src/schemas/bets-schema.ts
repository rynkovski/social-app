import { z } from "zod";

export const betsSchema = z.object({
  text: z.string({ required_error: "Please enter a bet title." }),
  label_1: z
    .string({ required_error: "Please enter a bet label." })
    .max(50, { message: "Label cannot exceed 50 characters" }),
  label_2: z
    .string({ required_error: "Please enter a bet label." })
    .max(50, { message: "Label cannot exceed 50 characters" }),
  deadline: z.date({
    required_error: "Please select a deadline.",
  }),
  ratio_1: z.coerce
    .number()
    .gte(1.05, "Minimum ratio is 1.05")
    .lte(3, "Maximum ratio is 3")
    .optional(),
  ratio_2: z.coerce
    .number()
    .gte(1.05, "Minimum ratio is 1.05")
    .lte(3, "Maximum ratio is 3")
    .optional(),
});

export const betVoteSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: "Bet amount must be positive" }),
  vote: z.string(),
});
