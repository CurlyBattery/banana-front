import {fail, type Handle} from "@sveltejs/kit";

const getUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
}

export const handle: Handle = async ({event,  resolve}) => {
    event.locals.requestId = getUniqueId();

    const accessToken = event.cookies.get('access_token');
    event.locals.user = null;

    if(accessToken) {
        const query = `
                query Me {
                    me {
                        id
                        fullName
                        email
                        departmentId
                        role
                    }
                }
            `;
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${accessToken}`
            },
            body: JSON.stringify({
                query
            })
        });

        const result = await response.json();

        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            event.locals.user = null;
        } else {
            event.locals.user = result.data?.me ?? null;
        }

    } else {
        event.locals.user = null;
    }

    const response = await resolve(event);
    return response;
}