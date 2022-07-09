import millify from "millify";
import React from "react";
import { Link } from "react-router-dom";

const CryptoCard = ({ coin }) => {
  return (
    <Link to={`/detail/${coin.uuid}`}>
      <div className="w-48 md:w-72 shadow-md border rounded-md p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-700 font-semibold">
            {coin.rank}. {coin.name}
          </h3>
          <img src={coin.iconUrl} width={"35px"} alt="" />
        </div>
        <div className="mt-8 flex flex-col gap-3 pb-5">
          <p className="text-xs text-gray-500">Price: {millify(coin.price)}</p>
          <p className="text-xs text-gray-500">
            Market Cap: {millify(coin.marketCap)}
          </p>
          <p className="text-xs text-gray-500">Daily Change: {coin.change}%</p>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;
