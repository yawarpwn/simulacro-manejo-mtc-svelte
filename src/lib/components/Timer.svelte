<script>
import { endApp } from '../store/questions.svelte'
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
const formatedTime = $derived(
  `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
) // minutes
</script>

<div>
  {formatedTime}
</div>
