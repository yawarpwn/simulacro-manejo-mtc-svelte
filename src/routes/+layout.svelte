<script>
	import '../app.css'
	let { children } = $props()
</script>

<svelte:head>
	<title>Simulacro del MTC para aprobar examen de conocimientos y sacar tu brevete</title>
	<meta
		name="description"
		content="Simulacro de preguntas para la evaluación de conocimientos en la conducción para postulantes a licencias de conducir"
	/>
</svelte:head>
<div class="mx-auto flex min-h-[100dvh] w-screen max-w-3xl flex-col xl:max-w-7xl">
	<header class="w-full">
		<div class="relative h-16 px-4 py-4">
			<div class="relative mx-auto h-full max-w-3xl xl:max-w-7xl">
				<div class="flex items-center justify-between">
					<a href="/">
						<span class="text-xl font-extrabold uppercase"> MTC </span>
						<span class="text-xl uppercase text-primary"> Simulacro </span>
					</a>
					<!-- Logo -->
					<div>v1.0</div>
				</div>
			</div>
		</div>
	</header>

	<main class="relative flex h-full flex-1 flex-col">
		<div
			class="left-0 h-[3px] w-full max-w-7xl before:absolute before:h-[3px] before:w-full before:bg-gradient-to-r before:from-primary before:to-blue-500 before:content-['']"
		></div>
		{@render children()}
	</main>
</div>
