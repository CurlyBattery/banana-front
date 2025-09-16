import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies, fetch }) => {
    const refreshToken = cookies.get('refresh_token');

    if (refreshToken) {
        await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `refresh_token=${refreshToken}`
            },
            body: JSON.stringify({ query: `query Logout { logout { success } }` })
        });
    }

    cookies.set('access_token', '', { path: '/' });
    cookies.set('refresh_token', '', { path: '/' });

    throw redirect(303, '/sign-up');
};