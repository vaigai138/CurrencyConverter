import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import axios from "axios"


function App() {

  const [amount,setAmount]=useState("1");
  const [fromAmount,setFromAround]=useState("INR");
  const [toAmount,setToAmount]=useState("USD");
  const [convertedAmount,setConvertedAmount]=useState(null);
  const [exchangeRate,setExchangeRate]=useState(null);

  useEffect(()=>{
    const getConvertedAmount=async()=>{
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromAmount}`
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toAmount]);
      }catch(error){
        console.error("Error while converting the amount.",error)
      }
    }
    getConvertedAmount();
  },[fromAmount,toAmount]);

  useEffect(()=>{
    if(exchangeRate!=null){
    setConvertedAmount((amount*exchangeRate).toFixed(2));
    }

  },[amount,exchangeRate])

  const handleChangeAmount=(e)=>{
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value)? null:value);
  }

  const handleFromAmount=(e)=>{
    setFromAround(e.target.value);
  }
  const handleToAMount=(e)=>{
    setToAmount(e.target.value);
  }

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount :</label>
            <input type="number" name="" id="amt" value={amount} onChange={handleChangeAmount}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency :</label>
            <select name="" id="fromCurrency" value={fromAmount} onChange={handleFromAmount}>
              <option value="USD">USD - United States Doller</option>
              <option value="EUR">EUR -  Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="QAR">QAR - Qatari Rial</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency :</label>
            <select name="" id="toCurrency" value={toAmount} onChange={handleToAMount}>
              <option value="USD">USD - United States Doller</option>
              <option value="EUR">EUR -  Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="QAR">QAR - Qatari Rial</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromAmount} is Equal to {convertedAmount} {toAmount}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
