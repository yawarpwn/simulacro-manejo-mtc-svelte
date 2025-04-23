import { getQuiz } from "$lib/server"

export async function load() {
  const data = await getQuiz({category: 'A-I'})
  console.log(data)

}


 
