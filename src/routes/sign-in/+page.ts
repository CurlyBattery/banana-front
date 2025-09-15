import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/sign-up/$types";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, fetch }) => {
    if (locals?.user) {
        throw redirect(303, '/tasks')
    }
}