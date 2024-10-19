import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "*Email is required." })
    .email({ message: "Invalid email format." }),
  name: z.string().nonempty({ message: "*Name is required." }),
  address: z.string().nonempty({ message: "*Address is required." }),
  password: z
    .string()
    .nonempty({ message: "*Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
