<script>
const props = $props()
</script>

<button class="btn" {...props} class:w-full={props.full}>
  {@render props.children?.()}
</button>

<style>
.btn {
  font: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.019rem;
  text-transform: none;
  text-decoration: none;
  border-radius: 0.5rem;
  border: solid #fff;
  border-top-width: medium;
  border-top-color: rgb(255, 255, 255);
  border-right-width: medium;
  border-right-color: rgb(255, 255, 255);
  border-bottom-width: medium;
  border-bottom-color: rgb(255, 255, 255);
  border-left-width: medium;
  border-left-color: rgb(255, 255, 255);
  border-width: 1px 1px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  transition: all 0.1s ease;

  background-color: #0ae98a;
  background-color: hsl(var(--primary));
  color: #13161c;
  border-color: hsla(0, 0%, 100%, 0.5) hsl(var(--primary)) hsl(var(--primary));
}

.btn[disabled] {
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  border-color: hsla(0, 0%, 100%, 0.1) hsl(var(--muted)) hsl(var(--muted));
}
</style>
