import type {PageServerLoad} from "./$types";
import {fail, redirect} from "@sveltejs/kit";
import {Role} from "$lib/enums/role.enum";
import type {Actions} from "../../../.svelte-kit/types/src/routes/tasks/[slug]/$types";

export const load: PageServerLoad = async ({ cookies, locals}) => {
    if(locals === undefined || !locals?.user) {
        throw redirect(303, '/sign-in');
    }
    if(locals?.user?.role !== Role.ADMINISTRATOR) {
        throw redirect(303, '/tasks');
    }

    const accessToken = cookies.get('access_token');
    const query = `
        query GetUsers {
             getUsers {
            departmentId
            email
            fullName
            isActive
            id
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

    const result = await response.json();
    console.log(result)

    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return { users: [] }
    }

    return {
        users: result.data.getUsers,
    }
}

export const actions = {
    deleteUser: async ({ request, cookies}) => {
        const accessToken = cookies.get('access_token');
        const data = await request.formData();
        const id = data.get('id');
        console.log(id)

        const mutation = `
            mutation RemoveUser($id: Int!) {
                removeUser(id: $id)
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
                variables: { id: Number(id) }
            })
        });

        const result = await response.json();
        console.log(result)

        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            return fail(400, { error: result.errors[0].message });
        }

        throw redirect(303, `/users`);
    }
} satisfies Actions