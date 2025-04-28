    export type Quiz = {
  id: number,
  question: string,
  alternatives: {
    'A': string,
    'B': string,
    'C': string,
    'D': string
  }
  correctAnswer: keyof Quiz['alternatives']
  image: string | null
}


