import { API_URL } from '$env/static/private';

export function login(email: string, password: string): Promise<Response> {
	return fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
}
