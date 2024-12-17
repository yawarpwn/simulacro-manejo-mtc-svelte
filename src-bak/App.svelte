<script>
import Screen from './lib/components/Screen.svelte'
import Quiz from './lib/components/Quiz.svelte'
import Results from './lib/components/Results.svelte'
import Timer from './lib/components/Timer.svelte'
import Counter from './lib/components/Counter.svelte'
import { STATE } from './lib/constants'

import { globalState } from './lib/store/questions.svelte'
</script>

<header class="w-full">
  <div class="relative h-16 px-3 py-4">
    <div class="relative mx-auto h-full max-w-3xl xl:max-w-7xl">
      <div class="flex items-center justify-between">
        {#if globalState.stateApp === STATE.Progress}
          <Counter />
        {:else}
          <div>
            <span class="text-xl font-extrabold uppercase"> MTC </span>
            <span class="text-xl uppercase text-primary"> Simulacro </span>
          </div>
        {/if}
        <!-- Logo -->
        <div>
          {#if globalState.stateApp === STATE.Progress}
            <Timer />
          {:else}
            v1.0
          {/if}
        </div>
      </div>
      <div
        class="absolute -bottom-[0.75rem] left-0 right-0 h-[3px] w-full before:absolute before:h-[3px] before:w-full before:bg-gradient-to-r before:from-primary before:to-blue-500 before:content-['']"
      ></div>
    </div>
  </div>
</header>
<main class="flex-shrink-0 flex-grow p-6 pb-20">
  {#if globalState.stateApp === STATE.Idle}
    <Screen />
  {:else if globalState.stateApp === STATE.Progress}
    <Quiz />
  {:else}
    <Results />
  {/if}
</main>
