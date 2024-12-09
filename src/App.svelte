<script>
  import Screen from "./lib/components/Screen.svelte";
  const STATE = {
    Start: 0,
    Progress: 1,
    End: 2,
  };

  let stateApp = $state(STATE.End);

  let selectedCategorie = $state(null);

  const initApp = () => {
    stateApp = STATE.Progress;
  };

  const endApp = () => {
    stateApp = STATE.End;
  };

  $inspect(stateApp);
</script>

<main>
  {#if stateApp === STATE.Start}
    <Screen {selectedCategorie} {initApp} />
  {:else if stateApp === STATE.Progress}
    <p>preguntas</p>
  {:else}
    <p>Resultados</p>
  {/if}
</main>
