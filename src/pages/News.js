import React, { useEffect, useState } from "react";
import Spinner from "../components/Loading/Spinner";
import NewCard from "../components/NewCard";
import { useGetCryptosQuery } from "../services/CryptoApi";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi";

const News = () => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data, isFetching } = useGetCryptoNewsQuery({ newsCategory });
  const {data: cryptos} = useGetCryptosQuery(100);
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(data?.value);
  }, [data]);

  return (
    <div className="container">
      {isFetching && <Spinner />}
      <input
        type="text"
        className="outline-none border rounded-md mt-5 mb-3 text-xs p-3"
        placeholder="Select a Crypto"
        onChange={e => setNewsCategory(e.target.value)}
      />

      <div className="flex flex-wrap justify-center md:justify-start gap-5 my-5 pb-20">
        {news?.map((cryptoNew, i) => (
          <NewCard key={i} cryptoNew={cryptoNew} />
        ))}
      </div>
    </div>
  );
};

export default News;
