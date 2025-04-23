type QuizItem = {
  id: number,
  question: string,
  alternatives: {
    'A': string,
    'B': string,
    'C': string,
    'D': string
  }
  image: string | null
}

export type Quiz = QuizItem[]
