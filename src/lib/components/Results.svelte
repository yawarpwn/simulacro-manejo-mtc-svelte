<script>
	import Button from './Button.svelte'

	const { answers, reset } = $props()

	const totalAnswers = answers.length
	const correctAnswers = answers.filter((a) => a.correctAnswer === a.userAnswer).length

	const incorrectAnswers = totalAnswers - correctAnswers
	const result = incorrectAnswers >= 35
</script>

<div class="flex flex-1 items-center justify-center">
	<!-- <pre class="fixed bottom-0 right-0 z-50 bg-black/50"> -->
	<!--   {JSON.stringify(globalState.answers, null, 2)} -->
	<!-- </pre> -->
	<div class="w-full">
		<h1 class="text-center text-3xl font-extrabold">
			{#if result}
				<span class="text-primary"> Aprobado </span>
			{:else}
				<span class="text-destructive"> Desaprobado </span>
			{/if}
		</h1>
		<table class="my-8 w-full text-xl">
			<tbody>
				<tr>
					<td class="w-1/2 px-4 py-2">Preguntas Contestadas</td>
					<td class="w-1/2 px-4 py-2">{totalAnswers}</td>
				</tr>

				<tr class="text-primary">
					<td class="w-1/2 px-4 py-2">Preguntas Correctas</td>
					<td class="w-1/2 px-4 py-2">{correctAnswers}</td>
				</tr>

				<tr class="text-destructive">
					<td class="w-1/2 px-4 py-2">Preguntas Incorrectas</td>
					<td class="w-1/2 px-4 py-2">{incorrectAnswers}</td>
				</tr>
			</tbody>
		</table>
		<div class="flex items-center justify-center gap-4">
			<Button
				aria-label="Volver al inicio"
				onclick={reset}>Reintentar</Button
			>
			<a
				href="/"
				class="flex items-center text-center text-primary">Volver al Inicio</a
			>
		</div>
	</div>
</div>
