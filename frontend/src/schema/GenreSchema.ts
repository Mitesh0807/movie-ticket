import { z } from 'zod';

export const GenreSchema=z.object({
    name: z
    .string().
    min(3,{message: 'Please Enter name'}),
    description: z
    .string()
    .min(3,{message: 'Password should be at least 3 characters'})
    .optional()
})