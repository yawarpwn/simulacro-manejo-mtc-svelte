<script>
import { globalState } from '../store/questions.svelte'
import { MAX_TRIES } from '../constants'
</script>

{globalState.progress}/{MAX_TRIES}
