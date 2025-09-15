import type {Actions} from "./$types";
import {fail, redirect} from "@sveltejs/kit";

export const actions = {
    login: async ({request, fetch, cookies}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const mutation = `
            mutation SignIn($email: String!, $password: String!) {
                signIn(
                    signInInput: {
                        email: $email
                        password: $password
                    }
                ) {
                    accessToken
                    refreshToken
                }
            }
        `;

        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { email, password }
            })
        });

        const result = await response.json();

        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            return fail(400, { error: result.errors[0].message });
        }

        const {accessToken, refreshToken} = result.data.signIn;
        cookies.set('access_token', accessToken, {
            path: '/',
            secure: false,
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'strict'
        });
        cookies.set('refresh_token', refreshToken, {
            path: '/',
            secure: false,
            maxAge: 30 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'strict'
        })

        throw redirect(303, '/tasks');
    }
} satisfies Actions;