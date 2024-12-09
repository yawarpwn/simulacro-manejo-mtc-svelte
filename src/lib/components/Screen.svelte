<script>
  import { CATEGORIES } from "../constants";
  import { globalState, initApp } from "../store/questions.svelte";
</script>

<main>
  <div class="flex flex-col gap-2">
    {#each Object.entries(CATEGORIES) as [key, value]}
      <button
        aria-label={value}
        aria-selected={key === globalState.selectedCategory}
        onclick={() => {
          globalState.selectedCategory = key;
        }}
      >
        {value}</button
      >
    {/each}
  </div>
  <button
    class="bg-primary"
    disabled={!globalState.selectedCategory}
    onclick={initApp}>Iniciar prueba</button
  >
</main>

<style>
  button[aria-selected="true"] {
    @apply border-2 border-red-500;
  }
</style>
