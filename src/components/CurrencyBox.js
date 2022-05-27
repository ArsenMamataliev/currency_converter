import React, {useState, useEffect} from 'react';
import Select from 'react-select';

export const CurrencyBox = () => {
  const [selectedOptionFrom, setSelectedOptionFrom] = useState({value:"USD"}); 
  const [selectedOptionTo, setSelectedOptionTo] = useState({value:"UAH"});
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(0);
  
  let valueFromFn = e => setAmountFrom(e.target.value);
  let valueToFn = e => setAmountTo(e.target.value);

  const options = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'UAH', label: 'UAH' },
    { value: 'KGS', label: 'KGS' },
    { value: 'KZT', label: 'KZT' },
    { value: 'JPY', label: 'JPY' },
  ];

  useEffect(() => {
    const fetchOptions = {method: 'GET', headers: {Accept: 'application/json'}};
    const api_key = "976aee1acb-b88bf0a3fc-rch3k9";
    const getData = async (amount, from, to) => {
    const res = await fetch(`https://api.fastforex.io/convert?from=${from.value}&to=${to.value}&amount=${amount}&api_key=${api_key}`, fetchOptions);
    const currencyRes= await res.json();
    const getFromObject = Object.entries(currencyRes.result)[0][1];
    setAmountTo(getFromObject);
    }
  getData(amountFrom, selectedOptionFrom, selectedOptionTo);
},[amountFrom, selectedOptionFrom]);

useEffect(() => {
    const fetchOptions = {method: 'GET', headers: {Accept: 'application/json'}};
    const api_key = "976aee1acb-b88bf0a3fc-rch3k9";
    const getData = async (amount, from, to) => {
    const res = await fetch(`https://api.fastforex.io/convert?from=${from.value}&to=${to.value}&amount=${amount}&api_key=${api_key}`, fetchOptions);
    const currencyRes= await res.json();
    const getFromObject = Object.entries(currencyRes.result)[0][1];
    setAmountFrom(getFromObject);
    }
   getData(amountTo, selectedOptionTo, selectedOptionFrom,);
}, [amountTo, selectedOptionTo]);

  return (
    <div className='currency-convert-box'>
      <div className='currency-boxes'>
        <Select
          defaultValue={selectedOptionFrom}
          onChange={setSelectedOptionFrom}
          options={options}
          defaultInputValue = {selectedOptionFrom.value}
        />
        <input type="number" 
          value = {amountFrom} 
          onChange={valueFromFn}
          autoFocus 
          min="0"
        />
      </div>  
      <div className='currency-boxes'>
        <Select
          defaultValue={selectedOptionTo}
          onChange={setSelectedOptionTo}
          options={options}
          defaultInputValue = {selectedOptionTo.value}
        />
        <input type="number" 
          value = {amountTo} 
          onChange={valueToFn}
          autoFocus 
          min="0"
        />
      </div>
    </div>
  )
}