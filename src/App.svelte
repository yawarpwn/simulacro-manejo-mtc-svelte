<script>
  import Screen from "./lib/components/Screen.svelte";
  import Quiz from "./lib/components/Quiz.svelte";
  import Results from "./lib/components/Results.svelte";
  import { STATE } from "./lib/constants";

  import { globalState } from "./lib/store/questions.svelte";
</script>

<div></div>
<main>
  {#if globalState.stateApp === STATE.Start}
    <Screen />
  {:else if globalState.stateApp === STATE.Progress}
    <Quiz />
  {:else}
    <Results />
  {/if}
</main>
