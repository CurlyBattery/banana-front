import type {PageServerLoad} from './$types';
import {redirect} from '@sveltejs/kit';
import {Role} from "$lib/enums/role.enum";

export const load: PageServerLoad = async ({ cookies, locals, url }) => {
    if (locals === undefined || !locals?.user ) {
        throw redirect(303, '/sign-in');
    }
    if(locals?.user?.role === Role.ADMINISTRATOR) {
        throw redirect(303, '/users');
    }

    const accessToken = cookies.get('access_token');
    const queryMy = `
        query GetMyTasks($search: String) {
            getMyTasks(search: $search) {
                assignedToId
                createdById
                deadline
                description
                id
                priority
                status
                title
                createdAt
            }
        }
    `;

    const queryCreator = `
        query GetCreatorTasks($search: String) {
            getCreatorTasks(search: $search) {
                assignedToId
                createdById
                deadline
                description
                id
                priority
                status
                title
                createdAt
            }
        }
    `;
    const search = url.searchParams.get('q');
    if (!search) {
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${accessToken}`,
            },
            body: JSON.stringify({ query: locals.user.role === Role.HEAD_DEPARTMENT ?  queryCreator : queryMy})
        })

        const result = await response.json();

        if(result.errors) {
            console.error('GraphQL Errors:', result.errors)
            return { tasks: [] }
        }

        return {
            tasks: locals.user.role === Role.HEAD_DEPARTMENT ?  result.data.getCreatorTasks : result.data.getMyTasks,
        }
    }

    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `access_token=${accessToken}`,
        },
        body: JSON.stringify({
            query: locals.user.role === Role.HEAD_DEPARTMENT ?  queryCreator : queryMy,
            variables: { search }
        })
    })

    const result = await response.json();

    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return { tasks: [] }
    }


    return {
        tasks: locals.user.role === Role.HEAD_DEPARTMENT ?  result.data.getCreatorTasks : result.data.getMyTasks,
    }

};
