<script>
import { getQuestions } from '../data/get-questions'
import { globalState, endApp } from '../store/questions.svelte'
import { MAX_TRIES } from '../constants'

let { selectedCategory, progress } = globalState

const questions = getQuestions({ selectedCategory })

const TOTAL_QUESTIONS = questions.length

// Estados
let currentIndex = $state(0)
let respondedQuestions = $state([])
let answers = $state([])
let selectAlternative = $state(null)

// Estados computados
const currentQuestion = $derived(questions[currentIndex])
const alternatives = $derived(Object.entries(currentQuestion.alternatives))

$inspect(progress)

//Funciones

/**
 * @param {string} value
 */
const onSelectAlternative = (value) => {
  selectAlternative = value
}

const getRandomQuestion = () => {
  if (progress > MAX_TRIES) {
    endApp()
    return
  }
  //Obtener pregunta alteratoria
  const randomIndex = 1 + Math.floor(Math.random() * TOTAL_QUESTIONS)

  if (respondedQuestions.includes(randomIndex)) {
    getRandomQuestion()
  }
  currentIndex = randomIndex
}

/**
 * @param {number} id
 */
const getImageUrl = (id) =>
  `https://sierdgtt.mtc.gob.pe/Content/img-data/img${id}.jpg`

/**
 * @param {Event} event
 */
const handleSubmit = (event) => {
  event.preventDefault()

  if (!selectAlternative) return

  // Guardar respuesta
  answers = [
    ...answers,
    {
      question: currentQuestion.id,
      answer: selectAlternative,
    },
  ]

  // Guardar pregunta respondida
  respondedQuestions.push(currentQuestion.id)

  // Limpiar
  selectAlternative = null

  //update progress
  globalState.progress++

  getRandomQuestion()
}
</script>

<div class="mx-auto h-full w-full max-w-3xl xl:max-w-7xl">
  <div
    class="flex h-full flex-col justify-start gap-6 md:grid md:grid-cols-2 xl:flex-row xl:gap-16"
  >
    <!-- Sidebar -->
    <aside class="flex h-full flex-col flex-wrap items-center justify-center">
      <div class="flex flex-col items-start justify-start">
        <div class="spacing leading-6 tracking-wide text-white">
          <span>{currentQuestion.question}</span>
        </div>
      </div>
      {#if currentQuestion.hasImage}
        <div class="mt-4">
          <img
            src={getImageUrl(currentQuestion.id)}
            class="min-w-[320px] rounded-md"
            alt={currentQuestion.question}
          />
        </div>
      {/if}
    </aside>
    <!-- Alternativas -->
    <ul
      class="flex h-full w-full flex-col items-center justify-center gap-6 xl:items-center"
    >
      <div class="w-full">
        <div class="flex flex-col gap-4">
          {#each alternatives as [key, value]}
            <label
              aria-checked={key === selectAlternative}
              class="relative flex cursor-pointer items-center overflow-hidden rounded-lg border border-zinc-500 bg-black pl-8 leading-6 data-[state=false]:opacity-30 data-[state=true]:opacity-100"
              data-state={key === selectAlternative}
              onclick={() => onSelectAlternative(key)}
            >
              <button
                class="absolute bottom-0 left-0 top-0 w-8 min-w-8 bg-[#222] text-[#fff]"
                type="button"
                data-state={key === selectAlternative}
                value={key}
              >
                {key.toUpperCase()}</button
              >

              <input
                type="radio"
                aria-hidden="true"
                checked={key === selectAlternative}
                {value}
                tabIndex={-1}
                class="absolute h-14 w-8 -translate-x-full opacity-0"
              />
              <span class="p-4">{value}</span>
            </label>
          {/each}
        </div>
      </div>
    </ul>
  </div>

  <form onsubmit={handleSubmit} class="fixed bottom-0 left-0 right-0 h-[76px]">
    <div
      class="mx-auto flex h-full max-w-3xl items-center justify-end rounded-tl-lg rounded-tr-lg bg-[#1e2229] p-4"
    >
      <button
        class="h-full w-full cursor-pointer rounded-md bg-primary px-4 py-2 text-black disabled:pointer-events-none disabled:opacity-20"
        aria-disabled={!selectAlternative}
        type="submit"
        disabled={!selectAlternative}
      >
        Siguiente
      </button>
    </div>
  </form>
</div>
