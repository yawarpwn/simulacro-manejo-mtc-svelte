<script>
  import Screen from "./lib/components/Screen.svelte";
  import Quiz from "./lib/components/Quiz.svelte";
  const STATE = {
    Start: 0,
    Progress: 1,
    End: 2,
  };

  let stateApp = $state(STATE.Start);
  let selectedCategorie = $state(null);

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
    selectedCategorie = category;
  };

  $inspect(selectedCategorie);
</script>

<main>
  {#if stateApp === STATE.Start}
    <Screen {selectedCategorie} {initApp} {updateSelectedCategory} />
  {:else if stateApp === STATE.Progress}
    <Quiz {selectedCategorie} {endApp} />
  {:else}
    <p>Resultados</p>
  {/if}
</main>
