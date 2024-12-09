<script>
  let { selectedCategorie, initApp } = $props();

  const CATEGORIES = {
    A1: "Categoría A-1",
    BIIA: "Categoría BII-A",
  };
</script>

<main>
  <div class="flex flex-col gap-2">
    {#each Object.entries(CATEGORIES) as [key, value]}
      <button
        aria-label={value}
        aria-selected={key === selectedCategorie}
        onclick={() => {
          selectedCategorie = key;
        }}
      >
        {value}</button
      >
    {/each}
  </div>
  <button class="bg-primary" disabled={!selectedCategorie} onclick={initApp}
    >Iniciar prueba</button
  >
</main>

<style>
  button[aria-selected="true"] {
    @apply border-2 border-red-500;
  }
</style>
