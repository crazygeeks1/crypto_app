// src/components/CryptoNewsGrid.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoNewsGrid = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual CryptoCompare API key
    const apiKey = '8baa129dbc846f74fa009ec80c83b408807737a603e745856af41bdc2249fae1';

    // Fetch cryptocurrency news
    axios
      .get(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BLOCKCHAIN&api_key=${apiKey}`
      )
      .then((response) => {
        setNews(response.data.Data);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {news.map((article) => (
        <div
          key={article.id}
          className="bg-white border rounded-lg shadow-md p-4 transition transform hover:scale-105"
        >
          <img
            src={article.imageurl}
            alt={article.title}
            className="w-full h-40 object-cover mb-2"
          />
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 text-sm mb-2">
            {article.body.substring(0, 100)}...
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm block"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default CryptoNewsGrid;
