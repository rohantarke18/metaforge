    import { z } from "zod";

export const AppSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  config: z.any(),
});