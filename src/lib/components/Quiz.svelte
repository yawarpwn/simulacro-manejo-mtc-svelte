<script>
  let { selectedCategory, endApp } = $props();
  import { getQuestions } from "../data/get-questions";
  import { globalState } from "../store/questions.svelte";

  const questions = getQuestions({ selectedCategory });

  const MAX_TRIES = 5;
  const TOTAL_QUESTIONS = questions.length;

  // Estados
  let currentIndex = $state(0);
  let progress = $state(0);
  let respondedQuestions = $state([]);
  let answers = $state([]);
  let selectAlternative = $state(null);

  // Estados computados
  const currentQuestion = $derived(questions[currentIndex]);
  const alternatives = $derived(Object.entries(currentQuestion.alternatives));

  //Funciones

  /**
   * @param {string} value
   */
  const onSelectAlternative = (value) => {
    selectAlternative = value;
  };

  const getRandomQuestion = () => {
    if (progress > MAX_TRIES) {
      endApp();
      return;
    }
    //Obtener pregunta alteratoria
    const randomIndex = 1 + Math.floor(Math.random() * TOTAL_QUESTIONS);

    if (respondedQuestions.includes(randomIndex)) {
      getRandomQuestion();
    }
    currentIndex = randomIndex;
  };

  /**
   * @param {number} id
   */
  const getImageUrl = (id) =>
    `https://sierdgtt.mtc.gob.pe/Content/img-data/img${id}.jpg`;

  /**
   * @param {Event} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Guardar respuesta
    answers = [
      ...answers,
      {
        question: currentQuestion.id,
        answer: selectAlternative,
      },
    ];

    // Guardar pregunta respondida
    respondedQuestions.push(currentQuestion.id);

    // Limpiar
    selectAlternative = null;

    //update progress
    progress++;

    getRandomQuestion();
  };
</script>

<div>
  {JSON.stringify({
    progress,
    currentIndex,
    selectAlternative,
    answers,
    respondedQuestions,
  })}
</div>

<div>
  {currentQuestion.question}
</div>
{#if currentQuestion.hasImage}
  <img src={getImageUrl(currentQuestion.id)} alt={currentQuestion.question} />
{/if}

<!-- Alternativas -->
<ul class="flex flex-col gap-4">
  {#each alternatives as [key, value]}
    <button onclick={() => onSelectAlternative(key)}>
      <input checked={key === selectAlternative} value={key} type="checkbox" />
      <span>{value}</span>
    </button>
  {/each}
</ul>
<form onsubmit={handleSubmit}>
  <button disabled={!selectAlternative} type="submit"> siguiente </button>
</form>
