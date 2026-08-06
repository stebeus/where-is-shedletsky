import * as z from 'zod';

const alphanumericRegex = /^\w+$/;

export const userSchema = z.object({
	id: z.int().positive(),
	username: z
		.string()
		.trim()
		.min(1, 'Username is required')
		.max(50, 'Username cannot be longer than 50 characters')
		.regex(alphanumericRegex, 'Username must only contain alphanumeric characters'),
	password: z.string().trim().min(8, 'Password must be at least 8 characters long'),
	bestTime: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const newUserSchema = userSchema.pick({ username: true, password: true, bestTime: true });

export const userUpdateSchema = userSchema.pick({ username: true, bestTime: true });

export type User = z.infer<typeof userSchema>;

export type NewUser = z.infer<typeof newUserSchema>;

export type UserUpdate = z.infer<typeof userUpdateSchema>;
