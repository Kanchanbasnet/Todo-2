import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "*Email is required." })
    .email({ message: "Invalid email format." }),
  password: z
    .string()
    .nonempty({ message: "*Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type LoginValues = z.infer<typeof loginSchema>;