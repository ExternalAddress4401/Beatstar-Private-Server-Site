import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zfd } from 'zod-form-data';
import { isAdmin } from '$lib/wrapper/isAdmin';
import { PUBLIC_HTTP_SERVER_IP } from '$env/static/public';

const schema = zfd.formData({
	name: zfd.text(),
	data: zfd.text()
});

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	const infoResponse = await fetch(`${PUBLIC_HTTP_SERVER_IP}/info`);
	const cmsKeys = Object.keys(await infoResponse.json());

	if (!cmsKeys.includes(slug)) {
		return fail(400, { message: 'Invalid CMS file requested.' });
	}

	const jsonResponse = await fetch(`${PUBLIC_HTTP_SERVER_IP}/cms/${slug}/json`);

	return {
		cms: await jsonResponse.json()
	};
};

export const actions = {
	save: isAdmin(async ({ request, cookies }) => {
		const formData = await request.formData();
		const response = await schema.safeParseAsync(formData);
		if (response.error) {
			return fail(400);
		}

		const { name, data } = response.data;

		// is the JSON valid?
		try {
			JSON.parse(data);
		} catch (e) {
			return fail(400, { message: 'JSON not valid.' });
		}

		const infoResponse = await fetch(`${PUBLIC_HTTP_SERVER_IP}/info`);
		const cmsKeys = Object.keys(await infoResponse.json());

		if (!cmsKeys.includes(name)) {
			return fail(400, { message: 'Invalid CMS file requested.' });
		}

		await fetch(`${PUBLIC_HTTP_SERVER_IP}/cms/${name}/save`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				data,
				id: cookies.get('session')
			})
		});
	})
};
