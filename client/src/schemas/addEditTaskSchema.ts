import { z } from "zod";

export const addTaskSchema = z.object({
    title: z.string().nonempty({message: "*Title is required"})
})

export const updateTaskSchema = z.object({
    title:z.string().nonempty({message: "*Title is required"})
})

export type AddTaskValues = z.infer<typeof addTaskSchema>;
export type UpdateTaskValues = z.infer<typeof updateTaskSchema>;