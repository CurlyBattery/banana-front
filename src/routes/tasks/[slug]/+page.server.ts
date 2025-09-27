import type { PageServerLoad, Actions } from './$types';
import {fail, redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, locals, params }) => {
    if (locals === undefined || !locals?.user ) {
        throw redirect(303, '/sign-in');
    }
    const accessToken = cookies.get('access_token');
    const query = `
        query GetTask($id: Int!) {
            getTask(id: $id) {
                assignedToId
                createdById
                deadline
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
            query,
            variables: { id: Number(params.slug )}
        })
    })

    const result = await response.json();
    console.log(result)

    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return { task: [] }
    }

    return {
        task: result.data.getTask,
    }
};

export const actions = {
    changeStatus: async ({ request, cookies, params }) => {
        const accessToken = cookies.get('access_token');
        console.log(accessToken)
        const data = await request.formData();
        let status = data.get('status');
        console.log(status)

        const mutation = `
            mutation UpdateTaskStatus($id: Int!, $status: TaskStatus!) {
                updateTaskStatus(updateTaskStatusInput: { id: $id, status: $status }) {
                    assignedToId
                    createdById
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
                query: mutation,
                variables: { id: Number(params.slug), status }
            })
        });

        const result = await response.json();
        console.log(result)
        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            return fail(400, { error: result.errors[0].message });
        }

        throw redirect(303, `/tasks/${params.slug}`);
    },
    deleteTask: async ({ cookies, params}) => {
        const accessToken = cookies.get('access_token');

        const mutation = `
            mutation RemoveTask($id: Int!) {
                removeTask(id: $id)  {
                    assignedToId
                    createdById
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
                query: mutation,
                variables: { id: Number(params.slug) }
            })
        });

        const result = await response.json();
        console.log(result)
        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            return fail(400, { error: result.errors[0].message });
        }

        throw redirect(303, `/tasks`);
    }
} satisfies Actions

