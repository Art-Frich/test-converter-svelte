// @ts-ignore
export async function fetchCurrencyCodes(setErrMsg, setSupportedCodes) {
  return tryCatcher(setErrMsg, async () => {
    const response = await fetch('https://v6.exchangerate-api.com/v6/4db2736395effde8a9db681a/codes');
    if (!response.ok) {
      throw new Error('Не удалось получить список валют');
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('Не удалось получить список валют');
    }
    setErrMsg('');
    setSupportedCodes(data.supported_codes);
  });
}

export async function fetchConversionCodes(code1, code2, amount, setValue, setErrMsg) {
  tryCatcher(setErrMsg, async () => {
    const query = `${code1}/${code2}/${amount}`;
    const response = await fetch('https://v6.exchangerate-api.com/v6/4db2736395effde8a9db681a/pair/' + query);
    if (!response.ok) {
      throw new Error('Не удалось конвертировать валюту');
    }
    const data = await response.json();
    setErrMsg('');
    setValue(data.conversion_result);
  });
}

const tryCatcher = async (setErrMsg, fn) => {
  try {
    await fn();
  } catch (error) {
    console.error(error.message);
    setErrMsg('Ошибка: ' + error.message);
  }
};
