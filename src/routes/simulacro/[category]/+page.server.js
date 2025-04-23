import { getQuestions } from '$lib/data/get-questions'

export async function load({ params }) {
	const { category } = params

		const questions = await getQuestions({ selectedCategory: category })
  return { questions}
	}
