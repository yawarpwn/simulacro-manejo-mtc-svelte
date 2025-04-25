import { getQuiz } from '$lib/server/index.js'
import { fail } from '@sveltejs/kit'

export async function load({ params }) {
	const { category } = params

  const quiz = getQuiz({category})


  return { quiz}

	}
