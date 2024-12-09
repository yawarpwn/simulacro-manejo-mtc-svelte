<script>
import { globalState, endApp } from '../store/questions.svelte'
import { MAX_TRIES } from '../constants'

$effect(() => {
  if (globalState.progress > MAX_TRIES) {
    endApp()
  }
})
</script>

{globalState.progress}/{MAX_TRIES}
