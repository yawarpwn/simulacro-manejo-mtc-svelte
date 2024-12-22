import { getQuestions } from '$lib/data/get-questions'
import { CATEGORIES } from '$lib/constants.js'
import { error } from '@sveltejs/kit'

export function load({ params }) {
	const { category } = params

	if (category == CATEGORIES.AI) {
		const questions = getQuestions({ selectedCategory: category })

		return {
			questions
		}
	}

	error(404, 'not found')
}
