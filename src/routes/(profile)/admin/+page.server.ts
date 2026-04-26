import { PUBLIC_HTTP_SERVER_IP } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await fetch(PUBLIC_HTTP_SERVER_IP + '/info');

	const body = await response.json();

	return {
		cms: Object.keys(body).map((el) => ({ name: el }))
	};
};
