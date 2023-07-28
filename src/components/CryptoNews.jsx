import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/news',
          {
            params: {
              lang: 'en', 
              per_page: 5, 
            },
          }
        );
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="justify-content-between" style={{overflowY:"scroll", height:"90vh", width:"20%"}}>
      <h2 className="text-center">Cryptocurrency News</h2>
      <ul className='p-0 text-justify' style={{}}>
        {news.data?.slice(0,5).map((item) =>  (
          <li className="card m-3 p-2" style={{listStyle:"none", backgroundColor: "rgb(43, 43, 43)"}} key={item.id}>
            <a href={item.url}  style={{color:"aqua", textDecoration:'none'}} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <p>{item.description.slice(0,150)}</p>
          </li>
        ))}
       
      </ul>
    </div>
  );
};

export default CryptoNews;
