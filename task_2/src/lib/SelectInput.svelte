<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let name = 'SomeName';
  export let value = 0;
  export let supportedCodes: [string, string];

  const dispatch = createEventDispatcher();
  const onChange = () => dispatch('change');
</script>

<label class="input-block" for="valueValuteConvesion">
  <input id='valueOne' type="number" min="0" bind:value="{value}" on:change={onChange}>
  <input type="search" list="first" bind:value="{name}" on:change={onChange}>
  <datalist id="first">
    {#each supportedCodes as code, i}
      <option value="{code[0]}" label="{code[1]}">
    {/each}
  </datalist>
</label>

<style>
  .input-block {
    margin-bottom: 5px;

    display: grid;
    grid-template-columns: repeat(2, minmax(100px, 200px));
    gap: 5px;
    justify-content: center;
    text-align: start;
  }

  input{
    font-size: 22px;
  }
</style>