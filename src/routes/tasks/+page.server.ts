import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals }) => {
    console.log(locals)
    if (locals === undefined || !locals?.user ) {
        throw redirect(303, '/sign-in');
    }
    return {};
};
