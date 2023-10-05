import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import throttle from 'lodash/throttle';

function CryptoMarket() {
  const [coins, setCoins] = useState([]);
  // const chartRef = useRef(null);

  // const fetchLast7DaysChartData = async (coinId) => {
  //   try {
  //     // Define the API endpoint for fetching the last 7 days of data for a specific coin
  //     const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;

  //     const response = await axios.get(apiUrl);

  //     // Extract relevant data from the API response
  //     const chartData = response.data.prices;

  //     return chartData;
  //   } catch (error) {
  //     console.error(`Error fetching last 7 days data for ${coinId}:`, error);
  //     return [];
  //   }
  // };

  // const throttledFetchMarketData = throttle(fetchLast7DaysChartData, 5000);

  // useEffect(() => {
  //   throttledFetchMarketData();
  // }, [throttledFetchMarketData]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Define the API endpoint for all coins in USD within a date range
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;

        const response = await axios.get(apiUrl);

        // Extract relevant data from the API response
        const coinData = response.data;

        // if (chartRef.current) {
        //   chartRef.current.destroy();
        // }

        // // Fetch last 7 days chart data for each coin
        // const coinDataWithCharts = await Promise.all(
        //   coinData.map(async (coin) => {
        //     const chartData = await fetchLast7DaysChartData(coin.id);
        //     return {
        //       ...coin,
        //       chartData,
        //     };
        //   })
        // );

        // Set the data in the state
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMarketData();
  }, [coins]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Crypto Market Data</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Market Data</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume(24h)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Circulating Supply
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last 7 Days
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coins.map((coin) => {
              return (
              <tr key={coin.id}>
                <td className="px-6 py-4 whitespace-nowrap">{coin.name} - {coin.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap">${coin.current_price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coin.price_change_percentage_24h}%</td>
                <td className="px-6 py-4 whitespace-nowrap">${coin.market_cap}</td>
                <td className="px-6 py-4 whitespace-nowrap">${coin.total_volume}</td>
                <td className="px-6 py-4 whitespace-nowrap">${coin.circulating_supply} {coin.symbol}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                {/* {coin.chartData.length > 0 ? (
                    <Line
                      data={{
                        labels: coin.chartData.map((entry) => entry[2]),
                        datasets: [
                          {
                            label: 'Price',
                            data: coin.chartData.map((entry) => entry[2]),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false,
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          x: {
                            display: true,
                            title: {
                              display: true,
                              text: 'Date',
                            },
                          },
                          y: {
                            display: true,
                            title: {
                              display: true,
                              text: 'Price (USD)',
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    'No data available'
                  )} 
                  </td>*/}
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoMarket;
