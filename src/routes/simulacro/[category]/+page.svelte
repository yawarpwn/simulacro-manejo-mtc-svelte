<script>
	import Quiz from '$lib/components/Quiz.svelte'

	const { data } = $props()
	const { quiz } = data
</script>

<Quiz {quiz} />
