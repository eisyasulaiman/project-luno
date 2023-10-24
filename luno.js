import Binance from 'node-binance-api';
async function getLunoPrice() {
  const response = await fetch('https://api.luno.com/api/1/ticker?pair=XBTMYR')
  const  res = await  response.json()
  return res.last_trade
  }


async function getBinancePrice() {
  const binance = new Binance();

  let ticker = await binance.prices();
  return ticker.BTCUSDT;
} 

async function getExchangeRate() {
var myHeaders = new Headers();
myHeaders.append("apikey", "zcKuCh0Np00k6414NsptohtKc1m9FyCG");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const response = await fetch('https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD', requestOptions)
const res = await response.json()
return res.rates.MYR

// return fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     return result.rates.MYR
//   })
//   .catch(error => console.log('error', error));
}


  async function main() {
    try {
      const lunoPrice = await getLunoPrice();
      const binancePrice = await getBinancePrice();
      const exchangeRate = await getExchangeRate();
      const lunoPriceUSD = lunoPrice / exchangeRate;
      const priceDifference = binancePrice - lunoPriceUSD;
      const lunoPremium = (priceDifference / binancePrice) * 100;
  
      console.log(`BTCMYR price on Luno: MYR ${lunoPrice}`);
      console.log(`USDMYR exchange rate: ${exchangeRate}`);
      console.log(`BTCUSD price on Luno: USD ${lunoPriceUSD.toFixed(2)}`);
      console.log(`BTCUSD price on Binance: USD ${binancePrice}`);
      console.log(`Price difference: USD ${priceDifference.toFixed(2)}`);
      console.log(`Luno Premium: ${lunoPremium.toFixed(4)}%`);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  main()
  

