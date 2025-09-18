// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {Role} from "$lib/enums/role.enum";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			requestId: string,
			user: {
				id: number,
				fullName: string,
				email: string,
				departmentId: number,
				role: Role
			} | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
