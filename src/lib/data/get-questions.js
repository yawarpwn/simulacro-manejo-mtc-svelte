import a1Questions from '../data/A-I.json';

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
export async function getQuestions({ selectedCategory }) {
	return a1Questions
}
