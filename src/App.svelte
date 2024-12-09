<script>
  import Screen from "./lib/components/Screen.svelte";
  import Quiz from "./lib/components/Quiz.svelte";
  const STATE = {
    Start: 0,
    Progress: 1,
    End: 2,
  };

  let stateApp = $state(STATE.Start);
  let selectedCategory = $state(null);

  const initApp = () => {
    stateApp = STATE.Progress;
  };

  const endApp = () => {
    stateApp = STATE.End;
  };

  /**
   *
   * @param {string} category
   */
  const updateSelectedCategory = (category) => {
    selectedCategory = category;
  };

  $inspect(selectedCategory);
</script>

<main>
  {#if stateApp === STATE.Start}
    <Screen {selectedCategory} {initApp} {updateSelectedCategory} />
  {:else if stateApp === STATE.Progress}
    <Quiz {selectedCategory} {endApp} />
  {:else}
    <p>Resultados</p>
  {/if}
</main>
