import millify from "millify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../services/CryptoApi";
import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineMoneyCollect,
  AiOutlineCheck,
  AiOutlineStop,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import Spinner from "../components/Loading/Spinner";
import parse from "html-react-parser";
import LineChart from "../components/LineChart";
import axios from "axios";

const CryptoDetail = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data } = useGetCryptoDetailQuery({ coinId });
  const cryptoDetails = data?.data?.coin;
  const [coinHistory, setCoinHistory] = useState([]);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <AiOutlineNumber /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <BsImageFill />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <AiOutlineCheck />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];


  const fetchCoinHistory = async (id, time) => {
    const { data } = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
      {
        method: "GET",
        params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: `${time}` },
        headers: {
          "X-RapidAPI-Key":
            "39b285842fmsh1679d84757011fep13f431jsn58354b5dd8c8",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    );
    setCoinHistory(data?.data)
    console.log(data);
  };

  useEffect(() => {
    fetchCoinHistory(coinId, timePeriod);
  }, [coinId, timePeriod]);

  return (
    <div className="container">
      {!cryptoDetails ? (
        <Spinner />
      ) : (
        <>
          <div className="py-5">
            <h1 className="title text-center">
              {cryptoDetails.name} ({cryptoDetails.symbol}) Price{" "}
            </h1>
            <p className="text-center text-gray-500 text-sm my-3">
              {cryptoDetails.name} live price in US dollars. View value
              statistics, market cap and supply.
            </p>
            <hr className="my-5" />
            <select
              onChange={(e) => setTimePeriod(e.target.value)}
              defaultValue="7d"
              className="p-2 outline-none bg-white border rounded text-gray-500 text-center"
            >
              <option disabled>Select Time Period</option>
              {time.map((date) => (
                <option key={date}>{date}</option>
              ))}
            </select>

            <LineChart
              coinHistory={coinHistory}
              coinName={cryptoDetails?.name}
              currentPrice={millify(cryptoDetails?.price)}
            />

            <div className="my-10 flex flex-col md:flex-row justify-start items-center gap-10">
              <div className="w-11/12 md:w-2/4">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold tracking-wider">
                    {cryptoDetails.name} Value Statistics
                  </h3>
                  <p className="text-gray-500 text-sm">
                    An overview showing the stats of {cryptoDetails.name}
                  </p>

                  {stats.map(({ icon, title, value }) => (
                    <div
                      className="flex items-center justify-between"
                      key={title}
                    >
                      <div className="flex items-center my-4">
                        <p className="text-2xl mr-3 text-gray-500">{icon}</p>
                        <h3 className="text-gray-700 font-semibold">{title}</h3>
                      </div>
                      <h3 className="text-gray-700 font-semibold">{value}</h3>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-11/12 md:w-2/4">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold tracking-wider">
                    Other Statistics
                  </h3>
                  <p className="text-gray-500 text-sm">
                    An overview showing the stats of {cryptoDetails.name}
                  </p>

                  {genericStats.map(({ icon, title, value }) => (
                    <div
                      className="flex items-center justify-between"
                      key={title}
                    >
                      <div className="flex items-center my-4">
                        <p className="text-2xl mr-3 text-gray-500">{icon}</p>
                        <h3 className="text-gray-700 font-semibold">{title}</h3>
                      </div>
                      <h3 className="text-gray-700 font-semibold">{value}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <hr className="my-10" />
      <div className="flex flex-col md:flex-row gap-20 mb-40">
        <div className="desc flex flex-col gap-5 text-gray-600">
          <h1 className="title">What is {cryptoDetails?.name}</h1>
          {typeof cryptoDetails?.description === "string" &&
            parse(cryptoDetails?.description)}
        </div>

        <div className="flex flex-col items-center gap-5 text-gray-600">
          <h1 className="title">{cryptoDetails?.name} Links</h1>
          {cryptoDetails?.links?.map((link, i) => (
            <div
              className="flex w-96 justify-between border p-3 rounded shadow-sm cursor-pointer"
              key={i}
            >
              <h3>{link.type}</h3>
              <a
                href={link.url}
                target="__blank"
                rel="norel"
                className="text-blue-500"
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;
