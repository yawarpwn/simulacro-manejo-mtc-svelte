<script>
const { data} = $props()
const quos = data.quos

</script>

<h1>Test Page</h1>
<pre>
  {JSON.stringify(quos, null, 2)}
</pre>
