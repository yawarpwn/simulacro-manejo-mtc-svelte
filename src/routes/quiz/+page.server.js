import { getQuestions } from '$lib/data/get-questions';

export function load({ params, url }) {
	const category = url.searchParams.get('category');

	const questions = getQuestions({ selectedCategory: category });

	return {
		questions
	};
}
