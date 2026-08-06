import * as z from 'zod';

export const userSchema = z.object({
	id: z.int().positive(),
	username: z.string(),
	password: z.string(),
	bestTime: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const newUserSchema = userSchema.pick({ username: true, password: true, bestTime: true });

export const userUpdateSchema = userSchema.pick({ username: true, bestTime: true });

export type User = z.infer<typeof userSchema>;

export type NewUser = z.infer<typeof newUserSchema>;

export type UserUpdate = z.infer<typeof userUpdateSchema>;
