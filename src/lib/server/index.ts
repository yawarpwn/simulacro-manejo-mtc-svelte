import fs from 'fs/promises'
import path from 'path'
/**
 * @typedef {import('../types')} Quiz 
 */


/**
 * @param {{category: string}} options - Opciones para obtener el quiz
 * @returns {Promise<{ item: string}[]>}
*/
export async function getQuiz({ category}) {
  console.log('get quiz')
  const data = await fs.readFile(path.join(process.cwd(), 'src', 'lib', 'data', `${category}.json`), 'utf-8').then(res => JSON.parse(res))
  return data
}

getQuiz({category: 'A1.json'})
