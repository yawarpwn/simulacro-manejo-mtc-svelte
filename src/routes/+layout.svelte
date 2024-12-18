<script>
	import '../app.css'
	let { children } = $props()
</script>

<svelte:head>
	<title>MTC Simulacro</title>
	<meta
		name="description"
		content="MTC Simulacro de Manejo MTC"
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
				<!-- <div -->
				<!-- 	class="absolute -bottom-[0.75rem] left-0 right-0 h-[3px] w-full before:absolute before:h-[3px] before:w-full before:bg-gradient-to-r before:from-primary before:to-blue-500 before:content-['']" -->
				<!-- ></div> -->
			</div>
		</div>
	</header>
	<main class="flex h-full flex-1 flex-col">
		{@render children()}
	</main>
</div>
