import { z } from "zod";

export const editProfileSchema = z.object({
  description: z.string(),
});
