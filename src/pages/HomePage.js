import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CryptoCard from "../components/CryptoCard";
import Spinner from "../components/Loading/Spinner";
import NewCard from "../components/NewCard";
import { useGetCryptosQuery } from "../services/CryptoApi";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: newsData } = useGetCryptoNewsQuery({ newsCategory });
  const globalStats = data?.data?.stats;
  const [cryptos, setCryptos] = useState([]);
  const [news, setNews] = useState([]);
  useEffect(() => {
    setCryptos(data?.data?.coins);
  }, [data?.data?.coins]);

  useEffect(() => {
    setNews(newsData?.value);
  }, [newsData]);

  return (
    <div className="container mb-20">
      {isFetching && <Spinner />}
      {/* Global Crypto stats  */}
      <h1 className="title my-3">Global Crypto Stats</h1>
      <div className="flex flex-col md:flex-row flex-wrap gap-5 my-8">
        <div className="md:w-2/5">
          <h3 className="sub-title">Total Cryptocurrencies</h3>
          <p className="text-lg font-semibold">
            {globalStats && millify(globalStats.total)}
          </p>
        </div>
        <div className="md:w-2/5">
          <h3 className="sub-title">Total Exchanges</h3>
          <p className="text-lg font-semibold">
            {globalStats && millify(globalStats.totalExchanges)}
          </p>
        </div>
        <div className="md:w-2/5">
          <h3 className="sub-title">Total Market Cap</h3>
          <p className="text-lg font-semibold">
            {globalStats && millify(globalStats.totalMarketCap)}
          </p>
        </div>
        <div className="md:w-2/5">
          <h3 className="sub-title">Total 24h Volume</h3>
          <p className="text-lg font-semibold">
            {globalStats && millify(globalStats.total24hVolume)}
          </p>
        </div>
        <div className="md:w-2/5">
          <h3 className="sub-title">Total Markets</h3>
          <p className="text-lg font-semibold">
            {globalStats && millify(globalStats.totalMarkets)}
          </p>
        </div>
      </div>

      {/* Top 10 Crypto  */}
      <div className="flex  items-center justify-between pt-5">
        <h1 className="title">Top 10 Cryptos In The World</h1>
        <Link to="/currencies" className="font-bold text-blue-500 text-sm">
          see more
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 my-8">
        {cryptos?.map((coin) => (
          <CryptoCard key={coin.uuid} coin={coin} />
        ))}
      </div>

      {/* Latest News  */}
      <div className="flex  items-center justify-between pt-5">
        <h1 className="title">Latest Crypto News</h1>
        <Link to="/news" className="font-bold text-blue-500 text-sm">
          see more
        </Link>
      </div>

      <div className="flex flex-wrap gap-5 my-8 justify-center md:justify-start">
        {news?.map((cryptoNew, i) => (
          <NewCard key={i} cryptoNew={cryptoNew} />
        )).slice(0,5)}
      </div>
    </div>
  );
};

export default HomePage;


