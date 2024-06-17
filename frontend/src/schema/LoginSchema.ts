import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string().
    min(1,{message: 'Please Enter Email'})
    .email("Please Enter Valid Email"),
  password: z
    .string()
    .min(3,{message: 'Password should be at least 3 characters'})
    .max(20)
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;