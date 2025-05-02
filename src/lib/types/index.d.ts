type Answer = string | { url: string; type: 'imagen' }
export type Quiz = {
	id: string
	statement: string
	alternatives: {
		A: Answer
		B: Answer
		C: Answer
		D: Answer
	}
	correctAnswer: keyof Quiz['alternatives']
	image: string | null
	questionType: 'SPECIFIC' | 'GENERAL'
}
