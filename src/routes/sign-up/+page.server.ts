import type {Actions, PageServerLoad} from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals }) => {
    console.log(locals)
    if (locals?.user) {
        throw redirect(303, '/tasks');
    }
};


export const actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const fullName = data.get('fullName');
        const departmentId = Number(data.get('department'));
        const password = data.get('password');

        const mutation = `
            mutation SignUp($email: String!, $fullName: String!, $departmentId: Int!, $password: String!) {
                signUp(
                    createUserInput: {
                        email: $email
                        fullName: $fullName
                        departmentId: $departmentId
                        password: $password
                    }
                ) {
                    id
                    email
                    fullName
                    departmentId
                    isActive
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
                variables: { email, fullName, departmentId, password }
            })
        });

        const result = await response.json();
        console.log(result);

        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            return fail(400, { error: result.errors[0].message });
        }

        throw redirect(303, '/sign-in');
    }
} satisfies Actions;
