<script>
import { globalState, resetApp } from '../store/questions.svelte'
import Button from './Button.svelte'
</script>

<h1>Resultados</h1>
<Button aria-label="Volver al inicio" onclick={resetApp}>Reintentar</Button>
