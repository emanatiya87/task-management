import z from "zod";
const today = new Date();
today.setHours(0, 0, 0, 0);
export const taskSchema = z.object({
  title: z.string().min(3, "the title should be min 3 chars"),
  description: z.string().max(500).optional(),
  assignee_id: z.string().optional(),
  due_date: z
    .string()
    .refine((value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Deadline must be today or in the future")
    .optional(),
  epic_id: z.string().optional(),
  status: z.string(),
});
export type TaskInputs = z.infer<typeof taskSchema>;
