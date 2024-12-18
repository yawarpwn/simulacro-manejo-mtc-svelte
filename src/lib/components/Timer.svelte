<script>
	const { endApp } = $props()
	import { LIMIT_TIME } from '../constants'

	let timer = $state(LIMIT_TIME)

	$effect(() => {
		const id = setInterval(() => {
			timer--
		}, 1000)

		if (timer == 0) {
			endApp()
			clearInterval(id)
		}

		return () => clearInterval(id)
	})

	const minutes = $derived(Math.floor(timer / 60))
	const seconds = $derived(timer % 60)

	$inspect(seconds)
	// const formatedTime = $derived(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`) // minutes
</script>

<div class="count-down-main flex w-full items-start justify-center gap-1.5">
	<div class="timer">
		<div
			class="flex min-w-[60px] flex-col items-center justify-center gap-1 rounded-xl bg-black/25 px-3 py-3 backdrop-blur-sm"
		>
			<h3 class="countdown-element minutes text-center font-mono text-2xl font-semibold text-white">
				{minutes < 10 ? '0' + minutes : minutes}
			</h3>
		</div>
	</div>
	<div
		class="flex flex-col items-center justify-center gap-1 rounded-xl bg-black/25 px-3 py-3 backdrop-blur-sm"
	>
		<div class="countdown-element seconds text-center font-mono text-2xl font-semibold text-white">
			:
		</div>
	</div>

	<div class="timer">
		<div
			class="flex min-w-[60px] flex-col items-center justify-center gap-1 rounded-xl bg-black/25 px-3 py-3 backdrop-blur-sm"
		>
			<h3 class="countdown-element seconds text-center font-mono text-2xl font-semibold text-white">
				{seconds < 10 ? '0' + seconds : seconds}
			</h3>
		</div>
	</div>
</div>
