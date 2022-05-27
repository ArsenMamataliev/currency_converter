import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import options from './options';

export default function Header() {
    const [currencyUsd, setCurrencyUsd] = useState("");
    const [currencyEur, setCurrencyEur] = useState("");
    const [selectedOption, setSelectedOption] = useState({value: "UAH", label: "UAH Ukrainian Hryvnia"});
   
    useEffect(() => {
        const fetchData = async () => {
          const options = {method: 'GET', headers: {Accept: 'application/json'}};
          const api_key = "976aee1acb-b88bf0a3fc-rch3k9";
          const usd = await fetch(`https://api.fastforex.io/fetch-one?from=USD&to=${selectedOption.value}&api_key=${api_key}`, options);
          const eur = await fetch(`https://api.fastforex.io/fetch-one?from=EUR&to=${selectedOption.value}&api_key=${api_key}`, options);
          const jsonUsd= await usd.json();
          const jsonEur= await eur.json();
          setCurrencyUsd(jsonUsd);
          setCurrencyEur(jsonEur);          
        }
        fetchData()
    .catch(console.error);
    }, []);

  return (
    <div className='header'>
      <h2>Current currency rate</h2>
      <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isDisabled 
        />
      <div className='currency-box'>
        <p>USD: {currencyUsd?.result?.UAH.toFixed(2)}</p> 
        <p>EUR: {currencyEur?.result?.UAH.toFixed(2)}</p>
      </div>
      <p>Last update: {JSON.stringify(currencyUsd.updated)}</p>  
    </div>
  )
}
