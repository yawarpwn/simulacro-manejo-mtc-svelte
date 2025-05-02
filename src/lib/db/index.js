import { db } from './client.js'
/** @typedef {import('$lib/types').Quiz} Quiz */

/**
 * @returns {Promise<Quiz[]>}
 * @param {{category: string}} opt
 */
export async function getQuestions({ category }) {
	console.log({ category })
	if (!category) throw new Error('category is required')

	const { rows } = await db.execute({
		sql: `SELECT
      q.id,
      q.image,
      q.statement,
      q.explanation,
      q.alternatives,
      q.question_type,
      c.name AS category,
      q.correct_answer
    FROM
      questions q
    LEFT JOIN
      categories c ON q.category_id = c.id
    WHERE c.name = ?
`,
		args: [category]
	})

	return rows.map((row) => {
		return {
			id: row.id,
			image: row.image,
			statement: row.statement,
			explanation: row.explanation,
			alternatives: JSON.parse(row.alternatives),
			questionType: row.question_type,
			category: row.category,
			correctAnswer: row.correct_answer
		}
	})
}
