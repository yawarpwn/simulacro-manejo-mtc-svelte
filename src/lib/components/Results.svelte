<script>
	import { globalState, resetApp } from '../store/questions.svelte';
	import Button from './Button.svelte';
	const totalAnswers = globalState.answers.length;
	const correctAnswers = globalState.answers.filter((a) => a.correctAnswer === a.userAnswer).length;

	const incorrectAnswers = totalAnswers - correctAnswers;
	const result = incorrectAnswers >= 35;
</script>

<div class="mx-auto w-full max-w-3xl lg:max-w-7xl">
	<!-- <pre class="fixed bottom-0 right-0 z-50 bg-black/50"> -->
	<!--   {JSON.stringify(globalState.answers, null, 2)} -->
	<!-- </pre> -->
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
	<div>
		<Button full aria-label="Volver al inicio" onclick={resetApp}>Reintentar</Button>
	</div>
</div>
