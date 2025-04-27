import fs from 'fs/promises'
import path from 'node:path'

// /**
//  * @param {string} category
//  */
// const replaceMultipleSpaceWithSllipsis = (category) =>
// 	category.replace(/_/, '').replace(/\s{3,}/g, ' ________ ');
//
// /**
//  * @param {string} str
//  */
// const format = (str) => str.slice(3, str.length);
//
// /**
//  * @param {{selectedCategory: string}} options
//  */
// const baseDir = path.resolve(__dirname, '../src/lib/data')
// async function main() {
//   const data = await fs.readFile(baseDir + '/a1.json', 'utf-8').then(res => JSON.parse(res))
//   const capitalize = text => format(text.charAt(0).toUpperCase() + text.slice(1))
//   const mapped = data.map(q => {
//     return {
//       id: q.index,
//       alternatives: {
//       'A': capitalize(q.alternativa_a),
//       'B': capitalize(q.alternativa_b),
//       'C': capitalize(q.alternativa_c),
//       'D': capitalize(q.alternativa_d)
//       },
//       question: replaceMultipleSpaceWithSllipsis(q.pregunta),
//       correctAnswer: q.respuesta.toUpperCase(),
//       image: q.image === 1 ? `/Content/img-data/img${q.index}.jpg` : null
//       }
//   })
//
//    fs.writeFile('./A-I.json', JSON.stringify(mapped, null, 2)).then(res => console.log('success')).catch(err => console.log(err))
//
// }
// main()
//
// url -X POST "https://api-mtc.dhs.pe/exam/create" \
// -H "Content-Type: application/json" \
// -d '{"category": "A-IIB", "exampleType": "practica"}'
async function main() {
  const res = await fetch('https://api-mtc.dhs.pe/exam/create', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({category: "A-IIB", exampleType: "practica"})
  })

  const data = await res.json()
  console.log(data)


}

main()
