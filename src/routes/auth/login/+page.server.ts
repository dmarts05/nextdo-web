import { login } from '$lib/server/api/auth.js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, { message: 'Password is required' })
		.max(255, { message: 'Password is too long' })
		.trim(),
});

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const { email, password } = loginSchema.parse(formData);
			const res = await login(email, password);
			if (res.ok) {
				return redirect(303, '/app');
			} else {
				return fail(400, { message: 'Invalid email or password' });
			}
		} catch (err) {
			const { email } = formData;
			if (err instanceof z.ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, { data: { email }, errors });
			} else {
				return fail(500, { message: 'Server unavailable, please try again later' });
			}
		}
	},
};
