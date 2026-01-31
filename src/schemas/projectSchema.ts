import z from "zod";
export const projectSchema = z.object({
  name: z.string().min(3),
  description: z.string().max(500).optional(),
});
export type projectInput = z.infer<typeof projectSchema>;
