<script>
  const { initial } = $props();

  import { counter } from "./shared.svelte";
  const increment = () => {
    counter.count += 1;
  };
</script>

<button onclick={increment}>
  {initial} count is {counter.count}
</button>
