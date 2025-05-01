import fs from 'fs/promises'
import path from 'path'
/**
 * @typedef {import('../types').Quiz} Quiz
 */

const ANSWERS = {
	1: 'A',
	2: 'B',
	3: 'C',
	4: 'D'
}

/**
 * @param {{category: string}} options - Opciones para obtener el quiz
 * @returns {Promise<Quiz[]>}
 */
export async function getQuiz({ category }) {
	const json = await fs.readFile(
		path.join(process.cwd(), 'src', 'lib', 'data', `${category}.json`),
		'utf-8'
	)
	const data = JSON.parse(json)
	const mappedData = data.map((raw) => {
		const map = new Map(raw.alternatives.map((alt, index) => [ANSWERS[index + 1], alt]))
		const alternatives = Object.fromEntries(map)
		return {
			id: raw.id,
			image: raw.image,
			question: raw.statement,
			correctAnswer: ANSWERS[raw.correctAnswer],
			alternatives,
			questionType: raw.questionType
		}
	})

	console.log(mappedData)
	return mappedData
}

// "id": "8de24d5a0a23f7cfa95394b94f0469afac22f34e4590fb6dd4f90010717dd866",
// "slug": null,
// "image": null,
// "statement": "Está permitido en la vía:",
// "explanation": null,
// "alternatives": [
//   "Recoger o dejar pasajeros o carga en cualquier lugar",
//   "Dejar animales sueltos o situarlos de forma tal que obstaculicen solo un poco el tránsito",
//   "Recoger o dejar pasajeros en lugares autorizados",
//   "Ejercer el comercio ambulatorio o estacionario"
// ],
// "questionType": "GENERAL",
// "correctAnswer": 3
