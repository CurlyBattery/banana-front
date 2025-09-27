import type {Actions, PageServerLoad} from './$types';
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
        query GetMyTasks {
            getMyTasks {
                assignedToId
                createdById
                start
                deadline
                description
                id
                priority
                status
                title
            }
        }
    `;

    const queryCreator = `
        query GetCreatorTasks {
            getCreatorTasks {
                assignedToId
                createdById
                start
                deadline
                description
                id
                priority
                status
                title
            }
        }
    `;

    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `access_token=${accessToken}`,
        },
        body: JSON.stringify({
            query: locals.user.role === Role.HEAD_DEPARTMENT ?  queryCreator : queryMy,
        })
    })

    const result = await response.json();

    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return { tasks: [], accessToken }
    }


    return {
        tasks: locals.user.role === Role.HEAD_DEPARTMENT ?  result.data.getCreatorTasks : result.data.getMyTasks,
    }
};

export const actions = {
    updateTask: async ({request, cookies}) => {
        const data = await request.formData();
        const id = data.get('id');
        const title = data.get('title');
        const description = data.get('description');
        const priority = data.get('priority');
        const start = data.get('start');
        const deadline = data.get('deadline');

        const accessToken = cookies.get('access_token');

        const mutation = `
            mutation UpdateTask($updateTaskInput: UpdateTaskInput!) {
                updateTask(updateTaskInput: $updateTaskInput) {
                    id
                    title
                    start
                    deadline
                }
            }
        `;

        const variables = {
            updateTaskInput: {
                id: Number(id),
                title,
                description,
                priority: Number(priority),
                start,
                deadline,
            }
        };

        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${accessToken}`,
            },
            body: JSON.stringify({
                query: mutation,
                variables
            })
        });

        const result = await response.json();
        if(result.errors) {
            console.error('GraphQL Error:', result.errors);
            return { success: false, errors: result.errors };
        }

        return { success: true, task: result.data.updateTask };
    }
} satisfies Actions;
