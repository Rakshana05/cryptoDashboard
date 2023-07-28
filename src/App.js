import './App.css';
import Header from './components/Header';
import { useState, useEffect, useRef } from 'react';
import CardSection from './components/CardSection';
import ChartSection from './components/ChartSection';
import CryptoNews from './components/CryptoNews';
import SocialShare from './components/SocialShare';
function App() {
    const [coinId, setCoinId] = useState("bitcoin");
    const [data, setData] = useState({});
    const intervalRef = useRef();
  
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const newCoinId = event.target.value;
      setCoinId(newCoinId);
    };
  
    useEffect(() => {
      fetchData();
  
      intervalRef.current = setInterval(() => {
        fetchData();
      }, 2000);
  
      return () => {
        clearInterval(intervalRef.current);
      };
    }, [coinId]);

  return (
    <div>
      <Header handleSubmit={handleSubmit} name={coinId} />
      <div className="row m-0">
        <CryptoNews />
        <div className="col" style={{boxSizing:"borderBox"}}>
        <CardSection
          coinName={coinId}
          currentPrice={data.market_data?.current_price.usd}
          // mCap24={data.market_data?.market_cap_change_24h}
          ath={data.market_data?.ath.usd}
          atl={data.market_data?.atl.usd}
          sentiments={data.sentiment_votes_up_percentage}
          high24={data.market_data?.high_24h.usd}
          low24={data.market_data?.low_24h.usd}
        /> 
        <ChartSection Id={coinId} priceChange24={data.market_data ?.price_change_24h_in_currency.usd } 
          MarketCap={data.market_data ?.market_cap.usd }
          TotVol={data.market_data ?.total_volume.usd }
          Circulating= {data.market_data ?.circulating_supply}
          twitterF = {data.community_data ?.twitter_followers }
        />
        <SocialShare url='http://localhost:3000' title='Crypto Dashboard'/>
        </div>
      </div>
    </div>
    
  );
}

export default App;
