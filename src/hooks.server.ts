import type {Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const accessToken = event.cookies.get('access_token');
    if(accessToken)  {
        try {

            const query = `
                query Me {
                    me {
                        departmentId
                        email
                        fullName
                        id
                    }
                }
            `;
            const response = await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `access_token=${accessToken}`
                },
                body: JSON.stringify({ query }),
                credentials: 'include'
            })
            const result = await response.json();
            event.locals.user = result.data.me ?? null;
        } catch{
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return resolve(event);
}