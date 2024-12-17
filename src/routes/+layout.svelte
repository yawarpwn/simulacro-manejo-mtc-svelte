<script>
	import '../app.css';
	let { children } = $props();
</script>

<header class="w-full">
	<div class="relative h-16 px-3 py-4">
		<div class="relative mx-auto h-full max-w-3xl xl:max-w-7xl">
			<div class="flex items-center justify-between">
				<div>
					<span class="text-xl font-extrabold uppercase"> MTC </span>
					<span class="text-primary text-xl uppercase"> Simulacro </span>
				</div>
				<!-- Logo -->
				<div>v1.0</div>
			</div>
			<div
				class="before:from-primary absolute -bottom-[0.75rem] left-0 right-0 h-[3px] w-full before:absolute before:h-[3px] before:w-full before:bg-gradient-to-r before:to-blue-500 before:content-['']"
			></div>
		</div>
	</div>
</header>

<main class="flex-shrink-0 flex-grow p-6 pb-20">
	{@render children()}
</main>
