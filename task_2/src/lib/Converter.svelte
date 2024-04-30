<script lang="ts">
  import { onMount } from 'svelte';
  import SelectInput from './SelectInput.svelte'
  import { fetchConversionCodes, fetchCurrencyCodes } from './fetchData';

  type TCodes = [string, string]

  const START_VALUE = 0;
  let firstInputName = 'USD';
  let firstInputValue = START_VALUE;
  let secondInputName = 'RUB';
  let secondInputValue = START_VALUE;
  let supportedCodes = [] as unknown as TCodes;
  $: errMsg = '';

  const setErrMsg = (newErrMsg: string) => errMsg = newErrMsg;
  const setSupportedCodes = (data: TCodes) => supportedCodes = [...data];
  const checkValues = () => {
    const isValid = firstInputName && secondInputName 
    && supportedCodes.find((code) => code[0] === firstInputName)
    && supportedCodes.find((code) => code[0] === secondInputName);

    if (!isValid) {
      setErrMsg('Пожалуйста, выберите валюту из предложенного списка');
    }

    return isValid;
  };
  const queryFirstInputUpdate = () => {
    if (!checkValues()) return;

    fetchConversionCodes(
      firstInputName,
      secondInputName,
      firstInputValue,
      (newNumVal: number) => secondInputValue = newNumVal,
      setErrMsg
    )
  }
  const querySecondInputUpdate = () => {
    if (!checkValues()) return;

    return fetchConversionCodes(
      secondInputName,
      firstInputName,
      secondInputValue,
      (newNumVal: number) => firstInputValue = newNumVal,
      setErrMsg
    )
  }

  onMount(() => fetchCurrencyCodes(setErrMsg, setSupportedCodes));
</script>

<div class="container">
  {#if supportedCodes.length > 0}
    <div>
      <SelectInput 
        bind:value={firstInputValue} 
        bind:name={firstInputName} 
        supportedCodes={supportedCodes} 
        on:change={queryFirstInputUpdate}
      />
      <SelectInput 
        bind:value={secondInputValue} 
        bind:name={secondInputName} 
        supportedCodes={supportedCodes}
        on:change={querySecondInputUpdate}
      />
      <p class="error-message">{errMsg || ''}</p>
    </div>
  {:else if errMsg === ''}
    <p>Загрузка...</p>
  {/if}
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .error-message {
    margin: 0;
    min-height: 24px;
    color: red;
  }
</style>