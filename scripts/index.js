import fs from 'fs/promises'

async function getQuestions({ category}) {

  const res = await fetch('https://api-mtc.dhs.pe/exam/create', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0"
    },

    body: JSON.stringify({category, exampleType: "practica"})
  })

  if(!res.ok) throw new Error('Error obteniendo preguntas')

  const data = await res.json()

  if(!data.success) throw new Error(data.error)  
  return data
}

const CATEGORY = 'A-IIA'
async function main() {

  let dataJson

  try {
    dataJson = await import(`../${CATEGORY}.json`)
  } catch (error) {
    console.log(error)
    dataJson = { default: []}
  }

  const savedData =  new Map(dataJson.default.map(q => [q.id, q]))
    console.log('Preguntas guardadas: ', savedData.size)

    const data = await getQuestions({ category: CATEGORY})

    for (const question of data.exam.questions) {
      const savedQuestion = savedData.get(question.id)
      if (!savedQuestion) {
        savedData.set(question.id, question)
      }
    }

    console.log('preguntas totales: ', savedData.size)

    const dataToSaved = Array.from(savedData.values())
    fs.writeFile(`./${CATEGORY}.json`, JSON.stringify(dataToSaved, null, 2)).then(res => console.log('success')).catch(err => console.log(err))

}

main().catch(err => {
  console.log(err)
})
