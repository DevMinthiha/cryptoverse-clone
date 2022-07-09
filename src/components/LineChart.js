import React from "react";
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LineController, LineElement, PointElement, LinearScale, Title
)


const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.history[i].timestamp).toLocaleDateString()
    );
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between items-center my-5">
        <h1 className="title">{coinName} Price Chart</h1>
        <div className="flex items-center gap-5 text-gray-500 text-sm">
          <p>{coinHistory?.change}%</p>
          <p>
            Current {coinName} Price: $ {currentPrice}
          </p>
        </div>
      </div>
      <div className="text-blue-500 text-center font-bold text-xs py-3">Price in USD</div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
