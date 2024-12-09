<script>
  let { selectedCategory, endApp } = $props();

  import { getQuestions } from "../data/get-questions";

  const questions = getQuestions({ selectedCategory });

  // Estados
  let currentIndex = $state(0);
  let answers = $state([]);
  let selectAlternative = $state(null);

  const currentQuestion = $derived(questions[currentIndex]);
  const alternatives = $derived(Object.entries(currentQuestion.alternatives));

  $inspect(currentQuestion);

  /**
   * @param {string} value
   */
  const onSelectAlternative = (value) => {
    selectAlternative = value;
  };

  const getNextQuestion = () => {
    currentIndex++;
  };

  const nextQuestion = () => {
    answers = [
      ...answers,
      {
        question: currentQuestion.id,
        answer: selectAlternative,
      },
    ];

    // Limpiar
    selectAlternative = null;

    //Obtener siguiente pregunta
    getNextQuestion();
  };

  $inspect(CSSGroupingRule);
</script>

<div>
  {JSON.stringify({ currentIndex, selectAlternative, answers })}
</div>

<div>
  {currentQuestion.question}
</div>

<!-- Alternativas -->
<ul class="flex flex-col gap-4">
  {#each alternatives as [key, value]}
    <button onclick={() => onSelectAlternative(key)}>
      <input checked={key === selectAlternative} value={key} type="checkbox" />
      <span>{value}</span>
    </button>
  {/each}
</ul>
<div>
  <button disabled={!selectAlternative} onclick={nextQuestion}>
    siguiente
  </button>
</div>
