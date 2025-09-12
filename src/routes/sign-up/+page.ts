import type { PageServerLoad} from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
    const query = `
        query GetDepartments {
            getDepartments {
                description
                id
                name
            }
        }
    `;

    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
    })

    const result = await response.json()

    if(result.errors) {
        console.error('GraphQL Errors:', result.errors)
        return { departments: [] }
    }

    return {
        departments: result.data.getDepartments,
    }
}