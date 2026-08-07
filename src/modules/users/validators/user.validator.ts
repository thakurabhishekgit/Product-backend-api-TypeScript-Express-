import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().trim().min(2).max(100),
    lastName: z.string().trim().min(2).max(100),
    email: z.email(),
    password: z.string().min(8).max(100),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
    role: z.enum(["ADMIN", "EMPLOYEE"]).optional(),
});
