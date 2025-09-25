import type { PageServerLoad, Actions} from './$types'
import {fail, redirect} from "@sveltejs/kit";
import {Role} from "$lib/enums/role.enum";
import {formatInTimeZone} from "date-fns-tz";
import {parseISO} from "date-fns";

export const load: PageServerLoad = async ({ cookies,   fetch, locals }) => {
    if (locals === undefined || !locals?.user ) {
        throw redirect(303, '/sign-in');
    }
    if(locals?.user?.role === Role.ADMINISTRATOR) {
        throw redirect(303, '/users');
    }
    const accessToken = cookies.get('access_token');
    const query = `
        query GetUsers {
            getUsers(query: { departmentId: ${locals?.user?.departmentId}, isActive: true }) {
                departmentId
                email
                fullName
                id
                isActive
                role
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

    const result = await response.json()

    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return { users: [] }
    }

    return {
        users: result.data.getUsers,
    }
}

export const actions = {
    createTask: async ({ request, cookies }) => {
        const accessToken = cookies.get('access_token');
        const data = await request.formData();
        let deadline = formatInTimeZone(parseISO(data.get('deadline') as string), 'UTC', 'yyyy-MM-dd');
        let assignedToId = Number(data.get('user'));
        let description = data.get('description');
        let priority = Number(data.get('priority'));
        let title = data.get('title');

        const mutation = `
            mutation CreateTask($deadline: DateTime!, $assignedToId: Int!, $description: String!, $priority: Int!, $title: String!) {
                 createTask(
                    createTaskInput: {
                        assignedToId: $assignedToId
                        deadline: $deadline
                        description: $description
                        priority: $priority
                        title: $title
                    }
                ) {
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
                variables: { deadline, assignedToId, description, priority, title }
            })
        });

        const result = await response.json();

        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            return fail(400, { error: result.errors[0].message });
        }

        throw redirect(303, '/tasks');
    }
} satisfies Actions
