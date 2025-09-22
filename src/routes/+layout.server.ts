import type {PageServerLoad} from "../../.svelte-kit/types/src/routes/tasks/$types";

export const load: PageServerLoad = async ({locals, cookies}) => {
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

    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return {
            requestId: locals.requestId,
            user: locals.user,
            notifications: []
        }
    }

    return {
        requestId: locals.requestId,
        user: locals.user,
        notifications: result.data.getNotifications
    }
}