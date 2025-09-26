import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies, fetch }) => {
    const accessToken = cookies.get('access_token');

    let notifications = [];
    if (accessToken) {
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
                'Cookie': `access_token=${accessToken}`
            },
            body: JSON.stringify({ query })
        });

        const result = await response.json();
        if (!result.errors) {
            notifications = result.data.getNotifications;
        }
    }

    return {
        user: locals.user,
        notifications
    };
};
