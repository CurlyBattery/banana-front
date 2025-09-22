import type {PageServerLoad} from './$types';
import {redirect} from '@sveltejs/kit';
import {Role} from "$lib/enums/role.enum";

export const load: PageServerLoad = async ({ cookies, locals }) => {
    if (locals === undefined || !locals?.user ) {
        throw redirect(303, '/sign-in');
    }
    if(locals?.user?.role === Role.ADMINISTRATOR) {
        throw redirect(303, '/users');
    }
    const accessToken = cookies.get('access_token');
    const query = `
        query GetNotifications {
            getNotifications {
                createdAt
                data
                id
                isRead
                title
                userId
            }
        }
    `;

    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `access_token=${accessToken}`,
        },
        body: JSON.stringify({ query })
    })

    const result = await response.json();

    const queryIsRead = `
        mutation UpdateRead {
            updateRead {
                createdAt
                data
                id
                isRead
                title
                userId
            }
        }
    `;

    const responseIsRead = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `access_token=${accessToken}`,
        },
        body: JSON.stringify({ query: queryIsRead })
    })

    const resultIsRead = await responseIsRead.json();


    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return { notifications: [] }
    }

    if(resultIsRead.errors) {
        console.error('GraphQL Errors:', resultIsRead.errors)
        return { notifications: [] }
    }

    return {
        notifications: result.data.getNotifications,
    }
};
