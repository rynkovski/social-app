import { z } from "zod";

export const meetingSchema = z.object({
  participants: z
    .array(z.number())
    .min(3, "Please select at least 3 participants."),
  date: z.date({
    required_error: "Please select a date.",
  }),
  place_name: z.string({ required_error: "Please select a place." }),
  description: z.string(),
});
