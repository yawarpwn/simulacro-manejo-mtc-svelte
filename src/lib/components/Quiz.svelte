<script>
	import { getRandomIndex } from '$lib/utils'
	import errorSound from '$lib/assets/error.mp3'
	import successSound from '$lib/assets/success.mp3'
	import Timer from '$lib/components/Timer.svelte'
	import confetti from 'canvas-confetti'
	import { MAX_TRIES, STATE } from '$lib/constants'
	import Results from '$lib/components/Results.svelte'

	/** @type {{ quiz: import('$lib/types').Quiz[] }} */
	let { quiz } = $props()

	// quiz = quiz.filter((q) => q.questionType === 'SPECIFIC')
	const TOTAL_QUESTIONS = quiz.length

	// Estados
	let currentIndex = $state(getRandomIndex(TOTAL_QUESTIONS))

	/** @type {string | null} */
	let selectAlternative = $state(null)
	let showResult = $state(false)
	let stateApp = $state(STATE.Progress)
	let progress = $state(1)

	/** @type {Array<{id: string, userAnswer: string, correctAnswer: string}>}*/
	let userAnswers = $state([])

	// Estados computados
	const currentQuestion = $derived(quiz[currentIndex])
	const alternatives = $derived(Object.entries(currentQuestion.alternatives))

	//Funciones
	const endApp = () => {
		stateApp = STATE.End
	}

	const resetApp = () => {
		stateApp = STATE.Progress
		progress = 1
		currentIndex = getRandomIndex(TOTAL_QUESTIONS)
		userAnswers = []
	}

	/**
	 * @param {string} value
	 */
	const onSelectAlternative = (value) => {
		selectAlternative = value
	}

	const getRandomQuestion = () => {
		if (!selectAlternative) return

		if (progress > MAX_TRIES) {
			endApp()
			return
		}

		// Guardar respuesta
		userAnswers.push({
			id: currentQuestion.id,
			userAnswer: selectAlternative,
			correctAnswer: currentQuestion.correctAnswer
		})

		//Obtener pregunta alteratoria
		const randomIndex = getRandomIndex(TOTAL_QUESTIONS)

		// Si la pregunta ya ha sido respondida, busca otra pregunta
		const question = quiz[randomIndex]
		const isAlreadyAnswered = userAnswers.some((q) => q.id === question.id)
		if (isAlreadyAnswered) {
			getRandomQuestion()
		}

		//update progress
		progress++

		// Limpiar
		selectAlternative = null

		// Actualizar pregunta siguiente
		currentIndex = randomIndex
	}

	/**
	 * @param {Event} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()
		validateAnswer()
	}

	async function validateAnswer() {
		//Si no hay alternativa seleciona no hace nada
		if (!selectAlternative) return

		//Si la respuesta es incorrecta
		if (selectAlternative !== currentQuestion.correctAnswer) {
			if ('vibrate' in navigator) {
				navigator.vibrate(200)
			}
			const errorAudio = new Audio(errorSound)
			await errorAudio.play()
			showResult = true
			return
		}

		//Si la respuesta es correcta
		showResult = false

		const successAudio = new Audio(successSound)
		await successAudio.play()
		confetti()

		//Actualizar progreso
		getRandomQuestion()
	}

	/**
	 * @param {Event} event
	 */
	const handleNextQuestion = (event) => {
		event.preventDefault()
		showResult = false
		getRandomQuestion()
	}

	$effect(() => {
		if (progress > MAX_TRIES) {
			endApp()
		}
	})
</script>

<svelte:window
	on:beforeunload={(ev) => {
		ev.preventDefault()
	}}
	on:keydown={(ev) => {
		const LETTERS = {
			a: 'a',
			b: 'b',
			c: 'c',
			d: 'd'
		}

		//Si presionar alguna opcion: a, b, c, d
		if (
			ev.key === LETTERS.a ||
			ev.key === LETTERS.b ||
			ev.key === LETTERS.c ||
			ev.key === LETTERS.d
		) {
			selectAlternative = ev.key.toUpperCase()
		}

		//Si presiona Enter
		if (ev.key === 'Enter') {
			if (showResult) {
				showResult = false
				getRandomQuestion()
			} else {
				validateAnswer()
			}
		}
	}}
/>

{#if stateApp === STATE.Progress}
	<div class="absolute left-0 z-50 flex h-10 w-full justify-center">
		<div class="relative h-[3px] w-full max-w-7xl bg-muted">
			<span
				class="absolute left-1/2 top-0 -translate-x-1/2 rounded-md px-2 text-sm text-background"
			>
				{progress}/{MAX_TRIES}
			</span>
			<div
				class="flex h-[3px] rounded-3xl bg-gradient-to-r from-primary to-cyan-500"
				role="progressbar"
				aria-valuenow={progress}
				aria-valuemin="0"
				aria-valuemax={MAX_TRIES}
				style="width: {((progress - 1) / MAX_TRIES) * 100}%"
			></div>
		</div>
	</div>
	<div class="mt-4 flex items-center justify-evenly gap-4 py-4">
		<Timer {endApp} />
	</div>
	<div class="flex flex-shrink-0 flex-grow items-center px-4 pb-20">
		<div
			class="flex h-full w-full flex-col justify-start gap-6 md:grid md:grid-cols-2 xl:flex-row xl:gap-16"
		>
			<!-- Sidebar -->
			<aside class="flex h-full flex-col flex-wrap items-center justify-center">
				<div class="flex flex-col items-start justify-start">
					<p class="spacing text-balance text-xl leading-6 tracking-wide text-center">
						<span>{currentQuestion.statement}</span>
					</p>
				</div>
				{#if currentQuestion.image}
					<div class="mt-4">
						<img
							src={`https://mtc.dhs.pe${currentQuestion.image}`}
							class="min-w-[320px] rounded-md"
							width={320}
							height={320}
							alt={currentQuestion.statement}
						/>
					</div>
				{/if}
			</aside>
			<!-- Alternativas -->
			<ul class="flex h-full w-full flex-col items-center justify-center gap-6 xl:items-center">
				<div class="w-full">
					<div class="flex flex-col gap-4">
						{#each alternatives as [letter, value]}
							<button
								class:show-result={showResult}
								class="relative flex cursor-pointer items-center overflow-hidden rounded-lg border border-muted bg-background pl-8 leading-6 data-[selected=true]:border-foreground data-[selected=false]:opacity-60 data-[selected=true]:opacity-100"
								data-is-correct={currentQuestion.correctAnswer === letter}
								data-selected={selectAlternative === letter}
								onclick={() => onSelectAlternative(letter)}
								aria-disabled={showResult}
								data-letter={letter}
							>
								<span
									class="absolute bottom-0 left-0 top-0 flex w-8 min-w-8 items-center justify-center bg-foreground/20 text-foreground"
									data-state={letter === selectAlternative}
								>
									{letter.toUpperCase()}</span
								>

								{#if typeof value === 'string'}
									<input
										type="radio"
										aria-hidden="true"
										checked={letter === selectAlternative}
										{value}
										tabindex="-1"
										class="absolute h-14 w-8 -translate-x-full opacity-0"
									/>
									<span class="p-4">{value}</span>
								{/if}
								{#if typeof value === 'object'}
									<img src={`https://mtc.dhs.pe${value.url}`} alt="imagen de pruebirta" />
								{/if}
							</button>
						{/each}
					</div>
				</div>
			</ul>
		</div>

		{#if showResult}
			<form onsubmit={handleNextQuestion} class="fixed bottom-0 left-0 right-0 h-[76px]">
				<div
					class="mx-auto flex h-full max-w-3xl items-center justify-end rounded-tl-lg rounded-tr-lg bg-[#1e2229] p-4"
				>
					<button
						class="flex h-full cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:pointer-events-none"
						>Siguiente <svg
							width="1em"
							height="1em"
							fill="none"
							viewBox="0 0 12 12"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill="#13161C"
								d="M6 0 4.943 1.058 9.128 5.25H0v1.5h9.128l-4.185 4.193L6 12l6-6z"
							></path></svg
						>
					</button>
				</div>
			</form>
		{:else}
			<form onsubmit={handleSubmit} class="fixed bottom-0 left-0 right-0 h-[76px]">
				<div
					class="mx-auto flex h-full max-w-3xl items-center justify-end rounded-tl-lg rounded-tr-lg bg-muted p-4"
				>
					<button
						class="h-full w-full cursor-pointer rounded-md bg-primary text-primary-foreground px-4 py-2 disabled:pointer-events-none disabled:opacity-20"
						aria-disabled={!selectAlternative}
						type="submit"
						disabled={!selectAlternative}
					>
						Responder
					</button>
				</div>
			</form>
		{/if}
	</div>
{:else}
	<Results reset={resetApp} answers={userAnswers} />
{/if}

<style>
	div[role='progressbar'] {
		animation: progressbar 1500ms ease-in-out;
		animation-fill-mode: both;
	}

	@keyframes progressbar {
		0% {
			width: 0;
		}
	}

	.show-result[data-is-correct='true'] {
		border-color: var(--color-primary);
	}

	.show-result[data-is-correct='false'] {
		border-color: red;
	}
</style>
