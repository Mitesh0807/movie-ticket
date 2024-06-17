import { z } from "zod";


export const SignupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please Enter Email" })
    .email("Please Enter Valid Email"),
  password: z
    .string()
    .min(3, { message: "Password should be at least 3 characters" })
    .max(20),
  username: z
    .string()
    .min(1, { message: "Please Enter Username" })
    .max(20),
  fullName: z
    .string()
    .min(1, { message: "Please Enter Full Name" })
    .max(20),
    phoneNumber: z
    .string()
    .min(1, { message: "Please Enter Phone Number" })
    .max(20),
});
