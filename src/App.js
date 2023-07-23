import './App.css';
import Header from './components/Header';
import { useState, useEffect, useRef } from 'react';
import CardSection from './components/CardSection';

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
      <Header handleSubmit={handleSubmit} />
      <div className="fs-1 fw-bold m-3 text-Capitalize"
          style={{ fontFamily: 'NHaasGroteskDSPro-65Md', marginTop: '3px !important', marginBottom: '0px !important' }}>
          {coinId}
      </div>
      {/* <p>{data.market_data?.current_price.usd}</p> */}
      <CardSection
        coinName={coinId}
        currentPrice={data.market_data?.current_price.usd}
        mCap24={data.market_data?.market_cap_change_24h}
        ath={data.market_data?.ath.usd}
        atl={data.market_data?.atl.usd}
        sentiments={data.sentiment_votes_up_percentage}
        high24={data.market_data?.high_24h.usd}
        low24={data.market_data?.low_24h.usd}
      /> 
    </div>
    
  );
}

export default App;
