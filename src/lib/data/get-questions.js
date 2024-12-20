import a1Questions from '../data/a1.json';
import { CATEGORIES } from '../constants';

/**
 * @param {string} category
 */
const replaceMultipleSpaceWithSllipsis = (category) =>
	category.replace(/_/, '').replace(/\s{3,}/g, ' ________ ');

/**
 * @param {string} str
 */
const format = (str) => str.slice(3, str.length);

/**
 * @param {{selectedCategory: string}} options
 */
export function getQuestions({ selectedCategory }) {
	console.log(selectedCategory);
	const mappedQuestions = a1Questions.map((question) => {
		return {
			id: question.index,
			alternatives: {
				a: format(question.alternativa_a),
				b: format(question.alternativa_b),
				c: format(question.alternativa_c),
				d: format(question.alternativa_d)
			},
			question: replaceMultipleSpaceWithSllipsis(question.pregunta),
			correctAlternative: question.respuesta,
			hasImage: Boolean(question.image)
		};
	});

	return mappedQuestions;
}
