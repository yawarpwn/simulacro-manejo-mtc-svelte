<script>
  const CATEGORIES = {
    A1: "Categoría A-1",
    BIIA: "Categoría BII-A",
  };

  let selectedCategorie = $state(null);
</script>

<main>
  <h1 class="text-3xl font-bold">aaa</h1>
  <div>
    {#each Object.entries(CATEGORIES) as [key, value]}
      <button class="color-red">{value}</button>
    {/each}
  </div>
</main>

<style>
</style>
