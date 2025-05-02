import { getQuestions } from '$lib/server/index.js'
import { fail } from '@sveltejs/kit'

export async function load({ params }) {
	const { category } = params

	const quiz = getQuestions({ category })

	return { quiz }
}
