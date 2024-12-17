<script>
	import { CATEGORIES } from '$lib/constants';
	import Button from '$lib/components/Button.svelte';

	/**
	 * @param {Event} event
	 */
</script>

<form class="h-full p-6">
	<!-- Wrapper -->
	<div class="mx-auto h-full max-w-3xl lg:max-w-7xl">
		<!-- Container -->
		<div class="flex h-full flex-col gap-8 xl:flex-row xl:items-center xl:justify-center xl:gap-16">
			<!-- Left -->
			<div class="flex flex-wrap items-center justify-center">
				<div class="flex w-full max-w-xl flex-col gap-8">
					<figure>
						<img
							alt="logo"
							class="h-10"
							src="https://sierdgtt.mtc.gob.pe/Content/assets/images/logo2.png"
						/>
					</figure>
					<h1 class="flex flex-col text-2xl font-medium">
						<span class="text-sm font-bold uppercase tracking-tight text-primary"
							>Simulacro de preguntas</span
						>
						Para Postulantes a Licencias de Conducir
					</h1>
					<p>Selecciona la categoría a la que postula:</p>

					<!-- Categorias de Licencias -->
					<!-- <div class="flex flex-col border-l border-neutral-500"> -->
					<!-- {#each Object.entries(CATEGORIES) as [key, value]} -->
					<!--   <label -->
					<!--     onclick={() => (globalState.selectedCategory = value)} -->
					<!--     data-state={value === globalState.selectedCategory -->
					<!--       ? 'checked' -->
					<!--       : 'unchecked'} -->
					<!--     class="relative cursor-pointer border-l border-neutral-800 py-2 pl-6 data-[state=checked]:border-primary" -->
					<!--   > -->
					<!--     <input -->
					<!--       aria-label={value} -->
					<!--       aria-hidden="true" -->
					<!--       checked={globalState.selectedCategory === value} -->
					<!--       class="absolute h-14 w-8 -translate-x-full opacity-0" -->
					<!--       type="radio" -->
					<!--     /> -->
					<!--     <span -->
					<!--       data-state={globalState.selectedCategory === value -->
					<!--         ? 'checked' -->
					<!--         : 'unchecked'} -->
					<!--       class="p-4 data-[state=checked]:text-primary" -->
					<!--     > -->
					<!--       {value} -->
					<!--     </span> -->
					<!--   </label> -->
					<!-- {/each} -->
					<!-- </div> -->
					<span>Categoria A1</span>
					<div>
						<a
							type="submit"
							href="/quiz?category=A1"
							class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
							>Empezar Prueba
							<svg
								width="1em"
								height="1em"
								fill="none"
								viewBox="0 0 12 12"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill="#13161C"
									d="M6 0 4.943 1.058 9.128 5.25H0v1.5h9.128l-4.185 4.193L6 12l6-6z"
								>
								</path>
							</svg>
						</a>
					</div>
				</div>
			</div>
			<!-- Right -->
			<div class="flex items-center justify-center">
				<div class="w-full max-w-xl rounded-lg border border-white/20 bg-black/10 px-6 py-4">
					<p class="mb-4 text-white">Ten en cuenta que:</p>
					<ul
						class={`flex flex-col gap-4 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1/2 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-primary [&_li]:before:content-[""] `}
					>
						<li class="">
							Del glosario de 200 preguntas seleccionaremos 40 preguntas aleatoriamente para ti.
						</li>
						<li>El test tiene una duracion de 20 minutos, el exámen real dura 40 minutos</li>
						<li>Al finalizar el simulacro con existe, debe contestar 35 preguntas correctamente</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</form>
