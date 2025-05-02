import { db } from '../src/lib/db/client.js'

export const ANSWERS = {
	1: 'A',
	2: 'B',
	3: 'C',
	4: 'D'
}

import data from '../src/lib/data/B-IIC.json'

const CATEGORIES = {
	'A-I': 1,
	'A-IIA': 2,
	'A-IIB': 3,
	'A-IIIA': 4,
	'A-IIIB': 5,
	'A-IIIC': 6,
	'B-IIA': 7,
	'B-IIB': 8,
	'B-IIC': 9
}

// const stmts = data.map(
// 	(q) => `INSERT INTO questions (
//   id,
//   image,
//   statement,
//   explanation,
//   alternatives,
//   question_type,
//   category_id,
//   correct_answer
// )
// VALUES(
//   ${q.id},
//   ${q.image},
//   ${q.statement},
//   ${q.explanation},
//   ${q.alternatives},
//   ${q.questionType},
//   1,
//   "A"
// );
// `
// )

// await db.batch([
// 	'DROP TABLE IF EXISTS questions;',
// 	`
//   CREATE TABLE questions (
//     id text unique primary key,
//     category_id integer not null,
//     image text,
//     statement text not null,
//     explanation text,
//     alternatives text not null,
//     question_type text not null,
//     correct_answer text not null,
//     foreign key (category_id) references categories (id)
//   );
// `
// ])

data.forEach((q) => {
	const map = new Map(q.alternatives.map((alt, index) => [ANSWERS[index + 1], alt]))
	const alternatives = Object.fromEntries(map)

	db.execute({
		sql: `INSERT INTO
  questions (id, image, statement, explanation, alternatives, question_type, category_id, correct_answer)
VALUES(?, ?, ?, ?, ?, ?, ?, ?);`,
		args: [
			q.id,
			q.image,
			q.statement,
			q.explanation,
			JSON.stringify(alternatives),
			q.questionType,
			9,
			ANSWERS[q.correctAnswer]
		]
	})
})
