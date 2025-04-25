import fs from 'fs/promises'
import path from 'path'
/**
 * @typedef {import('../types').Quiz} Quiz 
 */


/**
 * @param {{category: string}} options - Opciones para obtener el quiz
 * @returns {Promise<Quiz[]>}
*/
export async function getQuiz({ category}) {
    const data = await fs.readFile(path.join(process.cwd(), 'src', 'lib', 'data', `${category}.json`), 'utf-8')
    return JSON.parse(data)
}

