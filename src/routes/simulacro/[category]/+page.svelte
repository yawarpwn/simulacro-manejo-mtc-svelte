<script>
	import Quiz from '$lib/components/Quiz.svelte'

	const { data } = $props()
</script>

{#await data.quiz}
	<div>loadingg</div>
{:then quiz}
	<Quiz {quiz} />
{:catch error}
	<div>error</div>
{/await}
