<script>
  export async function roll() {
    // Fetch a random number between 0 and 6
    // (with a delay, so that we can see it)
    return new Promise((fulfil, reject) => {
      setTimeout(() => {
        // simulate a flaky network
        if (Math.random() < 0.3) {
          reject(new Error("Request failed"));
          return;
        }

        fulfil(Math.ceil(Math.random() * 6));
      }, 1000);
    });
  }

  let promise = $state(roll());
</script>

<main>
  <button onclick={() => (promise = roll())}>roll</button>
  {#await promise}
    <p>...rolling</p>
  {:then number}
    <p>you rolled a {number}!</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<style></style>
