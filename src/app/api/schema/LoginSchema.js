// schemas/loginSchema.js
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    username: z.string().min(3,"Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters")
});